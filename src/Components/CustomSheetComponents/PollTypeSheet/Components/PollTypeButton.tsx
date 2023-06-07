import React from 'react';
import {RadioButton} from 'react-native-paper';

import {PollButtonContainer, Wrapper} from '../styles';
import {AppText} from 'Components';

interface IPollTypeButtonProps {
  title?: string;
  isSelected: boolean;
  onPress: () => void;
}

const PollTypeButton = ({isSelected, title, onPress}: IPollTypeButtonProps) => {
  const color = isSelected ? 'primary' : 'onBackground';
  const status = isSelected ? 'checked' : 'unchecked';

  return (
    <PollButtonContainer isSelected={isSelected} activeOpacity={0.7} onPress={onPress}>
      <RadioButton.Android value="" status={status} />

      <Wrapper>
        <AppText size={14} variant="medium" textAlign="center" color={color}>
          {title}
        </AppText>
      </Wrapper>
    </PollButtonContainer>
  );
};

export default PollTypeButton;
