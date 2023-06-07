import React, {useState} from 'react';
import {AppRadioButton, AppText, ScreenWrapper, Spacer} from 'Components';

import {Container, SubmitButton} from './styles';
import {TStandardVotingPoll} from 'Types';
import {RadioButton} from 'react-native-paper';
import {getTimeDifference, isEmptyOrNill} from 'Utils';
import {find, propEq} from 'ramda';

const POLL_DATA: TStandardVotingPoll = {
  question: 'Who is the best of big 3?',
  createdBy: 'Huzaifa',
  timestamp: 1684084694348,
  options: [
    {label: 'Toastmaster Khalid', value: '1'},
    {label: 'Toastmaster Usama', value: '2'},
    {label: 'Toastmaster Huzaifa', value: '3'},
  ],
};

const CastVoteScreen = () => {
  const {question, createdBy, options, timestamp} = POLL_DATA;

  const info = `Created By ${createdBy} . ${getTimeDifference(timestamp)}`;

  const [selectedOption, setSelectedOption] = useState('');

  const onSubmit = () => {
    const option = find(propEq(selectedOption, 'value'), options);
  };

  return (
    <ScreenWrapper>
      <Container>
        <AppText size={20} variant="bold">
          {question}
        </AppText>

        {/* Poll Info */}
        <Spacer top={5} bottom={40}>
          <AppText size={12} color="outline">
            {info}
          </AppText>
        </Spacer>

        <RadioButton.Group value={selectedOption} onValueChange={value => setSelectedOption(value)}>
          {options.map((option, key) => {
            return <AppRadioButton spacerProps={{top: key !== 0 ? 5 : 0}} key={option.value + key} value={option.value} label={option.label} />;
          })}
        </RadioButton.Group>
      </Container>

      {/* Submit Button */}
      <Spacer horizontal={16} bottom={60}>
        <SubmitButton onPress={onSubmit} disabled={isEmptyOrNill(selectedOption)}>
          Submit
        </SubmitButton>
      </Spacer>
    </ScreenWrapper>
  );
};

export default CastVoteScreen;
