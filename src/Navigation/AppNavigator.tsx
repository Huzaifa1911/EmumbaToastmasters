import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {SCREENS} from 'Utils';
import {
  HomeScreen,
  SessionDetailsScreen,
  SessionOnBoardingScreen,
  VoteForContestentScreen,
} from 'Screens';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={SCREENS.HOME_SCREEN} component={HomeScreen} />
      <Stack.Screen
        name={SCREENS.VOTE_FOR_CONTESTENT_SCREEN}
        component={VoteForContestentScreen}
      />
      <Stack.Screen
        name={SCREENS.SESSION_DETAILS_SCREEN}
        component={SessionDetailsScreen}
      />
      <Stack.Screen
        name={SCREENS.SESSION_ONBOARDING_SCREEN}
        component={SessionOnBoardingScreen}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
