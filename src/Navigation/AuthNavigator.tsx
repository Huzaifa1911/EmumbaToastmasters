import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {SCREENS} from 'Utils';
import {LoginScreen, SignupScreen} from 'Screens';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={SCREENS.LOGIN_SCREEN} component={LoginScreen} />
      <Stack.Screen name={SCREENS.SIGNUP_SCREEN} component={SignupScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
