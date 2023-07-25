import AwesomeDebouncePromise from 'awesome-debounce-promise';
import dayjs from 'dayjs';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import useConstant from 'use-constant';

import {selectSpeechTimeLogs, updateLogs, useAppSelector} from 'Store';

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
