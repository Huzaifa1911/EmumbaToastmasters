import React from 'react';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {BottomNavigation} from 'react-native-paper';
import {CommonActions} from '@react-navigation/native';

import {useAppTheme} from 'Assets';

const BottomTabBar = ({descriptors, insets, navigation, state}: BottomTabBarProps) => {
  const {colors} = useAppTheme();

  return (
    <BottomNavigation.Bar
      navigationState={state}
      safeAreaInsets={insets}
      onTabPress={({route, preventDefault}) => {
        const event = navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        });

        if (event.defaultPrevented) {
          preventDefault();
        } else {
          navigation.dispatch({
            ...CommonActions.navigate(route.name, route.params),
            target: state.key,
          });
        }
      }}
      renderIcon={({route, focused, color}) => {
        const {options} = descriptors[route.key];
        if (options.tabBarIcon) {
          const fillColor = focused ? colors.primary : color;
          return options.tabBarIcon({focused, color: fillColor, size: 24});
        }
        return null;
      }}
      getLabelText={({route}) => {
        return descriptors[route.key].options.title || route.name;
      }}
    />
  );
};

export default BottomTabBar;
