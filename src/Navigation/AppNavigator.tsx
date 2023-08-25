import React, {useMemo} from 'react';
import {
  DrawerNavigationOptions,
  createDrawerNavigator,
} from '@react-navigation/drawer';

import {SCREENS} from 'Utils';
import BottomTabNavigator from './BottomTabs';
import {
  AllVotingPollsScreen,
  CastVoteScreen,
  ChangePasswordScreen,
  EditProfileScreen,
  SpeechTimeLogsScreen,
  TimerScreen,
  ViewAllAttendedSessionsScreen,
  VotingPollResultScreen,
} from 'Screens';
import AppHeader from './AppHeader';
import AppDrawer from './AppDrawer';
import {TDrawerParamList} from 'Types';
import {useAppTheme} from 'Assets';

const {Navigator, Screen} = createDrawerNavigator<TDrawerParamList>();

const AppNavigator = () => {
  const {colors} = useAppTheme();

  const drawerOptions: DrawerNavigationOptions = useMemo(() => {
    return {
      drawerStyle: {width: '65%'},
      drawerType: 'slide',
      sceneContainerStyle: {backgroundColor: colors.background},
      overlayColor: 'transparent',
      header: AppHeader,
    };
  }, [colors.background]);

  return (
    <Navigator
      screenOptions={drawerOptions}
      drawerContent={AppDrawer}
      backBehavior="history">
      <Screen
        name={SCREENS.BOTTOM_TABS}
        component={BottomTabNavigator}
        options={{headerShown: false}}
      />
      <Screen
        name={SCREENS.ALL_VOTING_POLLS_SCREEN}
        component={AllVotingPollsScreen}
        options={{unmountOnBlur: true}}
      />
      <Screen
        name={SCREENS.CAST_VOTE_SCREEN}
        component={CastVoteScreen}
        options={{unmountOnBlur: true}}
      />
      <Screen
        name={SCREENS.VOTING_POLL_RESULT_SCREEN}
        component={VotingPollResultScreen}
        options={{unmountOnBlur: true}}
      />
      <Screen
        name={SCREENS.VIEW_ALL_ATTENDED_SESSIONS_SCREEN}
        component={ViewAllAttendedSessionsScreen}
      />
      <Screen
        name={SCREENS.EDIT_PROFILE_SCREEN}
        component={EditProfileScreen}
      />
      <Screen
        name={SCREENS.CHANGE_PASSWORD_SCREEN}
        component={ChangePasswordScreen}
      />
      <Screen
        name={SCREENS.SPEECH_TIME_LOGS_SCREEN}
        component={SpeechTimeLogsScreen}
        options={{unmountOnBlur: true}}
      />
      <Screen name={SCREENS.TIMER_SCREEN} component={TimerScreen} />
    </Navigator>
  );
};

export default AppNavigator;
