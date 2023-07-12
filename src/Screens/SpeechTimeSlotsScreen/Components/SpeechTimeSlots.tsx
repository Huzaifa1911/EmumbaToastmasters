/* eslint-disable react/no-unstable-nested-components */
import {FlatList} from 'react-native';
import React from 'react';

import {TSpeechTimeSlot} from 'Types';
import {AppText, BlankState, Spacer, SpeechTimeCard} from 'Components';
import {selectSpeechTimeSlots, useAppSelector} from 'Store';
import {NavigationService} from 'Services';
import {SCREENS} from 'Utils';

const SpeechTimeSlots = () => {
  const slots = useAppSelector(selectSpeechTimeSlots);

  const renderItem = ({item}: {item: TSpeechTimeSlot}) => {
    const goToTimerScreen = () =>
      NavigationService.navigate(SCREENS.TIMER_SCREEN, {slot: item});

    return (
      <SpeechTimeCard speech={item} onPrimaryButtonPress={goToTimerScreen} />
    );
  };

  return (
    <FlatList<TSpeechTimeSlot>
      ListHeaderComponent={
        <Spacer bottom={20}>
          <AppText variant="bold" size={23}>
            List of Speeches
          </AppText>
        </Spacer>
      }
      data={slots}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString() + item.speaker}
      ItemSeparatorComponent={() => <Spacer top={13} />}
      ListEmptyComponent={
        <BlankState
          label="No Speech Time Slot"
          infoText="There are no speech time slot created"
        />
      }
    />
  );
};

export default SpeechTimeSlots;
