import {Modal} from 'react-native-paper';
import styled from 'styled-components/native';

type TStyledModal = {
  height: number | string;
  width: number | string;
} & AppTheme.ThemeType;

export const StyledModal = styled(Modal).attrs(
  ({height, width}: TStyledModal) => ({
    contentContainerStyle: {
      backgroundColor: 'white',
      alignSelf: 'center',
      borderRadius: 11,
      justifyContent: 'flex-start',
      height,
      width,
    },
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
)((props: TStyledModal) => ({}));
