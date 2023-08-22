import React, {useMemo, useState} from 'react';

import {AppModal, FloatingActions, ScreenWrapper} from 'Components';

import SpeechTimeLogs from './Components/SpeechTimeLogs';
import ModalContent from './Components/ModalContent';
import {TSpeech} from 'Types';

const SpeechTimeLogsScreen = () => {
  const [openModal, setOpenModal] = useState(false);
  const [speechType, setSpeechType] = useState<TSpeech>('Prepared Speech');

  const onDismissModal = () => setOpenModal(false);

  const ACTIONS = useMemo(
    () => [
      {
        icon: 'microphone-variant',
        label: 'Table Topic',
        onPress: () => {
          setSpeechType('Table Topic');
          setOpenModal(true);
        },
      },
      {
        icon: 'speaker',
        label: 'Prepared Speech',
        onPress: () => {
          setSpeechType('Prepared Speech');
          setOpenModal(true);
        },
      },
      {
        icon: 'account-voice',
        label: 'Speech Evaluation',
        onPress: () => {
          setSpeechType('Speech Evaluation');
          setOpenModal(true);
        },
      },
    ],
    [],
  );

  return (
    <>
      <ScreenWrapper>
        <SpeechTimeLogs />

        <FloatingActions
          icon="plus"
          secondaryIcon="clock-plus-outline"
          actions={ACTIONS}
        />
      </ScreenWrapper>

      <AppModal visible={openModal} onDismiss={onDismissModal}>
        <ModalContent speechType={speechType} onDismissModal={onDismissModal} />
      </AppModal>
    </>
  );
};

export default SpeechTimeLogsScreen;
