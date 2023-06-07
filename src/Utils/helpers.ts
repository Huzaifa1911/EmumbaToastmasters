import {TJWTDecode} from 'Types';
import α from 'color-alpha';
import dayjs from 'dayjs';
import numbro from 'numbro';
import {anyPass, isEmpty, isNil} from 'ramda';
import relativeTime from 'dayjs/plugin/relativeTime';
import Toast from 'react-native-toast-message';
import {format as prettyFormat} from 'pretty-format';
import jwtDecode from 'jwt-decode';
import {KeychainStorageService} from 'Services';

dayjs.extend(relativeTime);

export const getAlphaColor = (color: string, opacity: number) => {
  return α(color, opacity);
};

export const isEmptyOrNill = anyPass([isEmpty, isNil]);

export const getVotingPollStatus = (isActive: boolean): {label: string; color: AppTheme.TColors} => {
  if (isActive) {
    return {label: 'Active', color: 'accentGreen'};
  } else {
    return {label: 'Closed', color: 'onSurfaceDisabled'};
  }
};

export const formateTimeStamp = (timestamp: number, format?: string) => {
  return dayjs(timestamp).format(format || 'DD/MM/YYYY');
};

export const formateDateString = (dateString?: string | Date, format?: string) => {
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

export const showToast = (message: string, title?: string, type?: 'success' | 'error') => {
  if (message) {
    Toast.show({
      type,
      text1: title,
      text2: message,
      position: 'top',
    });
  }
};

export function Log(...args: Array<unknown>) {
  if (__DEV__)
    // eslint-disable-next-line no-console
    console.log.apply(
      null,
      args.map(arg => prettyFormat(arg)),
    );
}

export const decodeJwtToken = async () => {
  const token = await KeychainStorageService.getToken();
  if (token) {
    return jwtDecode(token) as TJWTDecode;
  } else {
    return null;
  }
};

export const truncateString = (text: string, length = 15): string => {
  if (text?.length > 0) {
    return text.slice(0, length) + (text.length > length ? '...' : '');
  }
  return text;
};
