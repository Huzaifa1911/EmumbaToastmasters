import {ScrollView} from 'react-native';
import styled from 'styled-components/native';

import {AppButton} from 'Components';

export const ScrollContent = styled(ScrollView).attrs(() => ({
  contentContainerStyle: {
    paddingHorizontal: 16,
    flexGrow: 1,
  },
}))({});

export const CreatePollButton = styled(AppButton).attrs(
  ({theme}: AppTheme.ThemeType) => ({
    textColor: theme?.colors.white,
    labelStyle: {fontSize: 16, fontWeight: 'bold'},
    mode: 'contained',
  }),
)({marginHorizontal: 16, marginBottom: 50});
