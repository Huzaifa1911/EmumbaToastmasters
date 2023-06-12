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
  const [pollType, setPollType] = useState<TPollType>();

  return (
    <Container>
      <ListContent>
        {POLL_TYPES.map((type, index) => {
          const isSelected = pollType?.id === type.id;

          return (
            <PollTypeButton
              key={type.id + index.toString()}
              title={type.name}
              isSelected={isSelected}
              onPress={() => setPollType(type)}
            />
          );
        })}
      </ListContent>

      <Spacer top={30} />
      <NextButton
        mode="contained"
        disabled={isEmptyOrNill(pollType)}
        onPress={() => onProceedNext(pollType)}>
        Next
      </NextButton>
    </Container>
  );
};

export default PollTypeSheet;
