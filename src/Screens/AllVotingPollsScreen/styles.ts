import {CardSkeletonList} from 'Skeletons';
import {TFormattedVotingPoll} from 'Types';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';

export const VotingList = styled(FlatList<TFormattedVotingPoll>).attrs(() => ({
  contentContainerStyle: {paddingHorizontal: 16, paddingBottom: 50},
}))({});

export const VotingListSkeleton = styled(CardSkeletonList).attrs(() => ({
  contentContainerStyle: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  length: 6,
}))({});
