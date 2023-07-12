import React from 'react';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {Divider, Switch} from 'react-native-paper';
import {propOr} from 'ramda';

import {Container, ProfileWrapper} from './styles';
import {
  AngleRightIcon,
  LogoutIcon,
  StopwatchIcon,
  SunIcon,
  VotingPollIcon,
} from 'Icons';
import DrawerItem from './Components/DrawerItem';
import {AppText, ProfileAvatar, Spacer} from 'Components';
import {NavigationService, useLogout} from 'Services';
import {SCREENS} from 'Utils';
import {useAppTheme} from 'Assets';
import {
  selectTheme,
  selectUser,
  updateTheme,
  useAppDispatch,
  useAppSelector,
} from 'Store';

const goToAllVotingPollScreen = () =>
  NavigationService.navigate(SCREENS.ALL_VOTING_POLLS_SCREEN);
const goToSpeechTimeSlotsScreen = () =>
  NavigationService.navigate(SCREENS.SPEECH_TIME_SLOTS_SCREEN);

const AppDrawer = (props: DrawerContentComponentProps) => {
  const {colors} = useAppTheme();
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);
  const user = useAppSelector(selectUser);
  const {mutate: onLogout} = useLogout({showLoading: true});

  const name: string = propOr('User', 'first_name', user);

  const isDarkMode = theme === 'light';

  const toggleDarkMode = () => {
    dispatch(updateTheme({theme: isDarkMode ? 'dark' : 'light'}));
  };

  return (
    <Container>
      {/* User name view */}
      <ProfileWrapper mode={theme}>
        <ProfileAvatar size={70} uri="" />
        <Spacer left={14}>
          <AppText size={28} variant="bold" color="white">
            {name}
          </AppText>
        </Spacer>
      </ProfileWrapper>
      <Divider />

      {/* Navigation Screen */}
      <DrawerContentScrollView {...props}>
        <DrawerItem
          label="Voting Poll"
          left={<VotingPollIcon size={18} />}
          right={<AngleRightIcon size={18} />}
          onPress={goToAllVotingPollScreen}
        />
        <DrawerItem
          label="Timer"
          left={<StopwatchIcon size={18} />}
          right={<AngleRightIcon size={18} />}
          onPress={goToSpeechTimeSlotsScreen}
        />
      </DrawerContentScrollView>

      {/* Logout button and dark mode switch  */}
      <Divider />
      <DrawerItem
        label="Logout"
        right={<AngleRightIcon size={18} color={colors.error} />}
        left={<LogoutIcon size={18} color={colors.error} />}
        type="danger"
        onPress={onLogout}
      />
      <DrawerItem
        label="Light Mode"
        left={<SunIcon size={18} />}
        right={<Switch value={isDarkMode} onValueChange={toggleDarkMode} />}
      />
    </Container>
  );
};

export default AppDrawer;
