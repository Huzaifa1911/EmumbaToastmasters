import React from 'react';
import {pathOr} from 'ramda';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {When} from 'react-if';

import {AppText, ScreenWrapper, Spacer, ToastmasterCard} from 'Components';
import {Container, VotesTable} from './styles';
import {getTimeDifference} from 'Utils';
import PollResultChart from './Components/PollResultChart';
import {TClosedVotingPoll, TDrawerParamList} from 'Types';
import {useGetClosedPollDetails} from 'Services';

const VotingPollResultScreen = ({
  route,
}: DrawerScreenProps<TDrawerParamList>) => {
  const pollId = pathOr(0, ['params', 'pollId'], route);

  const {data = {}, isLoading} = useGetClosedPollDetails({
    showLoading: true,
    pollId,
  });

  const {
    candidates = [],
    createdBy = {label: '', value: 0},
    question = '',
    timestamp = 0,
    winner = {label: '', value: 0},
  } = data as TClosedVotingPoll;

  const info = `Created By ${createdBy.label} . ${getTimeDifference(
    timestamp,
  )}`;

  return (
    <ScreenWrapper type="scroll">
      <Container>
        <AppText size={20} variant="bold" isLoading={isLoading}>
          {question}
        </AppText>
        {/* Poll Info */}
        <Spacer top={5} bottom={30} right={30}>
          <AppText size={12} color="outline">
            {info}
          </AppText>
        </Spacer>
        <When
          condition={isLoading || (candidates.length !== 0 && winner.label)}>
          <Spacer bottom={10}>
            <AppText size={18} variant="bold" isLoading={isLoading}>
              {/* Trim out `Vote For` from question */}
              {question.slice(8, question.length)}
            </AppText>
          </Spacer>
          <ToastmasterCard isLoading={isLoading} toastmaster={winner} />
          <Spacer bottom={30} />
        </When>
        {/* Result Pie Chart */}
        <PollResultChart
          isLoading={isLoading}
          data={candidates}
          winner={winner.label}
        />

        <VotesTable>
          <VotesTable.Header>
            <VotesTable.Title>Speakers</VotesTable.Title>
            <VotesTable.Title numeric>Votes</VotesTable.Title>
          </VotesTable.Header>

          {candidates.map((candidate, index) => (
            <VotesTable.Row key={index.toString() + candidate.id}>
              <VotesTable.Cell>{candidate.label}</VotesTable.Cell>
              <VotesTable.Cell numeric>{candidate.votes}</VotesTable.Cell>
            </VotesTable.Row>
          ))}
        </VotesTable>
      </Container>
    </ScreenWrapper>
  );
};

export default VotingPollResultScreen;
