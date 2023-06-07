import React, {useState} from 'react';
import {IconButton} from 'react-native-paper';

import {CreatePollButton, ScrollContent} from './styles';
import {Flex, Row, RowBetween} from 'Styles';
import {AppInputField, AppText, Spacer} from 'Components';

interface ISelectContestentsSheetProps {
  onActivatePolling: () => void;
}

const SelectContestentsSheet = ({onActivatePolling}: ISelectContestentsSheetProps) => {
  const [speakerCount, setSpeakerCount] = useState(3);

  const onAddSpeaker = () => setSpeakerCount(prev => prev + 1);
  const onRemoveSpeaker = () => setSpeakerCount(prev => prev - 1);

  return (
    <Flex>
      <ScrollContent>
        <RowBetween>
          <AppText size={18} variant="medium">
            Contestents
          </AppText>
          <Row>
            <IconButton size={18} icon="close" onPress={onRemoveSpeaker} mode="outlined" disabled={speakerCount === 1} />
            <IconButton icon="plus" mode="outlined" onPress={onAddSpeaker} size={18} disabled={speakerCount === 10} />
          </Row>
        </RowBetween>

        <Spacer top={20} />

        {Array(speakerCount)
          .fill('Contestent')
          .map((label, index) => {
            return (
              <Spacer key={index.toString() + label} top={index !== 0 ? 20 : 0}>
                <AppInputField label={`${label} ${index + 1}`} mode="flat" placeholder="Enter Name" />
              </Spacer>
            );
          })}
      </ScrollContent>

      <CreatePollButton onPress={onActivatePolling}>Activate Polling</CreatePollButton>
    </Flex>
  );
};

export default SelectContestentsSheet;
