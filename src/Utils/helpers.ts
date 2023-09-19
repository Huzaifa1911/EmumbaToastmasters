import α from 'color-alpha';
import dayjs from 'dayjs';
import numbro from 'numbro';
import {anyPass, isEmpty, isNil, propOr, reduce} from 'ramda';
import relativeTime from 'dayjs/plugin/relativeTime';
import Toast from 'react-native-toast-message';
import {format as prettyFormat} from 'pretty-format';
import jwtDecode from 'jwt-decode';

import {
  TFormattedVotingPoll,
  TJWTDecode,
  TSpeech,
  TSpeechTimeLog,
  TSpeechTimeLogSection,
  TStandardObject,
  TUser,
  TVote,
} from 'Types';

import {KeychainStorageService} from 'Services';

dayjs.extend(relativeTime);

export const getAlphaColor = (color: string, opacity: number) => {
  return α(color, opacity);
};

export const isEmptyOrNill = anyPass([isEmpty, isNil]);
export const firstOrNull = propOr(null, 0 as unknown as string);

export const getVotingPollStatus = (
  isActive: boolean,
): {label: string; color: AppTheme.TColors} => {
  if (isActive) {
    return {label: 'Active', color: 'accentGreen'};
  } else {
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

export const showToast = (
  message: string,
  title?: string,
  type?: 'success' | 'error',
) => {
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

const getMaxValueKey = (obj: Record<number, number>): number | null => {
  const values = Object.values(obj);
  const hasDuplicates = values.length !== new Set(values).size; // If Two candidate have same votes, means its a tie.

  if (hasDuplicates) {
    return null;
  } else {
    return Object.keys(obj)
      .map(Number)
      .reduce((maxKey: number | null, key: number) => {
        if (maxKey === null || obj[key] > obj[maxKey]) {
          return key;
        }
        return maxKey;
      }, null);
  }
};

export const findCandidateWithMostVotes = (votes: TVote[]) => {
  const countByCandidate = reduce(
    (acc: Record<number, number>, vote: TVote) => {
      const {candidate} = vote;
      acc[candidate] = (acc[candidate] || 0) + 1;
      return acc;
    },
    {},
    votes,
  );

  return getMaxValueKey(countByCandidate);
};

export const getSpeechDuration = (type: TSpeech) => {
  switch (type) {
    case 'Prepared Speech':
      return '(5-7 min)';
    case 'Table Topic':
      return '(1-2 min)';
    case 'Speech Evaluation':
      return '(2-3 min)';
    default:
      return '(5-7 min)';
  }
};

const getPreparedSpeechQualificationColor = (
  minutes: number,
  seconds: number,
): AppTheme.TColors => {
  if (minutes === 0 && seconds === 0) {
    return 'background';
  } else if (minutes >= 5 && minutes < 7) {
    return 'accentGreen';
  } else if (minutes >= 6 && minutes < 7) {
    return 'yellow';
  } else if (minutes >= 7) {
    return 'error';
  } else {
    return 'background';
  }
};

const getTableTopicSpeechQualificationColor = (
  minutes: number,
  seconds: number,
): AppTheme.TColors => {
  if (minutes === 0 && seconds === 0) {
    return 'background';
  } else if (minutes >= 1 && seconds < 30 && minutes < 2) {
    return 'accentGreen';
  } else if (minutes >= 1 && minutes < 2 && seconds >= 30) {
    return 'yellow';
  } else if (minutes >= 2) {
    return 'error';
  } else {
    return 'background';
  }
};
const getSpeechEvluationQualificaitonColor = (
  minutes: number,
  seconds: number,
): AppTheme.TColors => {
  if (minutes === 0 && seconds === 0) {
    return 'background';
  } else if (minutes >= 2 && seconds < 30 && minutes < 3) {
    return 'accentGreen';
  } else if (minutes >= 2 && minutes < 3 && seconds >= 30) {
    return 'yellow';
  } else if (minutes >= 3) {
    return 'error';
  } else {
    return 'background';
  }
};

export const getSpeechQualificationColor = ({
  elapsedTime,
  speechType,
}: {
  elapsedTime: number;
  speechType: TSpeech;
}): AppTheme.TColors => {
  const minutes = dayjs(elapsedTime).get('minutes');
  const seconds = dayjs(elapsedTime).get('seconds');

  switch (speechType) {
    case 'Prepared Speech':
      return getPreparedSpeechQualificationColor(minutes, seconds);
    case 'Table Topic':
      return getTableTopicSpeechQualificationColor(minutes, seconds);
    case 'Speech Evaluation':
      return getSpeechEvluationQualificaitonColor(minutes, seconds);
    default:
      return 'background';
  }
};

export const getSpeechQualificationResult = ({
  elapsedTime,
  speechType,
}: {
  elapsedTime: number;
  speechType: TSpeech;
}): {color: AppTheme.TColors; label: string} => {
  switch (speechType) {
    case 'Prepared Speech':
      if (elapsedTime <= 450000 && elapsedTime >= 300000)
        return {color: 'accentGreen', label: 'Qualified'};
      else return {color: 'onSurfaceDisabled', label: 'Disqualified'};
    case 'Table Topic':
      if (elapsedTime <= 150000 && elapsedTime >= 60000)
        return {color: 'accentGreen', label: 'Qualified'};
      else return {color: 'onSurfaceDisabled', label: 'Disqualified'};
    case 'Speech Evaluation':
      if (elapsedTime <= 210000 && elapsedTime >= 120000)
        return {color: 'accentGreen', label: 'Qualified'};
      else return {color: 'onSurfaceDisabled', label: 'Disqualified'};
    default:
      return {color: 'onSurfaceDisabled', label: 'Disqualified'};
  }
};

export const groupSpeechTimeLogsBySpeechType = (
  slots: TSpeechTimeLog[],
): TSpeechTimeLogSection[] => {
  const groupedData: {[key: string]: {title: TSpeech; data: TSpeechTimeLog[]}} =
    {};

  slots.forEach(slot => {
    if (!groupedData[slot.speech_type]) {
      groupedData[slot.speech_type] = {
        title: slot.speech_type,
        data: [],
      };
    }
    // Only include logs with the same speech_type
    if (slot.speech_type === groupedData[slot.speech_type].title) {
      groupedData[slot.speech_type].data.push(slot);
    }
  });
  return Object.values(groupedData);
};

export const handleToastMessages = (error: Record<string, any>) => {
  const value = Object.values(error);
  if (Array.isArray(value)) {
    const firstMessage: string = firstOrNull(value) ?? 'Something went wrong!';
    showToast(firstMessage, 'Error', 'error');
  } else if (typeof value === 'string') {
    showToast(value, 'Error', 'error');
  } else {
    showToast('Something went wrong!', 'Error', 'error');
  }
};

export const removeOwnerFromVotingPollCandidates = (
  users: TUser[],
  poll: TFormattedVotingPoll,
): TStandardObject[] => {
  const candidates = users
    .filter(user => {
      // if owner present in candidates, then do not filter the users, otherwise remove the owner from users and return it.
      if (poll.candidates.includes(poll.owner)) {
        return user;
      } else {
        if (user.id !== poll.owner) {
          return user;
        }
      }
    }) // excluding the vote owner/counter from candidate list
    .map(candidate => {
      return {
        label: `${propOr('', 'first_name', candidate)} ${propOr(
          '',
          'last_name',
          candidate,
        )}` as string,
        value: candidate.id,
      };
    });

  return candidates;
};
