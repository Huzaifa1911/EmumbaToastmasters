import styled from 'styled-components/native';
import {TouchableOpacity, View} from 'react-native';

import {Layout} from 'Components';

export const Container = styled(Layout)({flex: 1});

export const ProfileWrapper = styled(View)(({theme}: AppTheme.ThemeType) => ({
  paddingLeft: 28,
  height: 150,
  justifyContent: 'center',
  borderBottomWidth: 1,
  borderBottomColor: theme?.colors.outline,
}));

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
