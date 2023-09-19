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

export const RowBetween = styled(View)({
  flexDirection: 'row' as const,
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const Flex = styled(View)({
  flex: 1,
});

export const FlexEnd = styled(View)({
  alignItems: 'flex-end',
});
