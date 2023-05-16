import React from 'react';

import {AppCard, AppText, Spacer} from 'Components';
import {useAppTheme} from 'Assets';
import {StyledBarChart} from '../styles';

const PerformanceChart = () => {
  const {colors} = useAppTheme();

  const barData = [
    {value: 250, label: 'Huzaifa'},
    {value: 500, label: 'Omar', frontColor: colors.primary},
    {value: 745, label: 'Ali', frontColor: colors.primary},
    {value: 320, label: 'Rauf'},
    {value: 600, label: 'Usama', frontColor: colors.primary},
    {value: 256, label: 'Hamza'},
  ];

  return (
    <>
      <Spacer top={30} bottom={10}>
        <AppText size={18} variant="bold">
          Performance Chart
        </AppText>
      </Spacer>

      <AppCard height={250} mode="contained">
        <StyledBarChart
          isAnimated
          animationDuration={500}
          autoShiftLabels
          width={300}
          height={170}
          barWidth={35}
          noOfSections={3}
          barBorderRadius={4}
          frontColor={colors.outline}
          data={barData}
          yAxisThickness={0}
          showYAxisIndices
          xAxisThickness={0}
          yAxisOffset={0}
        />
      </AppCard>
    </>
  );
};

export default PerformanceChart;
