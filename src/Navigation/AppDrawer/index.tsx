import React from 'react';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';

import {Container, ProfileWrapper} from './styles';
import {AngleRightIcon} from 'Icons';
import DrawerItem from './Components/DrawerItem';
import {AppText} from 'Components';
import {NavigationService} from 'Services';
import {SCREENS} from 'Utils';

const userName = 'Huzaifa';

const goToAllVotingPollScreen = () =>
  NavigationService.navigate(SCREENS.ALL_VOTING_POLLS_SCREEN);
// const goToCastVoteScreen = () =>
//   NavigationService.navigate(SCREENS.CAST_VOTE_SCREEN);

// const goToVotingPollResultScreeen = () =>
//   NavigationService.navigate(SCREENS.VOTING_POLL_RESULT_SCREEN);

const AppDrawer = (props: DrawerContentComponentProps) => {
  return (
    <Container>
      <ProfileWrapper>
        <AppText size={28} variant="bold">
          {userName}
        </AppText>
      </ProfileWrapper>
      <DrawerContentScrollView {...props}>
        <DrawerItem
          label="Voting Poll"
          right={<AngleRightIcon size={18} />}
          onPress={goToAllVotingPollScreen}
        />
        {/* <DrawerItem
          label="Cast Vote"
          right={<AngleRightIcon size={18} />}
          onPress={goToCastVoteScreen}
        />
        <DrawerItem
          label="Voting Poll Results"
          right={<AngleRightIcon size={18} />}
          onPress={goToVotingPollResultScreeen}
        /> */}
      </DrawerContentScrollView>
    </Container>
  );
};

export default AppDrawer;
