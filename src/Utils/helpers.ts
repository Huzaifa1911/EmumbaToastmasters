import α from 'color-alpha';
import {anyPass, isEmpty, isNil} from 'ramda';

export const getAlphaColor = (color: string, opacity: number) => {
  return α(color, opacity);
};

export const isEmptyOrNill = anyPass([isEmpty, isNil]);
