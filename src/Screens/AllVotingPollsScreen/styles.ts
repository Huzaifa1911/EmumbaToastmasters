import {CardSkeletonList} from 'Skeletons';
import {TFormattedVotingPoll} from 'Types';
import {FlatList, View} from 'react-native';
import styled from 'styled-components/native';

export const Container = styled(View)({
  paddingTop: 30,
  paddingHorizontal: 16,
  marginBottom: 13,
});

export const VotingList = styled(FlatList<TFormattedVotingPoll>).attrs(() => ({
  contentContainerStyle: {paddingHorizontal: 16, paddingTop: 30},
}))({});

export const VotingListSkeleton = styled(CardSkeletonList).attrs(() => ({
  contentContainerStyle: {paddingHorizontal: 16, paddingTop: 30},
  height: 100,
  length: 8,
}))({});
