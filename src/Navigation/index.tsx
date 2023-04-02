import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SCREENS} from 'Utils';
import {LoginScreen} from 'Screens';

const AuthStack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <AuthStack.Navigator>
        <AuthStack.Screen name={SCREENS.LOGIN_SCREEN} component={LoginScreen} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
