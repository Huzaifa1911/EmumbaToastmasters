/* eslint-disable react/no-unstable-nested-components */
import React, {createRef, useLayoutEffect, useState} from 'react';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {Else, If, Then, When} from 'react-if';
import {propOr} from 'ramda';

import HeaderRightIcon from './Components/HeaderRightIcon';
import {
  AppBottomSheet,
  PollTypeSheet,
  ScreenWrapper,
  SelectContestentsSheet,
  Spacer,
  VotingPollCard,
} from 'Components';
import {VotingList, VotingListSkeleton} from './styles';
import {
  TBottomSheetHandler,
  TDrawerParamList,
  TPollType,
  TFormattedVotingPoll,
} from 'Types';
import Header from './Components/Header';
import {NavigationService, useGetVotingPolls} from 'Services';
import {SCREENS, isEmptyOrNill} from 'Utils';
import {SheetTypes, TSheetType} from './utils';

const sheetRef = createRef<TBottomSheetHandler>();

const AllVotingPollsScreen = ({
  navigation,
}: DrawerScreenProps<TDrawerParamList>) => {
  useLayoutEffect(
    () => navigation.setOptions({headerRight: HeaderRightIcon}),
    [],
  );

  const [sheetType, setSheetType] = useState<TSheetType>(
    SheetTypes.POLL_TYPE_SHEET,
  );

  const {data, isLoading} = useGetVotingPolls({showLoading: false});
  const polls: TFormattedVotingPoll[] = propOr([], 'pages', data);

  const isPollTypeSelected = sheetType === SheetTypes.CONTESTENTS_SHEET;
  const snapPoints = isPollTypeSelected ? ['90%', '90%'] : ['80%', '90%'];
  const sheetTitle = isPollTypeSelected
    ? 'Add Contestents'
    : 'Select Poll type';

  const renderItem = ({item}: {item: TFormattedVotingPoll; index: number}) => {
    const navigateTo = item.is_active
      ? SCREENS.CAST_VOTE_SCREEN
      : SCREENS.VOTING_POLL_RESULT_SCREEN;
    return (
      <VotingPollCard
        votingPoll={item}
        onPress={() =>
          NavigationService.navigate(navigateTo, {pollId: item.id})
        }
      />
    );
  };

  const onProceedNext = (pollType?: TPollType) => {
    if (!isEmptyOrNill(pollType)) setSheetType(SheetTypes.CONTESTENTS_SHEET);
  };

  const onActivatePoll = () => {
    //
  };

  return (
    <>
      <ScreenWrapper>
        <Header />
        <When condition={!isLoading}>
          <VotingList
            data={polls}
            keyExtractor={(item, index) => index.toString() + item.id}
            renderItem={renderItem}
            ItemSeparatorComponent={() => <Spacer top={11} />}
          />
        </When>

        <VotingListSkeleton isLoading={isLoading} />
      </ScreenWrapper>

      <AppBottomSheet
        ref={sheetRef}
        title={sheetTitle}
        snapPoints={snapPoints}
        onCloseSheet={closeBottomSheet}>
        <If condition={sheetType === 'POLL_TYPE_SHEET'}>
          <Then>
            <PollTypeSheet onProceedNext={onProceedNext} />
          </Then>
          <Else>
            <SelectContestentsSheet onActivatePolling={onActivatePoll} />
          </Else>
        </If>
      </AppBottomSheet>
    </>
  );
};

export default AllVotingPollsScreen;

export const expandBottomSheet = () => sheetRef.current?.open();
export const closeBottomSheet = () => sheetRef.current?.close();
