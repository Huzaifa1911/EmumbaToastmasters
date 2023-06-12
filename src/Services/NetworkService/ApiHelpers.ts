import {AxiosResponse} from 'axios';
import {find, has, includes, propEq, propOr} from 'ramda';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

import {
  TAttendedEvent,
  TDataItem,
  TEvent,
  TFormattedVotingPoll,
  TGamificationPoint,
  TLoginPayload,
  TPaginatedResponse,
  TPerformedRole,
  TPollType,
  TRole,
  TStandardVotingPoll,
  TUser,
  TVote,
  TVotingPoll,
} from 'Types';
import {ROUTES} from './Routes';
import {axiosInstance} from './config';
import {ReduxStore} from 'Store';
import {AUTHORIZATION, decodeJwtToken} from 'Utils';
import {KeychainStorageService} from 'Services';
import {TCastVotePayload, TClosePollPayload, TCreatePollPayload} from './types';

const loginWithUsername = async (payload: TLoginPayload): Promise<TUser> => {
  try {
    const {data} = (await axiosInstance.post(
      ROUTES.LOGIN,
      payload,
    )) as AxiosResponse<{access: string; refresh: string}>;
    await KeychainStorageService.setToken(
      AUTHORIZATION.ACCESS_TOKEN,
      data.access,
    );
    const jwtdata = await decodeJwtToken();

    const user = await getAllUsers<TUser>({
      pathParams: [jwtdata?.user_id],
    });
    return user;
  } catch (error) {
    return Promise.reject(error);
  }
};

const castVote = async ({
  method = 'post',
  payload,
}: {
  payload: TCastVotePayload;
  method: 'patch' | 'post';
}): Promise<TVote> => {
  try {
    const url =
      method === 'post' ? ROUTES.VOTES : `${ROUTES.VOTES}${payload.poll}`;
    const {data} = (await axiosInstance[method](
      url,
      payload,
    )) as AxiosResponse<TVote>;
    return {...data};
  } catch (error) {
    return Promise.reject(error);
  }
};

const createVotingPoll = async (
  payload: TCreatePollPayload,
): Promise<TVotingPoll> => {
  try {
    const {data} = (await axiosInstance.post(
      ROUTES.VOTING_POLLS,
      payload,
    )) as AxiosResponse<TVotingPoll>;
    return {...data};
  } catch (error) {
    return Promise.reject(error);
  }
};

const closeVotingPoll = async ({
  payload,
  pollId,
}: {
  payload: TClosePollPayload;
  pollId: number;
}): Promise<TVotingPoll> => {
  try {
    const {data} = (await axiosInstance.patch(
      `${ROUTES.VOTING_POLLS}${pollId}`,
      payload,
    )) as AxiosResponse<TVotingPoll>;
    return {...data};
  } catch (error) {
    return Promise.reject(error);
  }
};

const getAllAttendedEvents = async (
  pageParam = 1,
): Promise<TPaginatedResponse<TAttendedEvent>> => {
  try {
    const userId = ReduxStore.getState().appUser.user?.id;
    const {data} = (await axiosInstance.get(ROUTES.EVENTS, {
      params: {current_page: pageParam},
    })) as AxiosResponse<TPaginatedResponse<TEvent>>;

    const {results: roles = []} = await getAllRoles();
    const {results: performedRoles = []} = await getAllPerformedRoles();

    const events: TEvent[] = propOr([], 'results', data);

    const selectedEvents = events
      .filter(event => {
        const {users = []} = event;
        if (includes(userId, users)) {
          return event;
        }
      })
      .map((event): TAttendedEvent => {
        const performedRole = find(
          propEq(event.id, 'participation'),
          performedRoles,
        );
        const roleName = find(propEq(performedRole?.role ?? 0, 'id'), roles);
        return {
          performedRole: roleName?.name ?? '',
          type: event.type.toUpperCase(),
          id: event.id,
          timestamp: dayjs(event.held_on).valueOf(),
        };
      })
      .reverse();

    return {...data, results: selectedEvents};
  } catch (error) {
    return Promise.reject(error);
  }
};

const getAllRoles = async (): Promise<TPaginatedResponse<TRole>> => {
  try {
    const {data} = (await axiosInstance.get(ROUTES.ROLES, {
      params: {_page_size: 10000},
    })) as AxiosResponse<TPaginatedResponse<TRole>>;
    return {...data};
  } catch (error) {
    return Promise.reject(error);
  }
};

const getAllPerformedRoles = async (): Promise<
  TPaginatedResponse<TPerformedRole>
> => {
  try {
    const {
      data: {total = 0},
    } = await axiosInstance.get(ROUTES.PERFORMED_ROLES);

    const {data} = (await axiosInstance.get(ROUTES.PERFORMED_ROLES, {
      params: {_page_size: total},
    })) as AxiosResponse<TPaginatedResponse<TPerformedRole>>;

    return {...data};
  } catch (error) {
    return Promise.reject(error);
  }
};

const getAllUsers = async <T = TPaginatedResponse<TUser>>({
  params,
  pathParams = [],
}: {
  params?: Record<string, any>;
  pathParams?: any[];
}): Promise<T> => {
  try {
    const {data} = (await axiosInstance.get(
      `${ROUTES.USER}${pathParams.join('/')}`,
      {params},
    )) as AxiosResponse<T>;

    return {...data};
  } catch (error) {
    return Promise.reject(error);
  }
};

