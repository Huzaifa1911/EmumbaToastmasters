import React, {useState} from 'react';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {pathOr} from 'ramda';
import {useDispatch} from 'react-redux';

import {AppButton, AppText, ScreenWrapper, Spacer} from 'Components';
import {TDrawerParamList, TSpeechTimeLog} from 'Types';
import {
  ButtonWrapper,
  Container,
  CounterWrapper,
  StopWatchCounter,
} from './styles';
import {getSpeechDuration, useTimer} from 'Utils';
import {JustifyCenter, RowBetween} from 'Styles';
import {lockSpeechTime} from 'Store';
import {NavigationService} from 'Services';
import dayjs from 'dayjs';

const TimerScreen = ({route}: DrawerScreenProps<TDrawerParamList>) => {
  const slot = pathOr<TSpeechTimeLog | null>(null, ['params', 'slot'], route);
  const speaker = slot?.speaker;
  const speech_type = slot?.speech_type ?? 'Prepared Speech';

  const [isRunning, setIsRunning] = useState(false);
  const dispatch = useDispatch();

  const {
    color,
    getSnapshot,
    lastDigit,
    minutes,
    pause,
    play,
    reset,
    tens,
    tensOfMs,
  } = useTimer({speechType: speech_type});

  const onPressStart = () => {
    if (isRunning) {
      pause();
      setIsRunning(false);
    } else {
      play();
      setIsRunning(true);
    }
  };

  const resetTimer = () => {
    reset();
    setIsRunning(false);
  };

  const startButtonTitle = isRunning ? 'Stop' : 'Start';

  const duration = getSpeechDuration(speech_type);

  const onLockButtonPress = () => {
    const {minutes: finalMinutes, seconds: finalSeconds} = getSnapshot();
    const endTime = dayjs()
      .set('minutes', finalMinutes)
      .set('seconds', finalSeconds)
      .valueOf();
    dispatch(lockSpeechTime({endTime, id: slot?.id ?? 0}));
    NavigationService.goBack();
    resetTimer();
  };

  return (
    <ScreenWrapper>
      <Container color={color}>
        <JustifyCenter>
          <AppText variant="bold" size={23} textAlign="center">
            {speaker}
          </AppText>
          <AppText
            color="outline"
            textAlign="center">{`${speech_type} ${duration}`}</AppText>
        </JustifyCenter>

        <CounterWrapper>
          <StopWatchCounter
            tens={tens}
            lastDigit={lastDigit}
            minutes={minutes}
            tensOfMs={tensOfMs}
            trailingZeros={2}
            leadingZeros={2}
          />
        </CounterWrapper>

        <ButtonWrapper>
          <RowBetween>
            <AppButton mode="outlined" onPress={resetTimer}>
              Reset
            </AppButton>
            <AppButton mode="outlined" onPress={onPressStart}>
              {startButtonTitle}
            </AppButton>
          </RowBetween>

          <Spacer top={15} />
          <AppButton
            mode="contained"
            onPress={onLockButtonPress}
            disabled={!isRunning}>
            Lock
          </AppButton>
        </ButtonWrapper>
      </Container>
    </ScreenWrapper>
  );
};

export default TimerScreen;
