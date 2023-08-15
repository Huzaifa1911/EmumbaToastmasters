import {AxiosResponse} from 'axios';
import {find, has, includes, propEq, propOr} from 'ramda';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

import {
  StatType,
  TAttendedEvent,
  TClosedVotingPoll,
  TCreateAccountPayload,
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
import {
  AUTHORIZATION,
  decodeJwtToken,
  findCandidateWithMostVotes,
  firstOrNull,
} from 'Utils';
import {KeychainStorageService} from 'Services';
import {
  TCastVotePayload,
  TUpdatePollPayload,
  TCreatePollPayload,
  TUpdateVotePayload,
  TUpdateProfile,
  TUpdatePassword,
} from './types';

const loginWithEmail = async (payload: TLoginPayload): Promise<TUser> => {
  try {
    const {data} = (await axiosInstance.post(ROUTES.LOGIN, {
      username: payload.email,
      password: payload.password,
    })) as AxiosResponse<{access: string; refresh: string}>;
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

const createAccount = async (
  payload: TCreateAccountPayload,
): Promise<TUser> => {
  try {
    await axiosInstance.post(ROUTES.REGISTRATION, payload);
    return await loginWithEmail({
      email: payload.email,
      password: payload.password1,
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

const castVote = async ({
  payload,
}: {
  payload: TCastVotePayload;
}): Promise<TVote> => {
  try {
    const {data} = (await axiosInstance.post(
      ROUTES.VOTES,
      payload,
    )) as AxiosResponse<TVote>;
    return {...data};
  } catch (error) {
    return Promise.reject(error);
  }
};

const updateVote = async ({
  payload,
}: {
  payload: TUpdateVotePayload;
}): Promise<TVote> => {
  try {
    const {data} = (await axiosInstance.patch(
      `${ROUTES.VOTES}${payload.vote}`,
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

const updateVotingPoll = async ({
  payload,
}: {
  payload: TUpdatePollPayload;
}): Promise<TVotingPoll> => {
  const {pollId, is_active} = payload;
  try {
    const {data} = (await axiosInstance.patch(
      `${ROUTES.VOTING_POLLS}${pollId}`,
      {is_active},
    )) as AxiosResponse<TVotingPoll>;
    return {...data};
  } catch (error) {
    return Promise.reject(error);
  }
};

const deleteVotingPoll = async ({
  pollId,
}: {
  pollId: number;
}): Promise<TVotingPoll> => {
  try {
    const {data} = (await axiosInstance.delete(
      `${ROUTES.VOTING_POLLS}${pollId}`,
    )) as AxiosResponse<TVotingPoll>;
    return {...data};
  } catch (error) {
    return Promise.reject(error);
  }
};

const updateProfile = async ({
  payload,
  userId,
}: {
  payload: TUpdateProfile;
  userId: number;
}): Promise<TUser> => {
  try {
    const {data} = (await axiosInstance.patch(
      `${ROUTES.USER}${userId}`,
      payload,
    )) as AxiosResponse<TUser>;

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const deactivateAccount = async (): Promise<TUser> => {
  try {
    const {data} = (await axiosInstance.patch(
      `${ROUTES.USER}${ReduxStore.getState().appUser.user?.id}`,
      {is_active: false},
    )) as AxiosResponse<TUser>;

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const updatePassword = async ({
  payload,
}: {
  payload: TUpdatePassword;
}): Promise<{detail: string}> => {
  try {
    const {data} = (await axiosInstance.post(ROUTES.CHANGE_PASSWORD, {
      new_password1: payload.password,
      new_password2: payload.confirmPassword,
    })) as AxiosResponse<{detail: string}>;

    return data;
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
  getAllPolls = false,
}: {
  params?: Record<string, any>;
  pathParams?: any[];
  getAllPolls?: boolean;
}): Promise<T> => {
  try {
    const yesterday = dayjs().subtract(1, 'day').format('YYYY-MM-DD');
    const tomorrow = dayjs().add(1, 'day').format('YYYY-MM-DD');
    const {data} = (await axiosInstance.get(
      `${ROUTES.VOTING_POLLS}${pathParams?.join('/')}`,
      {
        params: {
          ...(!getAllPolls && {
            created_at__gte: yesterday,
            created_at__lt: tomorrow,
          }),
          ...params,
        },
      },
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

    const {results: votes = []} = await getAllVotes({
      params: {voter: ReduxStore.getState().appUser.user?.id, poll: pollId},
    });

    const vote: TVote | null = firstOrNull(votes.reverse());

    const {results: users = []} = await getAllUsers({
      params: {id__in: [...poll.candidates, poll.owner].join(',')},
    });

    const owner = find(propEq(poll.owner, 'id'), users);

    const castedCandidate = find(
      propEq(propOr(0, 'candidate', vote), 'id'),
      users,
    );

    const candidates = users
      .filter(user => {
        // if owner present in candidates, then do not filter the users, otherwise remove the owner from users and return it.
        if (poll.candidates.includes(poll.owner)) {
          return user;
        } else {
          if (user.id !== poll.owner) {
            return user;
          }
        }
      }) // excluding the vote owner/counter from candidate list
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
        label: `${propOr('', 'first_name', owner)} ${propOr(
          '',
          'last_name',
          owner,
        )}`,
        value: propOr(0, 'id', owner),
      },
      question: poll.question,
      timestamp: poll.timestamp,
      candidates,
      is_active: poll.is_active,
      castedVote: {
        candidateId: propOr(0, 'id', castedCandidate),
        voteId: propOr(0, 'id', vote),
      },
    };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getClosedVotingPollDetails = async (
  pollId: number,
): Promise<TClosedVotingPoll> => {
  try {
    const poll = await getVotingPolls<TFormattedVotingPoll>({
      pathParams: [pollId],
    });

    const {results: votes = []} = await getAllVotes({params: {poll: pollId}});

    const userIds = [...new Set(votes.map(vote => vote.candidate))].join(',');

    let users: TUser[] = [];
    if (userIds.length > 0) {
      const {results} = await getAllUsers({
        params: {id__in: userIds},
      });
      users = results;
    }

    const owner = await getAllUsers<TUser>({pathParams: [poll.owner]});

    const candidates = users.map(user => {
      return {
        label: `${propOr('', 'first_name', user)}`,
        id: user.id,
        votes: votes.filter(vote => vote.candidate === user.id).length,
      };
    });

    const winnerId = findCandidateWithMostVotes(votes) ?? 0;
    const winner = find(propEq(winnerId, 'id'), users);

    return {
      id: poll.id,
      createdBy: {
        label: `${propOr('', 'first_name', owner)} ${propOr(
          '',
          'last_name',
          owner,
        )}`,
        value: propOr(0, 'id', owner),
      },
      timestamp: poll.timestamp,
      candidates,
      winner: {
        value: propOr(0, 'id', winner),
        label: winner
          ? `${propOr('', 'first_name', winner)} ${propOr(
              '',
              'last_name',
              winner,
            )}`
          : '',
      },
      question: poll.question,
    };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getStatPoints = async (): Promise<StatType> => {
  try {
    const {data: events = {total: 0}} = (await axiosInstance.get(
      ROUTES.EVENTS,
    )) as AxiosResponse<TPaginatedResponse<TEvent>>;
    const userFirstName = ReduxStore.getState().appUser.user?.first_name;

    const totalEvents = events.total;
    const attendedEvents = (await getAllAttendedEvents()).results.length;
    const points = await getGamificationPoints();
    const hightestPoints: number = propOr(0, 'value', firstOrNull(points));
    const userPoints =
      points.find(point => point.label === userFirstName)?.value ?? 0;

    return {totalEvents, attendedEvents, hightestPoints, userPoints};
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
  loginWithEmail,
  getPollTypes,
  getVotingPolls,
  getActiveVotingPollDetails,
  getClosedVotingPollDetails,
  updateVote,
  getAllVotes,
  castVote,
  createVotingPoll,
  updateVotingPoll,
  deleteVotingPoll,
  getStatPoints,
  updateProfile,
  deactivateAccount,
  updatePassword,
  createAccount,
});
