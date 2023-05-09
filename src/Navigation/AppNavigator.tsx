import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {SCREENS} from 'Utils';
import {HomeScreen} from 'Screens';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={SCREENS.HOME_SCREEN} component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
