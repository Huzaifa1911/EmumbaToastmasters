import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Else, If, Then} from 'react-if';

import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
import {NavigationService} from 'Services';

const AppNavigationContainer = () => {
  const isLoggedIn = false;

  return (
    <NavigationContainer ref={NavigationService.navigationRef}>
      <If condition={isLoggedIn}>
        <Then>
          <AppNavigator />
        </Then>
        <Else>
          <AuthNavigator />
        </Else>
      </If>
    </NavigationContainer>
  );
};

export default AppNavigationContainer;
