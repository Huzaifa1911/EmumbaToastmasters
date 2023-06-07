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

export type TVotingPoll = {
  question: string;
  status: TPollStatus;
  timestamp: number;
};
export type TStandardObject = {label: string; value: string};

export type TStandardVotingPoll = {
  question: string;
  createdBy: string;
  timestamp: number;
  options: TStandardObject[];
};

export type TDrawerParamList = {
  [SCREENS.CAST_VOTE_SCREEN]: undefined;
  [SCREENS.ALL_VOTING_POLLS_SCREEN]: undefined;
  [SCREENS.BOTTOM_TABS]: undefined;
  [SCREENS.VOTING_POLL_RESULT_SCREEN]: undefined;
  [SCREENS.VIEW_ALL_ATTENDED_SESSIONS_SCREEN]: undefined;
};

export type TColorScheme = 'dark' | 'light';
export type TBottomSheetHandler = {open: () => void; close: () => void};

export type TPollType = {
  title: string;
};

export type ToasmtasterType = {
  name: string;
  profileImage: string;
  points: number;
  position: number;
};

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

export type TQueryResponse<T> = {
  results: T[];
};

export type TLoginPayload = {username: string; password: string};

export type TError = AxiosError<{detail: string}>;

export type TRole = {id: number; name: string};

export type TPerformedRole = {id: number; participation: number; role: number};
