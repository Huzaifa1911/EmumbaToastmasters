import React from 'react';
import {PieChart} from 'react-native-gifted-charts';

import {ChartContainer, LegendRow} from '../styles';
import {AppCard, AppText, BlankState, Spacer} from 'Components';
import {TAppColors, useAppTheme} from 'Assets';
import ChartLegend from './ChartLegend';
import {TClosedPollCandidate, TPieChartDataPoint} from 'Types';
import {getRandomColorForPieChart} from 'Utils';
import {Else, If, Then} from 'react-if';
import {CardSkeleton} from 'Skeletons';

const transFormData = (
  data: TClosedPollCandidate[],
  colors: TAppColors,
): TPieChartDataPoint[] => {
  return data.map(item => {
    return {
      label: item.label,
      value: item.votes,
      text: item.votes.toString(),
      color: getRandomColorForPieChart(colors),
    };
  });
};
const PollResultChart = ({
  data = [],
  isLoading = false,
}: {
  data: TClosedPollCandidate[];
  isLoading?: boolean;
}) => {
  const {colors} = useAppTheme();

  const pieData = transFormData(data, colors);

  return (
    <>
      <Spacer bottom={10}>
        <AppText size={18} variant="bold">
          Poll Result
        </AppText>
      </Spacer>

      <If condition={isLoading}>
        <Then>
          <CardSkeleton height={308} />
        </Then>

        <Else>
          <If condition={pieData.length === 0}>
            {/* Blank State */}
            <Then>
              <BlankState label="No Vote Casted Yet" />
            </Then>

            {/* Pie Chart */}
            <Else>
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
            </Else>
          </If>
        </Else>
      </If>
    </>
  );
};

export default PollResultChart;
