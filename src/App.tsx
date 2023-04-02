import React from 'react';
import {ThemeProvider} from 'styled-components/native';

import AppWrapper from './AppWrapper';
import {AppTheme} from 'Assets';

const App = () => {
  return (
    <ThemeProvider theme={AppTheme}>
      <AppWrapper />
    </ThemeProvider>
  );
};

export default App;
