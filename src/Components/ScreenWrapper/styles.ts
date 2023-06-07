import {ScrollView, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styled from 'styled-components/native';

type TWrapper = {color: string};
export const ScreenView = styled(View)(({color}: TWrapper) => ({
  backgroundColor: color,
  flex: 1,
}));

export const ScreenScrollView = styled(ScrollView)(({color}: TWrapper) => ({
  backgroundColor: color,
}));

export const ScreenKeyboardAwareScrollView = styled(KeyboardAwareScrollView)(({color}: TWrapper) => ({
  backgroundColor: color,
}));
