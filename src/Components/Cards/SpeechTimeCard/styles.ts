import {View} from 'react-native';
import styled from 'styled-components/native';

export const ColorBox = styled(View)(
  ({color, theme}: {color: AppTheme.TColors} & AppTheme.ThemeType) => ({
    height: 40,
    width: 40,
    borderRadius: 8,
    backgroundColor: theme?.colors[color] as string,
    marginRight: 10,
  }),
);

export const Content = styled(View)({
  flexDirection: 'row' as const,
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const NameWrapper = styled(View)({
  width: '55%',
});
