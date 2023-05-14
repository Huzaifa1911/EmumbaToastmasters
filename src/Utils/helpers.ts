import {TPollStatus} from 'Types';
import α from 'color-alpha';
import dayjs from 'dayjs';
import numbro from 'numbro';
import {anyPass, isEmpty, isNil} from 'ramda';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const getAlphaColor = (color: string, opacity: number) => {
  return α(color, opacity);
};

export const isEmptyOrNill = anyPass([isEmpty, isNil]);

export const getVotingPollStatus = (
  status: TPollStatus,
): {label: string; color: AppTheme.TColors} => {
  switch (status) {
    case 'active':
      return {label: 'Active', color: 'accentGreen'};
    case 'disabled':
      return {label: 'Closed', color: 'onSurfaceDisabled'};
  }
};

export const formateTimeStamp = (timestamp: number, format?: string) => {
  return dayjs(timestamp).format(format || 'DD/MM/YYYY');
};

export const formateDateString = (
  dateString?: string | Date,
  format?: string,
) => {
  const formatTo = format ? format : 'YYYY-MM-DD';
  if (dateString) {
    return dayjs(dateString).format(formatTo);
  } else {
    return dayjs().format(formatTo);
  }
};

export const formatNumber = (number: number) => {
  return numbro(number).format({
    average: true,
    mantissa: 0,
    spaceSeparated: true,
    thousandSeparated: true,
  });
};

export const getTimeDifference = (timestamp: number) => {
  return dayjs(timestamp).fromNow();
};
