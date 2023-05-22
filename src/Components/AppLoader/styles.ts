import {View} from 'react-native';
import styled from 'styled-components/native';

export const ScreenContainer = styled(View)(({theme}: AppTheme.ThemeType) => ({
  height: '100%',
  width: '100%',
  backgroundColor: theme?.colors.backdrop,
  position: 'absolute' as const,
  zIndex: 1,
  justifyContent: 'center',
  alignItems: 'center',
}));

export const Content = styled(View)(({theme}: AppTheme.ThemeType) => ({
  borderRadius: 16,
  backgroundColor: theme?.colors.onBackground,
  justifyContent: 'center',
  alignItems: 'center',
  height: 60,
  width: 60,
}));
