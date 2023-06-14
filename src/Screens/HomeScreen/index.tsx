import React from 'react';
import {propOr} from 'ramda';

import {
  AppText,
  AttendedToastmastersSessions,
  ScreenWrapper,
  Spacer,
  StatCard,
} from 'Components';
import {Container} from './styles';
import {Row} from 'Styles';
import PerformanceChart from './Components/PerformanceChart';
import {selectUser, useAppSelector} from 'Store';
import {useGetStatPoints} from 'Services';

const HomeScreen = () => {
  const name = propOr('', 'first_name', useAppSelector(selectUser));
  const {
    data = {
      attendedEvents: 0,
      hightestPoints: 0,
      totalEvents: 0,
      userPoints: 0,
    },
  } = useGetStatPoints({showLoading: true});

  return (
    <ScreenWrapper type="scroll">
      <Container>
        <AppText variant="medium" size={20}>
          {`Good Morning 👋\nToastmaster ${name}`}
        </AppText>
        <Spacer top={30} bottom={10}>
          <Row>
            <StatCard label="Total Session" value={data.totalEvents} />
            <Spacer flex={1} left={10}>
              <StatCard label="Attended Sessions" value={data.attendedEvents} />
            </Spacer>
          </Row>
        </Spacer>
        <Row>
          <StatCard label="Highest Points" value={data.hightestPoints} />
          <Spacer flex={1} left={10}>
            <StatCard label="Your Points" value={data.userPoints} />
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
