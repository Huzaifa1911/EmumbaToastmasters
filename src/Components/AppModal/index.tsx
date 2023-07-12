import React, {PropsWithChildren} from 'react';
import {Portal} from 'react-native-paper';

import {StyledModal} from './styles';
import {useAppTheme} from 'Assets';
import {ThemeProvider} from 'styled-components';

interface IAppModalProps {
  visible: boolean;
  onDismiss: () => void;
  height?: string | number;
  width?: string | number;
  dismissable?: boolean;
}

const AppModal = (props: PropsWithChildren<IAppModalProps>) => {
  const {
    children,
    onDismiss,
    visible,
    width = '92%',
    height = 350,
    dismissable = false,
  } = props;

  const theme = useAppTheme();

  return (
    <Portal theme={theme}>
      <ThemeProvider theme={theme}>
        <StyledModal
          dismissable={dismissable}
          width={width}
          height={height}
          visible={visible}
          onDismiss={onDismiss}>
          {children}
        </StyledModal>
      </ThemeProvider>
    </Portal>
  );
};

export default AppModal;
