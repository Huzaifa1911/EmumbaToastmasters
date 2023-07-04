import {TouchableOpacity, View} from 'react-native';
import styled from 'styled-components/native';

export const MainContainer = styled(TouchableOpacity)({
  flexDirection: 'row' as const,
  alignItems: 'center',
  justifyContent: 'space-between',
  height: 55,
});
export const TextContent = styled(View)({
  flexDirection: 'row' as const,
  alignItems: 'center',
});

export const IconContainer = styled(View)(
  ({theme, color}: {color: AppTheme.TColors} & AppTheme.ThemeType) => ({
    height: 45,
    width: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: theme?.colors[color] as string,
    marginRight: 10,
  }),
);
