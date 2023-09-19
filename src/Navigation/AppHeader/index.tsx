import React from 'react';
import {StatusBar} from 'react-native';
import {Appbar} from 'react-native-paper';
import {DrawerHeaderProps} from '@react-navigation/drawer';
import {BottomTabHeaderProps} from '@react-navigation/bottom-tabs';
import {Else, If, Then} from 'react-if';

import {SCREENS, isIOS} from 'Utils';
import {AppText} from 'Components';
import {NavigationService} from 'Services';
import {HeaderLogo} from 'SvgIcons';

const BackAction = () => (
  <Appbar.BackAction
    size={isIOS ? 18 : 20}
    onPress={NavigationService.goBack}
  />
);

const Menu = () => (
  <Appbar.Action icon="menu" onPress={NavigationService.openDrawer} />
);

const getHeaderInfo = (route: string) => {
  switch (route) {
    case SCREENS.HOME_SCREEN:
      return {
        title: <HeaderLogo />,
        leftAccessory: <Menu />,
      };
    case SCREENS.LEADER_BOARD_SCREEN:
      return {
        title: 'Leader Board',
        leftAccessory: <Menu />,
      };
    case SCREENS.PROFILE_SCREEN:
      return {
        title: 'My Profile',
        leftAccessory: <Menu />,
      };
    case SCREENS.ALL_VOTING_POLLS_SCREEN:
    case SCREENS.ALL_VOTING_POLLS_FOR_GUEST_SCREEN:
      return {
        title: 'Voting Poll',
        leftAccessory: <BackAction />,
      };
    case SCREENS.CAST_VOTE_SCREEN:
      return {
        title: 'Cast Vote',
        leftAccessory: <BackAction />,
      };
    case SCREENS.VOTING_POLL_RESULT_SCREEN:
      return {
        title: 'Voting Results',
        leftAccessory: <BackAction />,
      };
    case SCREENS.VIEW_ALL_ATTENDED_SESSIONS_SCREEN:
      return {
        title: 'Attended Sessions',
        leftAccessory: <BackAction />,
      };
    case SCREENS.EDIT_PROFILE_SCREEN:
      return {
        title: 'Edit Profile',
        leftAccessory: <BackAction />,
      };
    case SCREENS.CHANGE_PASSWORD_SCREEN:
      return {
        title: 'Change Password',
        leftAccessory: <BackAction />,
      };
    case SCREENS.SPEECH_TIME_LOGS_SCREEN:
      return {
        title: 'Timer Logs',
        leftAccessory: <BackAction />,
      };
    case SCREENS.TIMER_SCREEN:
      return {
        title: 'Timer',
        leftAccessory: <BackAction />,
      };
    case SCREENS.EDIT_VOTING_POLL_SCREEN:
      return {
        title: 'Edit Voting Poll',
        leftAccessory: <BackAction />,
      };
    default:
      return {
        title: route,
        leftAccessory: <BackAction />,
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
      <StatusBar barStyle={'dark-content'} translucent />
      <Appbar.Header elevated mode="center-aligned">
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
