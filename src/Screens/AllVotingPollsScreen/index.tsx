/* eslint-disable react/no-unstable-nested-components */
import React, {useLayoutEffect} from 'react';
import {DrawerScreenProps} from '@react-navigation/drawer';

import HeaderRightIcon from './Components/HeaderRightIcon';
import {ScreenWrapper, Spacer, VotingPollCard} from 'Components';
import {VotingList} from './styles';
import {TDrawerParamList, TVotingPoll} from 'Types';
import ListHeader from './Components/ListHeader';
import {NavigationService} from 'Services';
import {SCREENS} from 'Utils';

const VOTING_POLL: TVotingPoll[] = [
  {
    question: 'Vote for best prepared speaker',
    status: 'active',
    timestamp: 1684084694348,
  },
  {
    question: 'Vote for best prepared speaker',
    status: 'disabled',
    timestamp: 1684084694348,
  },
];

const AllVotingPollsScreen = ({
  navigation,
}: DrawerScreenProps<TDrawerParamList>) => {
  useLayoutEffect(
    () => navigation.setOptions({headerRight: HeaderRightIcon}),
    [],
  );

  const renderItem = ({item}: {item: TVotingPoll; index: number}) => {
    return (
      <VotingPollCard
        votingPoll={item}
        onPress={() => NavigationService.navigate(SCREENS.CAST_VOTE_SCREEN)}
      />
    );
  };

  return (
    <ScreenWrapper>
      <VotingList
        data={VOTING_POLL}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <Spacer top={11} />}
        ListHeaderComponent={ListHeader}
      />
    </ScreenWrapper>
  );
};

export default AllVotingPollsScreen;
