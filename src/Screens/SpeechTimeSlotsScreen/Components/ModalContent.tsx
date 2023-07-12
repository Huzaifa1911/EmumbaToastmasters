import React, {useState} from 'react';
import {IconButton} from 'react-native-paper';
import dayjs from 'dayjs';

import {ButtonWrapper, ModalWrapper} from '../styles';
import {AppButton, AppInputField, AppText, Spacer} from 'Components';
import {RowBetween} from 'Styles';
import {TSpeech} from 'Types';
import {
  addSpeechTimeSlot,
  selectSpeechTimeSlots,
  useAppDispatch,
  useAppSelector,
} from 'Store';

interface IModalContentProps {
  onDismissModal: () => void;

  speechType: TSpeech;
}

const ModalContent = (props: IModalContentProps) => {
  const {onDismissModal, speechType} = props;

  const [name, setName] = useState('');
  const dispatch = useAppDispatch();
  const slots = useAppSelector(selectSpeechTimeSlots);

  const onSubmit = () => {
    dispatch(
      addSpeechTimeSlot({
        id: slots.length + 1,
        speaker: name,
        speech_type: speechType,
        endTime: 0, //* 0 shows speech not started yet.
        createdAt: dayjs().valueOf(),
      }),
    );
    onDismissModal();
  };

  return (
    <ModalWrapper>
      <RowBetween>
        <AppText variant="bold" size={20}>
          Add Member
        </AppText>
        <IconButton icon="close" onPress={onDismissModal} />
      </RowBetween>

      <AppText size={14} variant="medium" color="outline">
        For {speechType}
      </AppText>

      <Spacer top={20} />
      <AppInputField
        label="Name"
        placeholder="Enter name"
        value={name}
        onChangeText={setName}
      />

      <ButtonWrapper>
        <AppButton
          mode="contained"
          onPress={onSubmit}
          disabled={name.length === 0}>
          Create Slot
        </AppButton>
      </ButtonWrapper>
    </ModalWrapper>
  );
};

export default ModalContent;
