import {View} from 'react-native';
import {BarChart} from 'react-native-gifted-charts';
import styled from 'styled-components/native';

export const Container = styled(View)({
  paddingHorizontal: 16,
  paddingTop: 30,
});

export const StyledBarChart = styled(BarChart).attrs(
  ({theme}: AppTheme.ThemeType) => ({
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
  }),
)({});
