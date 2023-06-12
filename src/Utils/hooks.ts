import AwesomeDebouncePromise from 'awesome-debounce-promise';
import useConstant from 'use-constant';

export const useDebounce = (fn: (text: string) => void, wait = 500) =>
  useConstant(() => AwesomeDebouncePromise(fn, wait, {onlyResolvesLast: true}));
