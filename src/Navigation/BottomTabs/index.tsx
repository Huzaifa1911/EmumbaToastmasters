/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {useDrawerStatus} from '@react-navigation/drawer';

import {BOTTOM_TABS} from './config';
import VectorIcon from 'Icons';
import BottomTabBar from './Components/BottomTabBar';
import AppHeader from '../AppHeader';
import {isIOS} from 'Utils';
import {StyledContainer, scenenContainerStyles} from './styles';

const {Navigator, Screen} = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const isOpened = useDrawerStatus() === 'open';

  const style = useAnimatedStyle(
    () => ({
      transform: [{scale: withTiming(isOpened ? 0.8 : 1)}],
    }),
    [isOpened],
  );

  return (
    <StyledContainer style={style}>
      <Navigator
        sceneContainerStyle={scenenContainerStyles.container}
        screenOptions={{header: AppHeader}}
        safeAreaInsets={{bottom: isIOS ? 8 : 0}}
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
    </StyledContainer>
  );
};

export default BottomTabNavigator;
