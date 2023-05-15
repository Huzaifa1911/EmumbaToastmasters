import {Button} from 'react-native-paper';
import styled from 'styled-components/native';

type TStyledButton = {
  height?: number | string;
  width?: number | string;
  outlined: boolean;
  shiftIconToRight?: boolean;
} & AppTheme.ThemeType;

export const ButtonWrapper = styled(Button).attrs<TStyledButton>(
  ({height, width, shiftIconToRight, labelStyle}) => ({
    contentStyle: {
      height,
      width,
      flexDirection: shiftIconToRight ? 'row-reverse' : 'row',
    },
    labelStyle: labelStyle
      ? labelStyle
      : {
          fontSize: 14,
          fontWeight: '700',
        },
  }),
)<TStyledButton>(({outlined, theme}: TStyledButton) => ({
  ...(outlined && {borderColor: theme?.colors.primary}),
}));
