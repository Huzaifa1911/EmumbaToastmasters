import {AxiosError} from 'axios';
import {IconProps} from 'react-native-vector-icons/Icon';
import {SCREENS} from 'Utils';

export type IconType =
  | 'Feather'
  | 'FontAwesome'
  | 'Ionicons'
  | 'Foundation'
  | 'MaterialCommunityIcons'
  | 'MaterialIcons'
  | 'Entypo'
  | 'AntDesign'
  | 'Octicons'
  | 'FontAwesome5'
  | 'SimpleLineIcons';

export type VectorIconType = {
  iconType: IconType;
} & IconProps;

export interface ISkeletonProps {
  height?: string | number;
  width?: string | number;
  borderRadius?: number;
}

export type TSVGIcon = {
  height?: number;
  width?: number;
  color?: AppTheme.TColors;
};

export type TShowLoading = {showLoading?: boolean};

export type TBottomTabConfig = {
  title: string;
  name: string;
  component: () => JSX.Element;
  icon: {type: IconType; name: string};
};

export type TPollStatus = 'active' | 'disabled';

export type TFormattedVotingPoll = {
  id: number;
  question: string;
  is_active: boolean;
  timestamp: number;
  candidates: number[];
  owner: number;
};

export type TVotingPoll = {
  id: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  owner: number;
  poll_type: number;
  candidates: number[];
};
export type TStandardObject = {label: string; value: string | number};

export type TStandardVotingPoll = {
  id: number;
  is_active: boolean;
  question: string;
  createdBy: TStandardObject;
  timestamp: number;
  candidates: TStandardObject[];
  castedVote: {candidateId: number; voteId: number}; // candidate-id, 0 incase of null
};

export type TVote = {
  id: number;
  voter: number;
  poll: number;
  candidate: number;
};

export type TDrawerParamList = {
  [SCREENS.CAST_VOTE_SCREEN]: {pollId: string};
  [SCREENS.ALL_VOTING_POLLS_SCREEN]: undefined;
  [SCREENS.BOTTOM_TABS]: undefined;
  [SCREENS.VOTING_POLL_RESULT_SCREEN]: undefined;
  [SCREENS.VIEW_ALL_ATTENDED_SESSIONS_SCREEN]: undefined;
};

export type TColorScheme = 'dark' | 'light';
export type TBottomSheetHandler = {open: () => void; close: () => void};

export type TPollType = {
  id: number;
  name: string;
};

export type ToasmtasterType = TStandardObject;

export type TAttendedEvent = {
  id: number;
  type: string;
  timestamp: number;
  performedRole: string;
};

export type TEvent = {
  id: number;
  type: string;
  held_on: string;
  users: number[];
};

export type TJWTDecode = {
  exp: number;
  iat: number;
  jti: string;
  token_type: 'access' | 'refresh';
  user_id: number;
};

export type TUser = {
  data_joined: string;
  email: string;
  first_name: string;
  last_name: string;
  id: number;
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  last_awards_calculation: string;
  last_login: string;
  username: string;
};

export type TDataItem = {
  label: string;
  value: number;
};

export type TGamificationPoint = {
  id: number;
  points: number;
  performed: number;
  user: number;
};

export type TPaginatedResponse<T> = {
  total: number;
  current_page: number;
  num_pages: number;
  per_page: number;
  results: T[];
};

export type TLoginPayload = {username: string; password: string};

export type TError = AxiosError<{detail: string}>;

export type TRole = {id: number; name: string};

export type TPerformedRole = {
  id: number;
  participation: number;
  role: number;
};

export type TClosedPollCandidate = {id: number; label: string; votes: number};

export type TClosedVotingPoll = {
  id: number;
  question: string;
  createdBy: TStandardObject;
  timestamp: number;
  candidates: TClosedPollCandidate[];
  winner: TStandardObject;
};

export type TPieChartDataPoint = {
  value: number;
  color: string;
  text: string;
  label: string;
};
