import {StyleProp, ViewStyle} from 'react-native';
import {ISpacerProps} from '../../Commons/Spacer';

export type TInnerCardSpacerProps = Omit<ISpacerProps, 'color' | 'flex'>;

export interface IAppCardProps {
  onPress?: () => void;
  outerSpacerProps?: ISpacerProps;
  innerSpacerProps?: TInnerCardSpacerProps;
  showBorder?: boolean;
  disabled?: boolean;
  height?: number | string;
  width?: number | string;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  borderColor?: AppTheme.TColors;
  roundness?: number;
  mode?: 'elevated' | 'outlined' | 'contained';
}

export type TCardContainer = {
  showBorder: boolean;
  height: string | number;
  width: string | number;
  roundness: number;
  borderColor: AppTheme.TColors;
} & AppTheme.ThemeType;

export type TCardContentContainer = {roundness: number} & TInnerCardSpacerProps;
