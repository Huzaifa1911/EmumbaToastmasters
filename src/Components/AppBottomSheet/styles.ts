import {View} from 'react-native';
import {IconButton} from 'react-native-paper';
import styled from 'styled-components/native';

export const BottomSheetBackgroundComponent = styled(View)(
  ({theme}: AppTheme.ThemeType) => ({
    backgroundColor: theme?.colors.surfaceVariant,
    borderRadius: 20,
  }),
);

export const TitleWrapper = styled(View)({
  flexDirection: 'row' as const,
  alignItems: 'center',
  justifyContent: 'center',
});

export const StyledIconButton = styled(IconButton)(
  ({theme}: AppTheme.ThemeType) => ({
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: theme?.colors.surfaceDisabled,
  }),
);

export const Content = styled(View)(({theme}: AppTheme.ThemeType) => ({
  backgroundColor: theme?.colors.surfaceVariant,
  flex: 1,
}));
