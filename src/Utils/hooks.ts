/* eslint-disable @typescript-eslint/no-non-null-assertion */
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import dayjs from 'dayjs';
import {useEffect, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import useConstant from 'use-constant';

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
  const intervalId = useRef<NodeJS.Timer | null>(null);

  function getSnapshot() {
    return Math.abs(elapsedInMs);
  }

  function play() {
    // Already playing, returning early
    if (intervalId.current) {
      return;
    }

    // First time playing, recording the start time
    if (!startTime.current) {
      startTime.current = Date.now();
    }

    intervalId.current = setInterval(() => {
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
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
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

export default useTimer;
