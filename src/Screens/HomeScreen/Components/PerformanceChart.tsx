import React from 'react';

import {AppActivityIndicator, AppCard, AppText, Spacer} from 'Components';
import {useAppTheme} from 'Assets';
import {ChartLoader, StyledBarChart} from '../styles';
import {useGetGamificationPoints} from 'Services';

const PerformanceChart = () => {
  const {colors} = useAppTheme();

  const {data = [], isLoading} = useGetGamificationPoints({
    showLoading: false,
  });

  return (
    <>
      <Spacer top={30} bottom={10}>
        <AppText size={18} variant="bold">
          Performance Chart
        </AppText>
      </Spacer>

      <AppCard height={250} mode="contained">
        <ChartLoader>
          <AppActivityIndicator isLoading={isLoading} />
        </ChartLoader>
        <StyledBarChart
          isAnimated
          animationDuration={500}
          autoShiftLabels
          width={300}
          height={170}
          barWidth={35}
          noOfSections={5}
          barBorderRadius={5}
          frontColor={colors.primary}
          data={data}
          yAxisThickness={0}
          disablePress
          showYAxisIndices
          xAxisThickness={0}
          yAxisOffset={0}
        />
      </AppCard>
    </>
  );
};

export default PerformanceChart;
