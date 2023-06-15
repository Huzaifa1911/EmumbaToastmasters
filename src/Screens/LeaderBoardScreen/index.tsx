/* eslint-disable react/no-unstable-nested-components */
import React from 'react';

import {PositionHolderCard, ScreenWrapper, Spacer} from 'Components';
import TopParticipants from './Components/TopParticipants';
import {
  ParticipantFlatList,
  ParticipantListSkeleton,
  ScreenContainer,
} from './styles';
import {ToasmtasterType} from 'Types';
import {useGetGamificationPoints} from 'Services';

const LeaderBoardScreen = () => {
  const {data = [], isLoading} = useGetGamificationPoints({showLoading: true});

  const topThree = data.slice(0, 3);
  const rest = data.slice(3, data.length);

  const renderItem = ({
    item,
    index,
  }: {
    item: ToasmtasterType;
    index: number;
  }) => {
    return <PositionHolderCard participant={item} position={index + 4} />;
  };

  return (
    <ScreenWrapper type="scroll">
      <ScreenContainer>
        <TopParticipants
          first={topThree[0]}
          second={topThree[1]}
          third={topThree[2]}
        />
      </ScreenContainer>
      <Spacer>
        <ParticipantListSkeleton
          length={8}
          isLoading={isLoading}
          height={53}
          borderRadius={20}
        />

        <ParticipantFlatList
          data={rest}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <Spacer top={15} />}
        />
      </Spacer>
    </ScreenWrapper>
  );
};

export default LeaderBoardScreen;
