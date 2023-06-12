import {TPollType} from 'Types';
import {Dimensions, Platform} from 'react-native';

export enum SCREENS {
  // screen names
  LOGIN_SCREEN = 'LOGIN_SCREEN',
  SIGNUP_SCREEN = 'SIGNUP_SCREEN',
  HOME_SCREEN = 'HOME_SCREEN',
  PROFILE_SCREEN = 'PROFILE_SCREEN',
  ALL_VOTING_POLLS_SCREEN = 'ALL_VOTING_POLLS_SCREEN',
  CAST_VOTE_SCREEN = 'CAST_VOTE_SCREEN',
  VOTING_POLL_RESULT_SCREEN = 'VOTING_POLL_RESULT_SCREEN',
  LEADER_BOARD_SCREEN = 'LEADER_BOARD_SCREEN',
  VIEW_ALL_ATTENDED_SESSIONS_SCREEN = 'VIEW_ALL_ATTENDED_SESSIONS_SCREEN',
  // Navigator
  BOTTOM_TABS = 'BOTTOM_TABS',
}

export const POLL_TYPES: TPollType[] = [
  {
    id: 1,
    name: 'Best Prepared Speaker',
  },
  {
    id: 2,
    name: 'Best Table Topic Speaker',
  },
  {
    id: 3,
    name: 'Best Speech Evaluator',
  },
  {
    id: 4,
    name: 'Best of Big 3',
  },
];

export const DEFAULT_IMAGE =
  'https://cdn-icons-png.flaticon.com/512/5556/5556468.png';

export const isIOS = Platform.OS === 'ios';
export const BASE_URL = 'https://toastmasters.emumba.com/';

export enum AUTHORIZATION {
  ACCESS_TOKEN = 'ACCESS_TOKEN',
  REFRESH_TOKEN = 'REFRESH_TOKEN',
}

export const TOTAL_WIDTH = Dimensions.get('screen').width;
