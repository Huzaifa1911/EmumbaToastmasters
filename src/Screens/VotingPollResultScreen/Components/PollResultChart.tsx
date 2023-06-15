import React from 'react';
import {PieChart} from 'react-native-gifted-charts';
import {Else, If, Then, When} from 'react-if';

import {ChartContainer, LegendRow} from '../styles';
import {AppCard, AppText, BlankState, Spacer} from 'Components';
import {useAppTheme} from 'Assets';
import ChartLegend from './ChartLegend';
import {TClosedPollCandidate, TPieChartDataPoint} from 'Types';
import {PIE_CHART_COLORS} from 'Utils';
import {CardSkeleton} from 'Skeletons';

const transFormData = (data: TClosedPollCandidate[]): TPieChartDataPoint[] => {
  return data.map((item, index) => {
    return {
      label: item.label,
      value: item.votes,
      text: item.votes.toString(),
      color: PIE_CHART_COLORS[index],
    };
  });
};
const PollResultChart = ({
  data = [],
  isLoading = false,
  winner,
}: {
  data: TClosedPollCandidate[];
  isLoading?: boolean;
  winner?: string;
}) => {
  const {colors} = useAppTheme();
  const pieData = transFormData(data);
  const hasVotes = pieData.length !== 0;

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
          <If condition={!hasVotes}>
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

          {/* Display Tie Label when there is no winner */}
          <When condition={!winner && hasVotes}>
            <Spacer top={30} bottom={40}>
              <BlankState
                showIcon={false}
                label="It's a Tie"
                infoText="Both competitors reached an equal score, resulting in a draw"
              />
            </Spacer>
          </When>
        </Else>
      </If>
    </>
  );
};

export default PollResultChart;
