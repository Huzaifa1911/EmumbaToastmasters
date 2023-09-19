import {AppButton} from 'Components';
import {View} from 'react-native';
import styled from 'styled-components/native';

export const Container = styled(View)(() => ({
  flex: 1,
  paddingTop: 30,
  paddingHorizontal: 16,
}));

export const SubmitButton = styled(AppButton).attrs(
  ({theme}: AppTheme.ThemeType) => ({
    mode: 'contained',
    textColor: theme?.colors.white,
    labelStyle: {fontSize: 16, fontWeight: 'bold'},
  }),
)({});
