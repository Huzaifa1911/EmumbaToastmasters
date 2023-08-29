/* eslint-disable react/no-unstable-nested-components */
import React, {createRef, useCallback, useState} from 'react';
import {
  AppActivityIndicator,
  AppBottomSheet,
  BlankState,
  ScreenWrapper,
  SelectGuestModeSheet,
  Spacer,
  VotingPollCard,
} from 'Components';
import {When} from 'react-if';
import {propOr} from 'ramda';

import Header from './Components/Header';
import {VotingList, VotingListSkeleton} from './styles';
import {NavigationService, useGetVotingPolls} from 'Services';
import {
  TBottomSheetHandler,
  TFormattedVotingPoll,
  TStandardObject,
} from 'Types';
import {SCREENS} from 'Utils';

const sheetRef = createRef<TBottomSheetHandler>();

const GuestMode = () => {
  const [selectedPollId, setSelectedPollId] = useState(0);
  const {data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage} =
    useGetVotingPolls({showLoading: false});

  const polls: TFormattedVotingPoll[] = propOr([], 'pages', data);

  const renderItem = useCallback(
    ({item}: {item: TFormattedVotingPoll; index: number}) => {
      const onPress = () => {
        setSelectedPollId(item.id);
        expandBottomSheet();
      };
      return (
        <VotingPollCard
          actions={[]}
          votingPoll={item}
          disabled={!item.is_active}
          onPress={onPress}
          guestMode
        />
      );
    },
    [],
  );

  const onLoadMoreData = () => hasNextPage && fetchNextPage();

  const onSelectVoter = (voter: TStandardObject) => {
    NavigationService.navigate(SCREENS.CAST_VOTE_SCREEN, {
      voterId: voter.value,
      pollId: selectedPollId,
    });
    closeBottomSheet();
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
            onEndReached={onLoadMoreData}
            ListFooterComponent={
              <AppActivityIndicator
                isLoading={isFetchingNextPage}
                spacerProps={{top: 15}}
              />
            }
            ListEmptyComponent={
              !(isLoading || isFetchingNextPage) ? (
                <BlankState
                  label="No Voting Polls Available"
                  infoText="There are no Voting Polls Created"
                />
              ) : null
            }
          />
        </When>

        <VotingListSkeleton isLoading={isLoading} />
      </ScreenWrapper>

      <AppBottomSheet
        ref={sheetRef}
        snapPoints={['95%']}
        onCloseSheet={closeBottomSheet}>
        <SelectGuestModeSheet onSelectGuestUser={onSelectVoter} />
      </AppBottomSheet>
    </>
  );
};

export default GuestMode;

export const expandBottomSheet = () => sheetRef.current?.open();
export const closeBottomSheet = () => sheetRef.current?.close();
