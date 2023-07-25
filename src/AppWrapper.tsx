import React from 'react';
import {ThemeProvider} from 'styled-components/native';
import {Provider as PaperProvider} from 'react-native-paper';

import AppNavigationContainer from 'Navigation';
import {AppDarkTheme, AppLightTheme} from 'Assets';
import {selectLoading, selectTheme, useAppSelector} from 'Store';
import {AppLoader} from 'Components';
import {useVerifyUserAccess} from 'Services';
import {useClearSpeechTimeLogs} from 'Utils';

const AppWrapper = () => {
  useVerifyUserAccess({showLoading: true});
  useClearSpeechTimeLogs();
  const colorScheme = useAppSelector(selectTheme);
  const isLoading = useAppSelector(selectLoading);

  const paperTheme = colorScheme === 'dark' ? AppDarkTheme : AppLightTheme;

  return (
    <PaperProvider theme={paperTheme}>
      <ThemeProvider theme={paperTheme}>
        <AppNavigationContainer />
        <AppLoader isLoading={isLoading} />
      </ThemeProvider>
    </PaperProvider>
  );
};

export default AppWrapper;
