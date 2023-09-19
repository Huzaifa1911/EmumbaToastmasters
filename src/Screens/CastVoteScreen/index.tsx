import React from 'react';
import {AppRadioButton, AppText, ScreenWrapper, Spacer} from 'Components';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {pathOr} from 'ramda';
import {RadioButton} from 'react-native-paper';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useSelector} from 'react-redux';

import {Container, SubmitButton} from './styles';
import {TDrawerParamList, TStandardVotingPoll} from 'Types';
import {castVoteSchema, getTimeDifference} from 'Utils';
import {
  useCastVote,
  useGetActiveVotingPollDetails,
  useUpdateVote,
} from 'Services';
import {selectUser} from 'Store';

type TDefaultValue = {selectedCandidate: number};

const CastVoteScreen = ({route}: DrawerScreenProps<TDrawerParamList>) => {
  const pollId = pathOr(0, ['params', 'pollId'], route);
  // !Guest Mode Code
  const guestVoterId = pathOr(0, ['params', 'voterId'], route);
  const userId = pathOr(0, ['id'], useSelector(selectUser));

  const hasGuestVoterId = guestVoterId > 0;

  const {data: details = {}, isLoading} = useGetActiveVotingPollDetails({
    showLoading: true,
    pollId,
    voterId: hasGuestVoterId ? guestVoterId : userId,
  });

  const {
    createdBy = {label: '', value: 0},
    candidates = [],
    question = '',
    timestamp = 0,
    castedVote = {candidateId: 0, voteId: 0},
    id = 0,
  } = details as TStandardVotingPoll;

  const {mutate: castVoteMutation} = useCastVote({showLoading: true});
  const {mutate: updateVoteMutation} = useUpdateVote({showLoading: true});

  const {
    control,
    handleSubmit,
    formState: {isValid, isDirty},
  } = useForm<TDefaultValue>({
    values: {selectedCandidate: castedVote.candidateId},
    resolver: yupResolver(castVoteSchema),
    mode: 'onChange',
  });

  const info = `Created By ${createdBy.label} . ${getTimeDifference(
    timestamp,
  )}`;

  const onCastVote = (data: TDefaultValue) => {
    if (castedVote.candidateId === 0)
      castVoteMutation({
        candidate: data.selectedCandidate,
        poll: id,
        // !Guest Mode Code
        voter: hasGuestVoterId ? guestVoterId : userId,
      });
    else
      updateVoteMutation({
        candidate: data.selectedCandidate,
        vote: castedVote.voteId,
      });
  };

  return (
    <ScreenWrapper>
      <Container>
        <AppText size={20} variant="bold" isLoading={isLoading}>
          {question}
        </AppText>

        {/* Poll Info */}
        <Spacer top={5} bottom={40}>
          <AppText size={12} color="outline">
            {info}
          </AppText>
        </Spacer>

        <Controller<TDefaultValue>
          control={control}
          name="selectedCandidate"
          render={({field: {value: candidateId, onChange}}) => (
            <RadioButton.Group
              value={candidateId as unknown as string}
              onValueChange={value => onChange(parseInt(value))}>
              {candidates.map((candidate, key) => {
                return (
                  <AppRadioButton
                    spacerProps={{top: key !== 0 ? 5 : 0}}
                    key={candidate.label + key.toString()}
                    value={candidate.value}
                    label={candidate.label}
                  />
                );
              })}
            </RadioButton.Group>
          )}
        />
      </Container>

      {/* Submit Button */}
      <Spacer horizontal={16} bottom={60}>
        <SubmitButton
          onPress={handleSubmit(onCastVote)}
          disabled={!isValid || !isDirty}>
          Cast Vote
        </SubmitButton>
      </Spacer>
    </ScreenWrapper>
  );
};

export default CastVoteScreen;
