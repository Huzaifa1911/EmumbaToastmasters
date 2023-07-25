/* eslint-disable react/no-unstable-nested-components */
import {SectionList} from 'react-native';
import React from 'react';

import {TSpeechTimeLog, TSpeechTimeLogSection} from 'Types';
import {AppText, BlankState, Spacer, SpeechTimeCard} from 'Components';
import {selectSpeechTimeLogs, useAppSelector} from 'Store';
import {NavigationService} from 'Services';
import {SCREENS, groupSpeechTimeLogsBySpeechType} from 'Utils';

const SpeechTimeLogs = () => {
  const slots = useAppSelector(selectSpeechTimeLogs);
  const groupedData = groupSpeechTimeLogsBySpeechType(slots);

  const renderItem = ({item}: {item: TSpeechTimeLog}) => {
    const goToTimerScreen = () =>
      NavigationService.navigate(SCREENS.TIMER_SCREEN, {slot: item});

    return (
      <SpeechTimeCard speech={item} onPrimaryButtonPress={goToTimerScreen} />
    );
  };

  const sectionHeader = ({section}: {section: TSpeechTimeLogSection}) => {
    return (
      <Spacer vertical={10}>
        <AppText variant="bold" size={20}>
          {section.title}
        </AppText>
      </Spacer>
    );
  };

  return (
    <SectionList
      sections={groupedData}
      renderItem={renderItem}
      renderSectionHeader={sectionHeader}
      keyExtractor={(item, index) => index.toString() + item.speaker}
      ItemSeparatorComponent={() => <Spacer top={13} />}
      ListEmptyComponent={
        <BlankState
          label="No Speech Time Logs"
          infoText="There are no speech time log created"
        />
      }
    />
  );
};

export default SpeechTimeLogs;
