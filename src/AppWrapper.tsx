import React from 'react';
import {ThemeProvider} from 'styled-components/native';
import {Provider as PaperProvider} from 'react-native-paper';

import AppNavigationContainer from 'Navigation';
import {AppDarkTheme, AppLightTheme} from 'Assets';
import {selectTheme, useAppSelector} from 'Store';

const AppWrapper = () => {
  const colorScheme = useAppSelector(selectTheme);

  const paperTheme = colorScheme === 'dark' ? AppDarkTheme : AppLightTheme;

  return (
    <PaperProvider theme={paperTheme}>
      <ThemeProvider theme={paperTheme}>
        <AppNavigationContainer />
      </ThemeProvider>
    </PaperProvider>
  );
};

export default AppWrapper;
