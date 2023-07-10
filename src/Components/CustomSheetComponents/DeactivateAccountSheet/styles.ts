import {View} from 'react-native';
import styled from 'styled-components/native';

export const Container = styled(View)(() => ({
  flex: 1,
  paddingHorizontal: 20,
}));

export const ActionWrapper = styled(View)(() => ({
  flex: 1,
  justifyContent: 'flex-end',
  paddingBottom: 30,
}));
