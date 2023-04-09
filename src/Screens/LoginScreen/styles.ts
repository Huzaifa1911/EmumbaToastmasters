import {View} from 'react-native';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

export const Header = styled(View)({
  flex: 1,
  justifyContent: 'flex-end',
  paddingHorizontal: 20,
  paddingBottom: 50,
});
export const Footer = styled(Animated.View)(({theme}: CustomThemeType) => ({
  flex: 2,
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
  backgroundColor: theme?.colors.background,
  paddingHorizontal: 20,
  paddingVertical: 50,
}));
