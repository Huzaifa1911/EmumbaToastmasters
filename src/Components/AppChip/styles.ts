import {View} from 'react-native';
import styled from 'styled-components/native';

type TStyledChip = {
  backgroundColor: AppTheme.TColors;
  height: number | string;
} & AppTheme.ThemeType;

export const StyledChip = styled(View)(({backgroundColor, height, theme}: TStyledChip) => ({
  backgroundColor: theme?.colors[backgroundColor] as string,
  flexDirection: 'row' as const,
  borderRadius: 11,
  alignItems: 'center',
  height,
  paddingHorizontal: 12,
  paddingVeritcal: 5,
}));
