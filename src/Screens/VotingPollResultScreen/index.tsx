import React from 'react';
import {When} from 'react-if';

import {AppText, ScreenWrapper, Spacer, ToastmasterCard} from 'Components';
import {Container} from './styles';
import {DEFAULT_IMAGE, getTimeDifference} from 'Utils';
import PollResultChart from './Components/PollResultChart';

const VotingPollResultData = {
  question: 'Who is the best of big 3?',
  createdBy: 'Huzaifa',
  timestamp: 1684084694348,
  winner: 'Huzaifa',
};

const VotingPollResultScreen = () => {
  const {question, createdBy, timestamp, winner} = VotingPollResultData;

  const info = `Created By ${createdBy} . ${getTimeDifference(timestamp)}`;
  return (
    <ScreenWrapper type="scroll">
      <Container>
        <AppText size={20} variant="bold">
          {question}
        </AppText>

        {/* Poll Info */}
        <Spacer top={5} bottom={30}>
          <AppText size={12} color="outline">
            {info}
          </AppText>
        </Spacer>

        <When condition={winner}>
          <Spacer bottom={10}>
            <AppText size={18} variant="bold">
              Best of Big 3
            </AppText>
          </Spacer>
          <ToastmasterCard
            toastmaster={{name: winner, profileImage: DEFAULT_IMAGE}}
          />
          <Spacer bottom={30} />
        </When>

        {/* Result Pie Chart */}
        <PollResultChart />
      </Container>
    </ScreenWrapper>
  );
};

export default VotingPollResultScreen;
