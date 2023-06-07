import {TouchableOpacity, View} from 'react-native';
import styled from 'styled-components/native';

import {AppButton} from 'Components';

type TPollTypeButton = {isSelected: boolean} & AppTheme.ThemeType;

export const Container = styled(View)(() => ({
  flex: 1,
  paddingTop: 10,
  paddingHorizontal: 16,
}));

export const ListContent = styled(View)(() => ({
  flexDirection: 'row' as const,
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap' as const,
  width: '97%',
}));

export const PollButtonContainer = styled(TouchableOpacity)(
  ({isSelected, theme}: TPollTypeButton) => ({
    height: 150,
    width: 165,
    alignItems: 'flex-end',
    borderColor: isSelected ? theme?.colors.primary : theme?.colors.outline,
    borderWidth: 1,
    borderRadius: 20,
    paddingBottom: 10,
    paddingHorizontal: 5,
    marginBottom: 20,
    paddingTop: 5,
  }),
);

export const Wrapper = styled(View)({
  flex: 1,
  alignSelf: 'center',
  justifyContent: 'flex-end',
});

export const NextButton = styled(AppButton).attrs(
  ({theme}: AppTheme.ThemeType) => ({
    textColor: theme?.colors.white,
    labelStyle: {fontSize: 16, fontWeight: 'bold'},
  }),
)({});
