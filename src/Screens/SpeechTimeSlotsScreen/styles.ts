import {View} from 'react-native';
import styled from 'styled-components/native';

export const Container = styled(View)(() => ({
  flex: 1,
  paddingHorizontal: 16,
  paddingTop: 30,
}));

export const ModalWrapper = styled(View)(() => ({
  flex: 1,
  paddingHorizontal: 16,
  paddingTop: 20,
  paddingBottom: 35,
}));

export const ButtonWrapper = styled(View)({
  flex: 1,
  justifyContent: 'flex-end',
});
