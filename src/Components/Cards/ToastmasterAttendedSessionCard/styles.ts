import {View} from 'react-native';
import styled from 'styled-components/native';

type TCalendarIcon = {
  size: number;
} & AppTheme.ThemeType;

export const Container = styled(View)(() => ({
  flexDirection: 'row' as const,
  alignItems: 'flex-start',
  justifyContent: 'space-between',
}));

export const TextContent = styled(View)(() => ({
  width: '83%',
  // backgroundColor: 'red',
}));

export const CalendarIconContainer = styled(View)(({size}: TCalendarIcon) => ({
  height: size,
  width: size,
  alignItems: 'center',
  //   justifyContent: 'center',
}));

export const MonthWrapper = styled(View)(({size, theme}: TCalendarIcon) => ({
  justifyContent: 'center',
  alignItems: 'center',
  height: 17,
  width: size,
  backgroundColor: theme?.colors.primary,
  borderTopLeftRadius: 5,
  borderTopRightRadius: 5,
}));

export const DateWrapper = styled(View)(({size, theme}: TCalendarIcon) => ({
  justifyContent: 'center',
  alignItems: 'center',
  height: 35,
  width: size,
  backgroundColor: theme?.colors.background,
  borderBottomLeftRadius: 5,
  borderBottomRightRadius: 5,
}));
