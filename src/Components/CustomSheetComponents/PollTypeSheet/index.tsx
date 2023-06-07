import React, {useState} from 'react';

import {Container, ListContent, NextButton} from './styles';
import PollTypeButton from './Components/PollTypeButton';
import {Spacer} from 'Components';
import {POLL_TYPES, isEmptyOrNill} from 'Utils';
import {TPollType} from 'Types';

interface IPollTypeSheetProps {
  onProceedNext: (type?: TPollType) => void;
}

const PollTypeSheet = ({onProceedNext}: IPollTypeSheetProps) => {
  const [selectedPollType, setSelectedPollType] = useState<TPollType>();

  return (
    <Container>
      <ListContent>
        {POLL_TYPES.map((type, index) => {
          const isSelected = selectedPollType?.title === type.title;

          return <PollTypeButton key={type.title + index.toString()} title={type.title} isSelected={isSelected} onPress={() => setSelectedPollType(type)} />;
        })}
      </ListContent>

      <Spacer top={30} />
      <NextButton mode="contained" disabled={isEmptyOrNill(selectedPollType)} onPress={() => onProceedNext(selectedPollType)}>
        Next
      </NextButton>
    </Container>
  );
};

export default PollTypeSheet;
