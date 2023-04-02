import {TouchableOpacity, View} from 'react-native';
import styled from 'styled-components/native';

export const Wrapper = styled(View)({
  flexDirection: 'row' as const,
  alignItems: 'center',
});

export const ButtonWrapper = styled(TouchableOpacity)({
  flexDirection: 'row' as const,
  alignItems: 'center',
});
