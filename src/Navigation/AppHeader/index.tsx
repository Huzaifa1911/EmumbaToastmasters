import React from 'react';
import {StatusBar} from 'react-native';
import {Appbar} from 'react-native-paper';
import {DrawerHeaderProps} from '@react-navigation/drawer';
import {BottomTabHeaderProps} from '@react-navigation/bottom-tabs';
import {Else, If, Then} from 'react-if';

import {SCREENS} from 'Utils';
import {AppText} from 'Components';
import {NavigationService} from 'Services';
import {HeaderLogo} from 'SvgIcons';

const getHeaderInfo = (route: string) => {
  switch (route) {
    case SCREENS.HOME_SCREEN:
      return {
        title: <HeaderLogo />,
        leftAccessory: (
          <Appbar.Action icon="menu" onPress={NavigationService.openDrawer} />
        ),
      };
    case SCREENS.LEADER_BOARD_SCREEN:
      return {
        title: 'Leader Board',
        leftAccessory: (
          <Appbar.Action icon="menu" onPress={NavigationService.openDrawer} />
        ),
      };
    case SCREENS.PROFILE_SCREEN:
      return {
        title: 'Profile',
        leftAccessory: (
          <Appbar.Action icon="menu" onPress={NavigationService.openDrawer} />
        ),
      };
    case SCREENS.ALL_VOTING_POLLS_SCREEN:
      return {
        title: 'Voting Poll',
        leftAccessory: (
          <Appbar.BackAction size={18} onPress={NavigationService.goBack} />
        ),
      };
    case SCREENS.CAST_VOTE_SCREEN:
      return {
        title: 'Cast Vote',
        leftAccessory: (
          <Appbar.BackAction size={18} onPress={NavigationService.goBack} />
        ),
      };
    case SCREENS.VOTING_POLL_RESULT_SCREEN:
      return {
        title: 'Voting Results',
        leftAccessory: (
          <Appbar.BackAction size={18} onPress={NavigationService.goBack} />
        ),
      };
    case SCREENS.VIEW_ALL_ATTENDED_SESSIONS_SCREEN:
      return {
        title: 'Attended Sessions',
        leftAccessory: (
          <Appbar.BackAction size={18} onPress={NavigationService.goBack} />
        ),
      };
    default:
      return {
        title: route,
        leftAccessory: (
          <Appbar.BackAction size={18} onPress={NavigationService.goBack} />
        ),
      };
  }
};

const AppHeader = ({
  route,
  options,
}: DrawerHeaderProps | BottomTabHeaderProps) => {
  const {leftAccessory, title} = getHeaderInfo(route.name);

  return (
    <>
      <StatusBar barStyle="dark-content" translucent />
      <Appbar.Header elevated>
        {options.headerLeft ? options.headerLeft({}) : leftAccessory}
        <Appbar.Content
          title={
            <If condition={typeof title === 'string'}>
              <Then>
                <AppText size={18} variant="bold" color="onSurfaceVariant">
                  {title}
                </AppText>
              </Then>
              <Else>{title}</Else>
            </If>
          }
        />
        {options.headerRight && options.headerRight({})}
      </Appbar.Header>
    </>
  );
};

export default AppHeader;
