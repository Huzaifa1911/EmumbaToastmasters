import React, {useEffect, useState} from 'react';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {pathOr} from 'ramda';
import {useDispatch} from 'react-redux';
import dayjs from 'dayjs';

import {AppButton, AppText, ScreenWrapper, Spacer} from 'Components';
import {TDrawerParamList, TSpeechTimeLog} from 'Types';
import {ButtonWrapper, Container, CounterWrapper} from './styles';
import {getSpeechDuration, getSpeechQualificationColor} from 'Utils';
import {JustifyCenter, RowBetween} from 'Styles';
import {lockSpeechTime} from 'Store';
import {NavigationService} from 'Services';

const TimerScreen = ({route}: DrawerScreenProps<TDrawerParamList>) => {
  const slot = pathOr<TSpeechTimeLog | null>(null, ['params', 'slot'], route);

  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    let intervalId: NodeJS.Timer;
    if (isRunning) {
      intervalId = setInterval(() => setTimer(timer + 5), 10);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [timer, isRunning]);

  const speaker = slot?.speaker;
  const speech_type = slot?.speech_type ?? 'Prepared Speech';
  const minutes = Math.floor((timer % 360000) / 6000);
  const seconds = Math.floor((timer % 6000) / 100);
  const milliseconds = timer % 100;
  const startButtonTitle = isRunning ? 'Stop' : 'Start';

  const duration = getSpeechDuration(speech_type);
  const color = getSpeechQualificationColor({
    minutes,
    seconds,
    speechType: speech_type,
  });

  const reset = () => {
    setIsRunning(false);
    setTimer(0);
  };

  const onPressStart = () => {
    setIsRunning(prev => !prev);
  };

  const onLockButtonPress = () => {
    setIsRunning(false);
    const endTime = dayjs()
      .set('minutes', minutes)
      .set('seconds', seconds)
      .set('milliseconds', milliseconds)
      .valueOf();

    dispatch(lockSpeechTime({endTime, id: slot?.id ?? 0}));
    setTimer(0);
    NavigationService.goBack();
  };

  const disableLockButton = !isRunning && milliseconds <= 0;

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
          <AppText variant="medium" color="primary" size={40}>
            {`${minutes.toString().padStart(2, '0')}:${seconds
              .toString()
              .padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`}
          </AppText>
        </CounterWrapper>

        <ButtonWrapper>
          <RowBetween>
            <AppButton mode="outlined" onPress={reset}>
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
            disabled={disableLockButton}>
            Lock
          </AppButton>
        </ButtonWrapper>
      </Container>
    </ScreenWrapper>
  );
};

export default TimerScreen;
