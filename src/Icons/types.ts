import {IconProps} from 'react-native-vector-icons/Icon';

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
