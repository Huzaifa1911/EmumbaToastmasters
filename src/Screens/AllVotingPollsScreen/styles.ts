import {TVotingPoll} from 'Types';
import {FlatList, View} from 'react-native';
import styled from 'styled-components/native';

export const Container = styled(View)({
  paddingTop: 30,
  paddingHorizontal: 16,
  marginBottom: 13,
});

export const VotingList = styled(FlatList<TVotingPoll>).attrs(() => ({
  contentContainerStyle: {paddingHorizontal: 16, paddingTop: 30},
}))({});
