import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {SCREENS} from 'Utils';
import BottomTabNavigator from './BottomTabs';
import {AllVotingPollsScreen, CastVoteScreen, ViewAllAttendedSessionsScreen, VotingPollResultScreen} from 'Screens';
import AppHeader from './AppHeader';
import AppDrawer from './AppDrawer';
import {TDrawerParamList} from 'Types';

const {Navigator, Screen} = createDrawerNavigator<TDrawerParamList>();

const AppNavigator = () => {
  return (
    <Navigator screenOptions={{header: AppHeader}} drawerContent={AppDrawer} backBehavior="history">
      <Screen name={SCREENS.BOTTOM_TABS} component={BottomTabNavigator} options={{headerShown: false}} />
      <Screen name={SCREENS.ALL_VOTING_POLLS_SCREEN} component={AllVotingPollsScreen} />
      <Screen name={SCREENS.CAST_VOTE_SCREEN} component={CastVoteScreen} />
      <Screen name={SCREENS.VOTING_POLL_RESULT_SCREEN} component={VotingPollResultScreen} />
      <Screen name={SCREENS.VIEW_ALL_ATTENDED_SESSIONS_SCREEN} component={ViewAllAttendedSessionsScreen} />
    </Navigator>
  );
};

export default AppNavigator;
