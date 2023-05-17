import {View} from 'react-native';
import {Divider} from 'react-native-paper';
import styled from 'styled-components/native';

export const Container = styled(View)(() => ({
  flexDirection: 'row' as const,
  alignItems: 'center',
}));

export const StyledDivider = styled(Divider)({height: 3});

export const Content = styled(View)(({theme}: AppTheme.ThemeType) => ({
  flex: 1,
  flexDirection: 'row' as const,
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingRight: 16,
  borderRadius: 20,
  marginLeft: 35,
  backgroundColor: theme?.colors.surfaceVariant,
}));
