import {TouchableOpacity, View} from 'react-native';

import styled from 'styled-components/native';

export const TextWrapper = styled(View)({width: '60%'});

export const RowContent = styled(View)(() => ({
  flexDirection: 'row' as const,
  justifyContent: 'space-between',
}));

export const ActionButtonView = styled(TouchableOpacity)(
  ({
    theme,
    color,
    radius,
  }: {radius: number; color: AppTheme.TColors} & AppTheme.ThemeType) => ({
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 100,
    backgroundColor: theme?.colors[color] as string,
    borderTopRightRadius: radius,
    borderBottomRightRadius: radius,
  }),
);
