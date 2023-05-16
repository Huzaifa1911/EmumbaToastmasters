import React from 'react';
import {PieChart} from 'react-native-gifted-charts';

import {ChartContainer, LegendRow} from '../styles';
import {AppCard, AppText, Spacer} from 'Components';
import {useAppTheme} from 'Assets';
import ChartLegend from './ChartLegend';

const pieData = [
  {value: 55, color: '#177AD5', text: '20', label: 'Huzaifa'},
  {value: 40, color: '#79D2DE', text: '30', label: 'Rafu'},
  {value: 100, color: '#ED6665', text: '26', label: 'Shifu'},
  {value: 100, color: '#74c967', text: '26', label: 'Mizuuuuu'},
];

const PollResultChart = () => {
  const {colors} = useAppTheme();

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
