import {View} from 'react-native';
import {BarChart} from 'react-native-gifted-charts';
import styled from 'styled-components/native';

export const Container = styled(View)({
  paddingHorizontal: 16,
  paddingVertical: 30,
});

export const ChartLoader = styled(View)({
  height: '120%',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute' as const,
  left: 0,
  right: 0,
  borderRadius: 11,
});

export const StyledBarChart = styled(BarChart).attrs(({theme}: AppTheme.ThemeType) => ({
  yAxisTextStyle: {
    fontSize: 10,
    fontWeight: '600',
    color: theme?.colors.outline,
  },
  xAxisLabelTextStyle: {
    fontSize: 10,
    fontWeight: '600',
    color: theme?.colors.outline,
    alignSelf: 'center',
  },
  yAxisLabelContainerStyle: {width: 25},
}))({});
