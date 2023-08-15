import {ScrollView, View} from 'react-native';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

export const Header = styled(View)({
  flex: 1,
  justifyContent: 'flex-end',
  paddingHorizontal: 20,
  paddingBottom: 55,
});

export const Footer = styled(Animated.View)(({theme}: AppTheme.ThemeType) => ({
  flex: 3,
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
  backgroundColor: theme?.colors.background,
}));

export const ScrollContent = styled(ScrollView).attrs(() => ({
  contentContainerStyle: {
    paddingHorizontal: 20,
    paddingVertical: 50,
  },
}))({});
