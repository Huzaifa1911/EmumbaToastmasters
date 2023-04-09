import {View} from 'react-native';
import {TextInput} from 'react-native-paper';
import styled from 'styled-components/native';

export const Content = styled(View)({
  flexDirection: 'row' as const,
  alignItems: 'center',
});

type TPaperTextInput = {
  isFlat: boolean;
  isFocused: boolean;
} & CustomThemeType;

export const PaperTextInput = styled(TextInput).attrs<TPaperTextInput>(
  ({isFlat, theme, isFocused}: TPaperTextInput) => ({
    contentStyle: {
      ...(isFlat && {
        backgroundColor: theme?.colors.background,
        borderWidth: 1,
        borderRadius: 6,
        borderColor: isFocused ? theme?.colors.primary : theme?.colors.outline,
      }),
    },
    outlineStyle: {borderRadius: 6, borderWidth: 1},
  }),
)<TPaperTextInput>(({theme}: TPaperTextInput) => ({
  backgroundColor: theme?.colors.background,
  fontSize: 14,
}));
