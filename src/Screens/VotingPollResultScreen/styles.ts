import {View} from 'react-native';
import styled from 'styled-components/native';

export const Container = styled(View)(() => ({
  flex: 1,
  paddingTop: 30,
  paddingHorizontal: 16,
  paddingBottom: 50,
}));

export const ChartContainer = styled(View)(() => ({
  alignItems: 'center',
  justifyContent: 'center',
  alignSelf: 'center',
  marginVertical: 15,
}));

export const LegendBox = styled(View)(({color}: {color: string}) => ({
  width: 12,
  height: 12,
  borderRadius: 3,
  backgroundColor: color,
  marginRight: 3,
}));

export const LegendRow = styled(View)(() => ({
  flexDirection: 'row' as const,
  flexWrap: 'wrap' as const,
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: 12,
  gap: 10,
  marginHorizontal: 20,
  alignSelf: 'center',
}));
