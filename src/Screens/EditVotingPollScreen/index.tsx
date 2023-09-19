import React, {createRef} from 'react';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {pathOr} from 'ramda';
import {Else, If, Then} from 'react-if';

import {
  AppBottomSheet,
  AppText,
  BlankState,
  ScreenWrapper,
  SelectContestantsSheet,
  Spacer,
  ToastmasterCard,
} from 'Components';
import {
  TBottomSheetHandler,
  TDrawerParamList,
  TStandardObject,
  TVotingPollDetails,
} from 'Types';
import {Container} from './styles';
import {
  useGetActiveVotingPollDetailsForEdit,
  useUpdateVotingPoll,
} from 'Services';
import {getTimeDifference} from 'Utils';
import {FlexEnd} from 'Styles';
import {AddCircleIcon} from 'Icons';
import {useAppTheme} from 'Assets';
import {CardSkeletonList} from 'Skeletons';

const sheetRef = createRef<TBottomSheetHandler>();

const EditVotingPollScreen = ({route}: DrawerScreenProps<TDrawerParamList>) => {
  const pollId = pathOr(0, ['params', 'pollId'], route);

  const {colors} = useAppTheme();
  const {mutate} = useUpdateVotingPoll({showLoading: true});
  const {data = {}, isLoading = false} = useGetActiveVotingPollDetailsForEdit({
    showLoading: true,
    pollId,
  });

  const {
    createdBy = {label: '', value: 0},
    candidates = [],
    question = '',
    timestamp = 0,
    is_active,
  } = data as TVotingPollDetails;

  const info = `Created By ${createdBy.label} . ${getTimeDifference(
    timestamp,
  )}`;

  const hasCandidates = candidates.length > 0;

  const onSubmit = (contestants: TStandardObject[]) => {
    mutate(
      {
        pollId,
        is_active,
        candidates: contestants.map(candidate => candidate.value as number),
      },
      {
        onSuccess: closeBottomSheet,
      },
    );
  };

  return (
    <>
      <ScreenWrapper type="scroll">
        <Container>
          <AppText size={20} variant="bold" isLoading={isLoading}>
            {question}
          </AppText>

          {/* Poll Info */}
          <Spacer top={5} bottom={20}>
            <AppText size={12} color="outline">
              {info}
            </AppText>
          </Spacer>

          <FlexEnd>
            <AppText
              variant="bold"
              size={14}
              color="primary"
              onPress={expandBottomSheet}
              rightAccessory={
                <AddCircleIcon size={20} color={colors.primary} />
              }>
              Add Candidates
            </AppText>
          </FlexEnd>

          <If condition={hasCandidates}>
            <Then>
              {candidates.map((candidate, key) => (
                <ToastmasterCard
                  key={candidate.label + key.toString()}
                  toastmaster={candidate}
                />
              ))}
            </Then>

            <Else>
              <If condition={isLoading}>
                <Then>
                  <Spacer top={15} />
                  <CardSkeletonList isLoading height={90} length={5} />
                </Then>
                <Else>
                  <BlankState
                    label="No Candidates Found"
                    infoText="There were no candidates added"
                  />
                </Else>
              </If>
            </Else>
          </If>
        </Container>
      </ScreenWrapper>

      <AppBottomSheet
        ref={sheetRef}
        title={'Add Candidates'}
        snapPoints={['95%', '95%']}
        onCloseSheet={closeBottomSheet}>
        <SelectContestantsSheet
          buttonTitle="Submit"
          onSubmit={onSubmit}
          selectedContestantList={candidates}
        />
      </AppBottomSheet>
    </>
  );
};

export default EditVotingPollScreen;

export const expandBottomSheet = () => sheetRef.current?.open();
export const closeBottomSheet = () => sheetRef.current?.close();
