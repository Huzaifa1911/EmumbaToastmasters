/* eslint-disable @typescript-eslint/no-non-null-assertion */
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import dayjs, {Dayjs} from 'dayjs';
import {useEffect, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import useConstant from 'use-constant';
import {AppState, AppStateStatus} from 'react-native';
import CodePush from 'react-native-code-push';
import BackgroundTimer from 'react-native-background-timer';

import {selectSpeechTimeLogs, updateLogs, useAppSelector} from 'Store';
import {getSpeechQualificationColor} from './helpers';
import {TSpeech} from 'Types';

export const useDebounce = (fn: (text: string) => void, wait = 500) =>
  useConstant(() => AwesomeDebouncePromise(fn, wait, {onlyResolvesLast: true}));

export const useClearSpeechTimeLogs = () => {
  const slots = useAppSelector(selectSpeechTimeLogs);
  const dispatch = useDispatch();

  useEffect(() => {
    let subscribed = true;

    if (subscribed) {
      const currentTime = dayjs();
      const validSlots = slots.filter(slot => {
        const slotCreationTime = dayjs(slot.createdAt);
        const isValid = slotCreationTime.diff(currentTime, 'day') > 0; // only include time slots for one day.
        if (isValid) return slot;
      });
      dispatch(updateLogs({logs: validSlots}));
    }

    return () => {
      subscribed = false;
    };
  }, []);
};

export const useTimer = ({speechType}: {speechType: TSpeech}) => {
  const [elapsedInMs, setElapsedInMs] = useState(0);
  const startTime = useRef<number | null>(null);
  const pausedTime = useRef<number | null>(null);

  function getSnapshot() {
    return Math.abs(elapsedInMs);
  }

  function play() {
    // First time playing, recording the start time
    if (!startTime.current) {
      startTime.current = Date.now();
    }

    BackgroundTimer.runBackgroundTimer(() => {
      if (!pausedTime.current) {
        setElapsedInMs(Date.now() - startTime.current!);
      } else {
        // If the timer is paused, we need to update the start time
        const elapsedSincePaused = Date.now() - pausedTime.current;
        startTime.current = startTime.current! + elapsedSincePaused;
        pausedTime.current = null;
      }
    }, 16);
  }

  function resetState() {
    setElapsedInMs(0);
    startTime.current = null;
    pausedTime.current = null;
  }

  function removeInterval() {
    BackgroundTimer.stopBackgroundTimer();
  }

  function pause() {
    removeInterval();
    if (!pausedTime.current && elapsedInMs > 0) {
      pausedTime.current = Date.now();
    }
    return getSnapshot();
  }

  function reset() {
    removeInterval();
    resetState();
  }

  const countInSeconds = Math.floor(getSnapshot() / 1000);

  return {
    tensOfMs: Math.floor(getSnapshot() / 10) % 100,
    lastDigit: countInSeconds % 10,
    tens: Math.floor(countInSeconds / 10) % 6,
    minutes: Math.floor(countInSeconds / 60),
    play,
    pause,
    reset,
    getSnapshot,
    color: getSpeechQualificationColor({
      elapsedTime: getSnapshot(),
      speechType,
    }),
  };
};

const UPDATE_CHECK_INITIAL_STATE: {
  lastBackgroundedTime: Dayjs | null;
  appState: AppStateStatus;
} = {
  lastBackgroundedTime: null,
  appState: AppState.currentState,
};
const MIN_BACKGROUND_DURATION_IN_MIN = 30;

export const useCheckForNewUpdates = () => {
  const [state, setState] = useState(UPDATE_CHECK_INITIAL_STATE);

  const handleAppStateChange = async (nextAppState: AppStateStatus) => {
    const {appState, lastBackgroundedTime} = state;

    // Try to run the CodePush sync whenever app comes to foreground
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      // Only run the sync if app has been in the background for a certain amount of time
      const elapsedTime = dayjs().diff(lastBackgroundedTime, 'minutes');

      if (elapsedTime > MIN_BACKGROUND_DURATION_IN_MIN) {
        // Please show the user some feedback while running this
        // This might take some time, especially if an update is available
        await CodePush.sync({
          installMode: CodePush.InstallMode.IMMEDIATE,
        });
      }
    }

    if (nextAppState.match(/inactive|background/)) {
      setState({appState: nextAppState, lastBackgroundedTime: dayjs()});
    }
  };

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );
    return () => {
      subscription.remove();
    };
  }, [state.appState, state.lastBackgroundedTime]);
};
