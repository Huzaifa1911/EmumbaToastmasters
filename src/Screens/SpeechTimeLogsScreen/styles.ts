import {TSpeechTimeLog, TSpeechTimeLogSection} from 'Types';
import {SectionList, View} from 'react-native';
import styled from 'styled-components/native';

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

export const SpeechTimeLogSectionList = styled(
  SectionList<TSpeechTimeLog, TSpeechTimeLogSection>,
).attrs(() => ({
  contentContainerStyle: {
    paddingTop: 30,
    paddingHorizontal: 16,
  },
}))({});
