import React, {useMemo} from 'react';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {Divider, Switch} from 'react-native-paper';

import {Container, ProfileWrapper} from './styles';
import {
  AngleRightIcon,
  LogoutIcon,
  MoonIcon,
  SunIcon,
  VotingPollIcon,
} from 'Icons';
import DrawerItem from './Components/DrawerItem';
import {AppText} from 'Components';
import {NavigationService} from 'Services';
import {SCREENS} from 'Utils';
import {useAppTheme} from 'Assets';
import {selectTheme, updateTheme, useAppDispatch, useAppSelector} from 'Store';

const userName = 'Huzaifa';

const goToAllVotingPollScreen = () =>
  NavigationService.navigate(SCREENS.ALL_VOTING_POLLS_SCREEN);

const AppDrawer = (props: DrawerContentComponentProps) => {
  const {colors} = useAppTheme();
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);

  const isDarkMode = theme === 'light';
  const darkModeIcon = useMemo(
    () => (isDarkMode ? <SunIcon size={18} /> : <MoonIcon size={18} />),
    [isDarkMode],
  );

  const toggleDarkMode = () => {
    dispatch(updateTheme({theme: isDarkMode ? 'dark' : 'light'}));
  };

  return (
    <Container>
      {/* User name view */}
      <ProfileWrapper>
        <AppText size={28} variant="bold">
          {userName}
        </AppText>
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
      </DrawerContentScrollView>

      {/* Logout button and dark mode switch  */}
      <Divider />
      <DrawerItem
        label="Logout"
        right={<AngleRightIcon size={18} color={colors.error} />}
        left={<LogoutIcon size={18} color={colors.error} />}
        type="danger"
      />
      <DrawerItem
        label="Light Mode"
        left={darkModeIcon}
        active
        right={<Switch value={isDarkMode} onValueChange={toggleDarkMode} />}
      />
    </Container>
  );
};

export default AppDrawer;
