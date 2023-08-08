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
        {POLL_TYPES.map((item, index) => {
          const isSelected = pollType?.id === item.id;
          return (
            <Spacer right={index % 2 === 0 ? 15 : 0} key={index} top={20}>
              <PollTypeButton
                title={item.name}
                isSelected={isSelected}
                onPress={() => setPollType(item)}
              />
            </Spacer>
          );
        })}
      </ListContent>

      <Spacer top={30}>
        <NextButton
          mode="contained"
          disabled={isEmptyOrNill(pollType)}
          onPress={() => onProceedNext(pollType)}>
          Next
        </NextButton>
      </Spacer>
    </Container>
  );
};

export default PollTypeSheet;
