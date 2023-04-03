import React from 'react';

import {SCREENS} from 'Utils';
import {CreateSessionScreen, EditSessionScreen} from 'Screens';
import AppNavigator from './AppNavigator';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const AdminNavigator = () => {
  return (
    <Drawer.Navigator screenOptions={{headerShown: true}}>
      <Drawer.Screen name={SCREENS.APP_NAVIGATOR} component={AppNavigator} />
      <Drawer.Screen
        name={SCREENS.CREATE_SESSION_SCREEN}
        component={CreateSessionScreen}
      />
      <Drawer.Screen
        name={SCREENS.EDIT_SESSION_SCREEN}
        component={EditSessionScreen}
      />
    </Drawer.Navigator>
  );
};

export default AdminNavigator;
