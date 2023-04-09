import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Case, Default, Else, If, Switch, Then} from 'react-if';

import AuthNavigator from './AuthNavigator';
import AdminNavigator from './AdminNavigator';
import VoterNavigator from './VoterNavigator';
import AppNavigator from './AppNavigator';
import {APP_ROLES} from 'Utils';
import {NavigationService} from 'Services';

const role: APP_ROLES = 'VOTER' as APP_ROLES;

const AppNavigationContainer = () => {
  const isLoggedIn = false;

  return (
    <NavigationContainer ref={NavigationService.navigationRef}>
      <If condition={isLoggedIn}>
        <Then>
          <Switch>
            <Case condition={role === APP_ROLES.ADMIN}>
              <AdminNavigator />
            </Case>
            <Case condition={role === APP_ROLES.VOTER}>
              <VoterNavigator />
            </Case>
            <Default>
              <AppNavigator />
            </Default>
          </Switch>
        </Then>
        <Else>
          <AuthNavigator />
        </Else>
      </If>
    </NavigationContainer>
  );
};

export default AppNavigationContainer;
