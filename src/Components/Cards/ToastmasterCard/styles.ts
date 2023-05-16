import {View} from 'react-native';
import styled from 'styled-components/native';

export const Container = styled(View)(() => ({
  flexDirection: 'row' as const,
  alignItems: 'flex-start',
}));
