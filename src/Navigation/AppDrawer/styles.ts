import styled from 'styled-components/native';
import {TouchableOpacity, View} from 'react-native';

import {Layout} from 'Components';
import {TColorScheme} from 'Types';

export const Container = styled(Layout)(({theme}: AppTheme.ThemeType) => ({
  flex: 1,
  paddingBottom: 50,
  backgroundColor: theme?.colors.background,
}));

export const ProfileWrapper = styled(View)(
  ({theme, mode}: {mode: TColorScheme} & AppTheme.ThemeType) => ({
    height: 180,
    paddingTop: 15,
    paddingLeft: 20,
    alignItems: 'center',
    flexDirection: 'row' as const,
    backgroundColor:
      mode === 'light' ? theme?.colors.primary : theme?.colors.surfaceVariant,
  }),
);

export const StyledDrawerItem = styled(TouchableOpacity)(
  ({backgroundColor}: {backgroundColor: string}) => ({
    backgroundColor,
    paddingHorizontal: 16,
    height: 40,
    flexDirection: 'row' as const,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8,
    marginHorizontal: 10,
    marginVertical: 5,
  }),
);
