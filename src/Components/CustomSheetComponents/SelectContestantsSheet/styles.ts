import {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {TStandardObject} from 'Types';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

export const ListItemView = styled(TouchableOpacity)(
  ({theme}: AppTheme.ThemeType) => ({
    flexDirection: 'row' as const,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderBottomWidth: 0.4,
    borderBottomColor: theme?.colors.outline,
  }),
);

export const UsersList = styled(BottomSheetFlatList<TStandardObject>).attrs(
  () => ({
    contentContainerStyle: {
      paddingHorizontal: 16,
      paddingTop: 15,
      paddingBottom: 40,
    },
  }),
)({});
