import {AxiosResponse} from 'axios';
import {find, includes, propEq, propOr} from 'ramda';
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
  TUser,
  TVotingPoll,
} from 'Types';
import {ROUTES} from './Routes';
import {axiosInstance} from './config';
import {ReduxStore} from 'Store';
import {AUTHORIZATION, decodeJwtToken} from 'Utils';
import {KeychainStorageService} from 'Services';

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

const getAllAttendedEvents = async (
  pageParam = 1,
): Promise<TPaginatedResponse<TAttendedEvent>> => {
  try {
    const userId = ReduxStore.getState().appUser.user?.id;
    const {data} = (await axiosInstance.get(ROUTES.GET_EVENTS, {
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
    const {data} = (await axiosInstance.get(ROUTES.GET_ALL_ROLES, {
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
    } = await axiosInstance.get(ROUTES.GET_ALL_PERFORMED_ROLES);

    const {data} = (await axiosInstance.get(ROUTES.GET_ALL_PERFORMED_ROLES, {
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
      `${ROUTES.GET_USER_DETAILS}${pathParams.join('/')}`,
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
    const {data} = (await axiosInstance.get(ROUTES.GET_ALL_POLL_TYPES, {
      params: {_page_size: 100},
    })) as AxiosResponse<TPaginatedResponse<TPollType>>;
    return {...data};
  } catch (error) {
    return Promise.reject(error);
  }
};

const getVotingPolls = async (
  pageParam = 1,
): Promise<TPaginatedResponse<TFormattedVotingPoll>> => {
  try {
    const {data} = (await axiosInstance.get(ROUTES.GET_ALL_VOTING_POLLS, {
      params: {current_page: pageParam},
    })) as AxiosResponse<TPaginatedResponse<TVotingPoll>>;

    const {results: polltypes = []} = await getPollTypes();

    const polls: TVotingPoll[] = propOr([], 'results', data);
    const formattedPolls = polls.map((poll): TFormattedVotingPoll => {
      const question = find(propEq(poll.poll_type, 'id'), polltypes)?.name;

      return {
        id: poll.id,
        is_active: poll.is_active,
        question: question ? `Vote For ${question}` : '',
        timestamp: dayjs(poll.created_at).valueOf(),
      };
    });

    return {...data, results: formattedPolls};
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
});
