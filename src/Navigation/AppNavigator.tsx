import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {SCREENS} from 'Utils';
import BottomTabNavigator from './BottomTabs';
import {
  AllVotingPollsScreen,
  CastVoteScreen,
  ChangePasswordScreen,
  EditProfileScreen,
  ViewAllAttendedSessionsScreen,
  VotingPollResultScreen,
} from 'Screens';
import AppHeader from './AppHeader';
import AppDrawer from './AppDrawer';
import {TDrawerParamList} from 'Types';

const {Navigator, Screen} = createDrawerNavigator<TDrawerParamList>();

const AppNavigator = () => {
  return (
    <Navigator
      screenOptions={{header: AppHeader}}
      drawerContent={AppDrawer}
      backBehavior="history">
      <Screen
        name={SCREENS.BOTTOM_TABS}
        component={BottomTabNavigator}
        options={{headerShown: false}}
      />
      <Screen
        name={SCREENS.ALL_VOTING_POLLS_SCREEN}
        component={AllVotingPollsScreen}
        options={{unmountOnBlur: true}}
      />
      <Screen
        name={SCREENS.CAST_VOTE_SCREEN}
        component={CastVoteScreen}
        options={{unmountOnBlur: true}}
      />
      <Screen
        name={SCREENS.VOTING_POLL_RESULT_SCREEN}
        component={VotingPollResultScreen}
        options={{unmountOnBlur: true}}
      />
      <Screen
        name={SCREENS.VIEW_ALL_ATTENDED_SESSIONS_SCREEN}
        component={ViewAllAttendedSessionsScreen}
      />
      <Screen
        name={SCREENS.EDIT_PROFILE_SCREEN}
        component={EditProfileScreen}
      />
      <Screen
        name={SCREENS.CHANGE_PASSWORD_SCREEN}
        component={ChangePasswordScreen}
      />
    </Navigator>
  );
};

export default AppNavigator;
