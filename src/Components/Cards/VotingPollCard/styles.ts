import {View} from 'react-native';
import styled from 'styled-components/native';

export const TextWrapper = styled(View)({width: '60%'});

export const RowContent = styled(View)(() => ({
  flexDirection: 'row' as const,
  justifyContent: 'space-between',
}));
