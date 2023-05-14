/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {BOTTOM_TABS} from './config';
import VectorIcon from 'Icons';
import BottomTabBar from './Components/BottomTabBar';
import AppHeader from '../AppHeader';

const {Navigator, Screen} = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Navigator
      screenOptions={{header: AppHeader}}
      safeAreaInsets={{bottom: 8}}
      tabBar={props => <BottomTabBar {...props} />}>
      {BOTTOM_TABS.map((tab, index) => (
        <Screen
          key={tab.name + index.toString()}
          name={tab.name}
          component={tab.component}
          options={{
            title: tab.title,
            tabBarIcon: ({size, color}) => (
              <VectorIcon
                iconType={tab.icon.type}
                name={tab.icon.name}
                size={size}
                color={color}
              />
            ),
          }}
        />
      ))}
    </Navigator>
  );
};

export default BottomTabNavigator;
