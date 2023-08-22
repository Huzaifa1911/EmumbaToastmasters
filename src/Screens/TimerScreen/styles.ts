import {FONTS} from 'Assets';
import {View} from 'react-native';
import styled from 'styled-components/native';

import StopwatchText from './Components/StopwatchText';

export const Container = styled(View)(
  ({color, theme}: {color: AppTheme.TColors} & AppTheme.ThemeType) => ({
    flex: 1,
    paddingTop: 30,
    paddingBottom: 80,
    backgroundColor: theme?.colors[color] as string,
  }),
);

export const CounterWrapper = styled(View)(() => ({
  flex: 0.5,
  alignItems: 'center',
  justifyContent: 'flex-end',
  paddingBottom: 50,
}));

export const ButtonWrapper = styled(View)(() => ({
  flex: 1,
  justifyContent: 'flex-end',
  alignSelf: 'center',
  width: '55%',
}));

export const Row = styled(View)({
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const StopWatchCounter = styled(StopwatchText).attrs(
  ({theme}: AppTheme.ThemeType) => ({
    containerStyle: {
      paddingVertical: 16,
      paddingHorizontal: 20,
      borderWidth: 1,
      borderColor: theme?.colors.primary,
      borderRadius: 16,
    },
    digitStyle: {width: 23},
    separatorStyle: {fontFamily: FONTS.Medium},
    textCharStyle: {
      fontFamily: FONTS.Bold,
      color: theme?.colors.primary,
      fontSize: 25,
    },
  }),
)({});
