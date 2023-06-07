/* eslint-disable react/no-unstable-nested-components */
import React from 'react';

import {PositionHolderCard, ScreenWrapper, Spacer} from 'Components';
import TopParticipants from './Components/TopParticipants';
import {ParticipantFlatList, ScreenContainer} from './styles';
import {ToasmtasterType} from 'Types';

const DATA = {
  first: {name: 'Huzaifa', profileImage: '', points: 232, position: 1},
  second: {name: 'Huzaifa', profileImage: '', points: 232, position: 2},
  third: {name: 'Huzaifa', profileImage: '', points: 232, position: 3},
  otherParticipants: [
    {
      name: 'Huzaifa',
      profileImage: '',
      points: 232,
      position: 4,
    },
    {
      name: 'Huzaifa',
      profileImage: '',
      points: 232,
      position: 5,
    },
    {
      name: 'Huzaifa',
      profileImage: '',
      points: 232,
      position: 5,
    },
    {
      name: 'Huzaifa',
      profileImage: '',
      points: 232,
      position: 5,
    },
    {
      name: 'Huzaifa',
      profileImage: '',
      points: 232,
      position: 5,
    },
    {
      name: 'Huzaifa',
      profileImage: '',
      points: 232,
      position: 5,
    },
  ],
};

const LeaderBoardScreen = () => {
  const {first, second, third, otherParticipants = []} = DATA;

  const renderItem = ({item}: {item: ToasmtasterType}) => {
    return <PositionHolderCard participant={item} />;
  };

  return (
    <ScreenWrapper type="scroll">
      <ScreenContainer>
        <TopParticipants first={first} second={second} third={third} />
      </ScreenContainer>
      <Spacer>
        <ParticipantFlatList
          data={otherParticipants}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <Spacer top={15} />}
        />
      </Spacer>
    </ScreenWrapper>
  );
};

export default LeaderBoardScreen;
