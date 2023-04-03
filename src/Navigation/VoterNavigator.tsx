import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {SCREENS} from 'Utils';
import AppNavigator from './AppNavigator';
import {ActivateVotingPollScreen} from 'Screens';

const Drawer = createDrawerNavigator();

const VoterNavigator = () => {
  return (
    <Drawer.Navigator screenOptions={{headerShown: false}}>
      <Drawer.Screen name={SCREENS.APP_NAVIGATOR} component={AppNavigator} />
      <Drawer.Screen
        name={SCREENS.ACTIVATE_VOTING_POLL_SCREEN}
        component={ActivateVotingPollScreen}
      />
    </Drawer.Navigator>
  );
};

export default VoterNavigator;
