/* eslint-disable react/no-unstable-nested-components */
import React, {
  createRef,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {Else, If, Then, When} from 'react-if';
import {propOr} from 'ramda';

import HeaderRightIcon from './Components/HeaderRightIcon';
import {
  AppActivityIndicator,
  AppBottomSheet,
  BlankState,
  PollTypeSheet,
  ScreenWrapper,
  SelectContestantsSheet,
  Spacer,
  VotingPollCard,
} from 'Components';
import {VotingList, VotingListSkeleton} from './styles';
import {
  TBottomSheetHandler,
  TDrawerParamList,
  TPollType,
  TFormattedVotingPoll,
  TStandardObject,
} from 'Types';
import Header from './Components/Header';
import {
  NavigationService,
  useUpdateVotingPoll,
  useCreateVotingPoll,
  useGetVotingPolls,
} from 'Services';
import {SCREENS, showToast} from 'Utils';
import {SheetTypes, TSheetType} from './utils';
import {selectUser, useAppSelector} from 'Store';

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

  const userId = useAppSelector(selectUser)?.id;
  const pollTypeRef = useRef<TPollType>();

  const {data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage} =
    useGetVotingPolls({showLoading: false});
  const {mutate: updatePollMutation} = useUpdateVotingPoll({showLoading: true});
  const {mutate: createPollMutation} = useCreateVotingPoll({showLoading: true});

  // constants
  const polls: TFormattedVotingPoll[] = propOr([], 'pages', data);
  const isPollTypeSelected = sheetType === SheetTypes.CONTESTENTS_SHEET;
  const snapPoints = isPollTypeSelected ? ['95%', '95%'] : [540, '90%'];
  const sheetTitle = isPollTypeSelected
    ? 'Add Contestants'
    : 'Select Poll type';

  const onProceedNext = (type?: TPollType) => {
    setSheetType(SheetTypes.CONTESTENTS_SHEET);
    pollTypeRef.current = type;
  };

  const onActivatePoll = (contenstants: TStandardObject[]) => {
    const payload = {
      poll_type: pollTypeRef.current?.id ?? 0,
      owner: userId ?? 0,
      candidates: contenstants.map(item => item.value as number),
      is_active: true,
    };
    createPollMutation(payload, {onSuccess: closeBottomSheet});
  };

  const onLoadMoreData = () => {
    if (hasNextPage) fetchNextPage();
  };

  const onCloseSheet = () => {
    closeBottomSheet();
    if (sheetType !== 'POLL_TYPE_SHEET')
      setSheetType(SheetTypes.POLL_TYPE_SHEET);
  };

  const renderItem = useCallback(
    ({item}: {item: TFormattedVotingPoll; index: number}) => {
      const isOwner = item.owner === userId;
      const navigateTo = item.is_active
        ? SCREENS.CAST_VOTE_SCREEN
        : SCREENS.VOTING_POLL_RESULT_SCREEN;

      const updatePoll = () => {
        if (isOwner)
          updatePollMutation({pollId: item.id, is_active: !item.is_active});
        else
          showToast(
            `Only poll owner can ${item.is_active ? 'close' : 'activate'} poll`,
            'Error',
            'error',
          );
      };

      return (
        <VotingPollCard
          actions={[updatePoll]}
          votingPoll={item}
          disabled={!isOwner && !item.is_active}
          onPress={() =>
            NavigationService.navigate(navigateTo, {pollId: item.id})
          }
        />
      );
    },
    [],
  );

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
        title={sheetTitle}
        snapPoints={snapPoints}
        onCloseSheet={onCloseSheet}>
        <If condition={sheetType === 'POLL_TYPE_SHEET'}>
          <Then>
            <PollTypeSheet onProceedNext={onProceedNext} />
          </Then>
          <Else>
            <SelectContestantsSheet onActivatePolling={onActivatePoll} />
          </Else>
        </If>
      </AppBottomSheet>
    </>
  );
};

export default AllVotingPollsScreen;

export const expandBottomSheet = () => sheetRef.current?.open();
export const closeBottomSheet = () => sheetRef.current?.close();
