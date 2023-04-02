import {getAlphaColor} from 'Utils';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

type TButtonWrapper = {
  outlined: boolean;
  disabled: boolean;
  color: string;
} & CustomThemeType;

export const ButtonWrapper = styled(TouchableOpacity)(
  ({outlined, color, disabled, theme}: TButtonWrapper) => ({
    backgroundColor: disabled
      ? theme?.colors.grey
      : outlined
      ? getAlphaColor(color, 0.05)
      : color,
    flexDirection: 'row' as const,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 11,
    ...((outlined || disabled) && {
      borderColor: disabled ? theme?.colors.placeHolder : color,
    }),
    ...((outlined || disabled) && {borderWidth: 1.3}),
    height: 50,
  }),
);
