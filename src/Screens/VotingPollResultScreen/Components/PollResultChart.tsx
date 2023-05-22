import React from 'react';
import {PieChart} from 'react-native-gifted-charts';

import {ChartContainer, LegendRow} from '../styles';
import {AppCard, AppText, Spacer} from 'Components';
import {useAppTheme} from 'Assets';
import ChartLegend from './ChartLegend';

const PollResultChart = () => {
  const {colors} = useAppTheme();

  const pieData = [
    {value: 55, color: colors.primary, text: '20', label: 'Huzaifa'},
    {value: 40, color: colors.primaryContainer, text: '30', label: 'Rafu'},
    {value: 100, color: colors.onPrimaryContainer, text: '26', label: 'Shifu'},
    {value: 100, color: colors.inversePrimary, text: '26', label: 'Mizuuuuu'},
    {value: 100, color: colors.secondary, text: '26', label: 'ALi'},
    {value: 100, color: colors.secondaryContainer, text: '26', label: 'ALi'},
    {value: 100, color: colors.onSecondaryContainer, text: '26', label: 'ALi'},
  ];

  return (
    <>
      <Spacer bottom={10}>
        <AppText size={18} variant="bold">
          Poll Result
        </AppText>
      </Spacer>
      <AppCard mode="contained">
        <ChartContainer>
          <Spacer right={-23} bottom={-23}>
            <PieChart
              showText
              textColor={colors.white}
              radius={120}
              labelsPosition="outward"
              textSize={14}
              fontWeight="600"
              fontStyle="italic"
              data={pieData}
            />
          </Spacer>
        </ChartContainer>

        <LegendRow>
          {pieData.map((dataPoint, index) => (
            <ChartLegend
              key={dataPoint.label + index.toString()}
              color={dataPoint.color}
              label={dataPoint.label}
            />
          ))}
        </LegendRow>
      </AppCard>
    </>
  );
};

export default PollResultChart;
