import React from 'react';
import {AppRadioButton, AppText, ScreenWrapper, Spacer} from 'Components';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {pathOr, propOr} from 'ramda';
import {RadioButton} from 'react-native-paper';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import {Container, SubmitButton} from './styles';
import {TDrawerParamList, TStandardVotingPoll} from 'Types';
import {castVoteSchema, getTimeDifference} from 'Utils';
import {useCastVote, useGetActiveVotingPollDetails} from 'Services';
import {selectUser, useAppSelector} from 'Store';

type TDefaultValue = {selectedCandidate: number};

const CastVoteScreen = ({route}: DrawerScreenProps<TDrawerParamList>) => {
  const pollId = pathOr(0, ['params', 'pollId'], route);
  const userId: number = propOr(0, 'id', useAppSelector(selectUser));

  const {data: details = {}, isLoading} = useGetActiveVotingPollDetails({
    showLoading: true,
    pollId,
  });

  const {mutate: castVoteMutation} = useCastVote({showLoading: true});

  const {
    createdBy = {label: '', value: 0},
    candidates = [],
    question = '',
    timestamp = 0,
    castedVote = 0,
    id = 0,
  } = details as TStandardVotingPoll;

  const {
    control,
    handleSubmit,
    formState: {isValid, isDirty},
  } = useForm<TDefaultValue>({
    values: {selectedCandidate: castedVote},
    resolver: yupResolver(castVoteSchema),
    mode: 'onChange',
  });

  const info = `Created By ${createdBy.label} . ${getTimeDifference(
    timestamp,
  )}`;

  const onCastVote = (data: TDefaultValue) => {
    castVoteMutation({
      payload: {candidate: data.selectedCandidate, poll: id, voter: userId},
      method: castedVote === 0 ? 'post' : 'patch', // *if castedVote==0, which means voter havent casted a vote, so the  request to an endpoint will be `post`, otherwise `patch`
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
              onValueChange={onChange}>
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
          Submit
        </SubmitButton>
      </Spacer>
    </ScreenWrapper>
  );
};

export default CastVoteScreen;
