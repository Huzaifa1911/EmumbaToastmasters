import {StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

import {AppTheme} from 'Assets';

export const StyledContainer = styled(Animated.View)(
  ({theme}: AppTheme.ThemeType) => ({
    flex: 1,
    elevation: '2',
    borderRadius: 20,
    shadowColor: theme?.colors.background,
    shadowOpacity: '1',
    shadowRadius: 16.0,
  }),
);

export const scenenContainerStyles = StyleSheet.create({
  container: {
    backgroundColor: AppTheme.colors.error,
    borderRadius: 20,
  },
});
