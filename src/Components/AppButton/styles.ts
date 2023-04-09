import {Button} from 'react-native-paper';
import styled from 'styled-components/native';

type TStyledButton = {
  height?: number | string;
  width?: number | string;
  shiftIconToRight?: boolean;
};

export const ButtonWrapper = styled(Button).attrs<TStyledButton>(
  ({height, width, shiftIconToRight}) => ({
    contentStyle: {
      height,
      width,
      flexDirection: shiftIconToRight ? 'row-reverse' : 'row',
    },
    labelStyle: {
      fontSize: 14,
      fontWeight: '700',
    },
  }),
)<TStyledButton>``;
