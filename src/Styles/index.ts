import {View} from 'react-native';
import styled from 'styled-components/native';

export const Row = styled(View)({
  flexDirection: 'row' as const,
  alignItems: 'center',
});

export const JustifyCenter = styled(View)({
  alignItems: 'center',
  justifyContent: 'center',
});

export const JustifyBetween = styled(View)({
  alignItems: 'center',
  justifyContent: 'space-between',
});
