import React from 'react';
import {propOr} from 'ramda';

import {AppText, AttendedToastmastersSessions, ScreenWrapper, Spacer, StatCard} from 'Components';
import {Container} from './styles';
import {Row} from 'Styles';
import PerformanceChart from './Components/PerformanceChart';
import {selectUser, useAppSelector} from 'Store';

const HomeScreen = () => {
  const name = propOr('', 'first_name', useAppSelector(selectUser));

  return (
    <ScreenWrapper type="scroll">
      <Container>
        <AppText variant="medium" size={20}>
          {`Good Morning 👋\nToastmaster ${name}`}
        </AppText>
        <Spacer top={30} bottom={10}>
          <Row>
            <StatCard label="Total Session" value="20" />
            <Spacer flex={1} left={10}>
              <StatCard label="Attended Sessions" value="20" />
            </Spacer>
          </Row>
        </Spacer>
        <Row>
          <StatCard label="Highest Points" value="20" />
          <Spacer flex={1} left={10}>
            <StatCard label="Your Points" value="20" />
          </Spacer>
        </Row>

        {/* Performance Chart */}
        <PerformanceChart />

        {/* Attended Sessions List */}
        <AttendedToastmastersSessions showLatestSessions />
      </Container>
    </ScreenWrapper>
  );
};

export default HomeScreen;