const getGamificationPoints = async (): Promise<TDataItem[]> => {
  try {
    const {
      data: {total = 0},
    } = await axiosInstance.get(ROUTES.GAMIFICATION_POINTS);

    const {data: gamificationData} = await axiosInstance.get(
      ROUTES.GAMIFICATION_POINTS,
      {params: {_page_size: total}},
    );
    const pointsList: TGamificationPoint[] = propOr(
      [],
      'results',
      gamificationData,
    );

    const usersIds = [...new Set(pointsList.map(point => point.user))].join(
      ',',
    );

    const {results: users = []} = await getAllUsers({
      params: {id__in: usersIds},
    });

    const combinedData: TDataItem[] = pointsList.map(point => {
      return {
        value: point.points,
        label: propOr('', 'first_name', find(propEq(point.user, 'id'), users)),
      };
    });

    const results: TDataItem[] = Object.values(
      combinedData.reduce(
        (acc: {[key: string]: TDataItem}, {label, value}: TDataItem) => {
          if (acc[label]) {
            acc[label].value += value;
          } else {
            acc[label] = {label, value};
          }
          return acc;
        },
        {},
      ),
    )
      .sort((a, b) => a.value - b.value)
      .reverse();

    return results;
  } catch (error) {
    return Promise.reject(error);
  }
};

const getPollTypes = async (): Promise<TPaginatedResponse<TPollType>> => {
  try {
    const {data} = (await axiosInstance.get(ROUTES.POLL_TYPES, {
      params: {_page_size: 100},
    })) as AxiosResponse<TPaginatedResponse<TPollType>>;
    return {...data};
  } catch (error) {
    return Promise.reject(error);
  }
};

const getVotingPolls = async <T = TPaginatedResponse<TFormattedVotingPoll>>({
  params,
  pathParams = [],
}: {
  params?: Record<string, any>;
  pathParams?: any[];
}): Promise<T> => {
  try {
    const {data} = (await axiosInstance.get(
      `${ROUTES.VOTING_POLLS}${pathParams?.join('/')}`,
      {params},
    )) as AxiosResponse<T>;
    const {results: polltypes = []} = await getPollTypes();

    if (has('results', data)) {
      const polls: TVotingPoll[] = propOr([], 'results', data);

      const formattedPolls = polls.map((poll): TFormattedVotingPoll => {
        const question = find(propEq(poll.poll_type, 'id'), polltypes)?.name;

        return {
          id: poll.id,
          is_active: poll.is_active,
          question: question ? `Vote For ${question}` : '',
          timestamp: dayjs(poll.created_at).valueOf(),
          candidates: poll.candidates,
          owner: poll.owner,
        };
      });
      return {...data, results: formattedPolls};
    } else {
      const poll = {...data} as TVotingPoll;
      const question = find(propEq(poll.poll_type, 'id'), polltypes)?.name;

      return {
        id: poll.id,
        is_active: poll.is_active,
        question: question ? `Vote For ${question}` : '',
        timestamp: dayjs(poll.created_at).valueOf(),
        candidates: poll.candidates,
        owner: poll.owner,
      } as T;
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAllVotes = async <T = TPaginatedResponse<TVote>>({
  params = null,
  pathParams = [],
}: {
  params?: Record<string, any> | null;
  pathParams?: any[];
}): Promise<T> => {
  try {
    const {data} = (await axiosInstance.get(
      `${ROUTES.VOTES}${pathParams?.join('/')}`,
      {
        params,
      },
    )) as AxiosResponse<T>;

    return {...data};
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getActiveVotingPollDetails = async (
  pollId: number,
): Promise<TStandardVotingPoll> => {
  try {
    const poll = await getVotingPolls<TFormattedVotingPoll>({
      pathParams: [pollId],
    });

    const vote = await getAllVotes<TVote>({
      params: {voter: ReduxStore.getState().appUser.user?.id},
      pathParams: [pollId],
    });

    const {results: users = []} = await getAllUsers({
      params: {id__in: [...poll.candidates, poll.owner].join(',')},
    });

    const owner = find(propEq(poll.owner, 'id'), users);

    const castedVote = find(propEq(propOr(0, 'candidate', vote), 'id'), users);

    const candidates = users
      .filter(user => user.id !== poll.owner)
      .map(candidate => {
        return {
          label: `${propOr('', 'first_name', candidate)} ${propOr(
            '',
            'last_name',
            candidate,
          )}` as string,
          value: candidate.id,
        };
      });

    return {
      id: poll.id,
      createdBy: {
        label: propOr('', 'first_name', owner),
        value: propOr(0, 'id', owner),
      },
      question: poll.question,
      timestamp: poll.timestamp,
      candidates,
      is_active: poll.is_active,
      castedVote: propOr(0, 'id', castedVote),
    };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const API_HELPERS = Object.freeze({
  getAllAttendedEvents,
  getAllPerformedRoles,
  getAllRoles,
  getAllUsers,
  getGamificationPoints,
  loginWithUsername,
  getPollTypes,
  getVotingPolls,
  getActiveVotingPollDetails,
  getAllVotes,
  castVote,
  createVotingPoll,
  closeVotingPoll,
});
