import {FlatList, View} from 'react-native';
import styled from 'styled-components/native';

import {ProfileAvatar} from 'Components';
import {ToasmtasterType} from 'Types';

export const ScreenContainer = styled(View)(() => ({
  paddingHorizontal: 16,
  alignItems: 'center',
  paddingTop: 150,
  borderBottomLeftRadius: 40,
  borderBottomRightRadius: 40,
}));

export const TopParticipantsContainer = styled(View)(() => ({
  flexDirection: 'row' as const,
  alignItems: 'center',
  width: '80%',
  justifyContent: 'space-between',
}));

export const ParticipantFlatList = styled(FlatList<ToasmtasterType>).attrs(() => ({
  contentContainerStyle: {
    paddingHorizontal: 16,
    paddingVertical: 50,
  },
}))({});

export const FirstParticipantContainer = styled(View)(() => ({
  alignSelf: 'center',
  bottom: 40,
  position: 'absolute' as const,
  right: 0,
  left: 0,
  zIndex: 1,
}));

export const TextContent = styled(View)(({isFirst}: {isFirst: boolean}) => ({
  marginTop: 15,
  ...(isFirst && {width: '20%'}),
}));

export const StyledProfileAvatar = styled(ProfileAvatar).attrs(({isFirst}: {isFirst: boolean}) => ({
  size: isFirst ? 140 : 100,
}))(({theme, isFirst}: {isFirst: boolean} & AppTheme.ThemeType) => ({
  borderWidth: 4,
  borderColor: theme?.colors.primaryContainer,
  ...(isFirst && {
    shadowColor: theme?.colors.primaryContainer,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.7,
    shadowRadius: 10,
  }),
}));
