import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {SCREENS} from 'Utils';
import BottomTabNavigator from './BottomTabs';
import {
  AllVotingPollsScreen,
  CastVoteScreen,
  VotingPollResultScreen,
} from 'Screens';

const {Navigator, Screen} = createDrawerNavigator();

const AppNavigator = () => {
  return (
    <Navigator>
      <Screen name={SCREENS.BOTTOM_TABS} component={BottomTabNavigator} />
      <Screen
        name={SCREENS.ALL_VOTING_POLLS_SCREEN}
        component={AllVotingPollsScreen}
      />
      <Screen name={SCREENS.CAST_VOTE_SCREEN} component={CastVoteScreen} />
      <Screen
        name={SCREENS.VOTING_POLL_RESULT_SCREEN}
        component={VotingPollResultScreen}
      />
    </Navigator>
  );
};

export default AppNavigator;
