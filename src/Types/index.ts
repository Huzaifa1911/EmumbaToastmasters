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
};

export type TColorScheme = 'dark' | 'light';
export type TBottomSheetHandler = {open: () => void; close: () => void};

export type TPollType = {
  title: string;
};
