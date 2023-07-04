import {View} from 'react-native';
import styled from 'styled-components/native';

import {ProfileAvatar} from 'Components';

export const Container = styled(View)(() => ({
  flex: 1,
  paddingTop: 50,
  paddingBottom: 100,
  paddingHorizontal: 16,
}));

export const StyledAvatar = styled(ProfileAvatar)({marginRight: 15});
export const UploadAvatarWrapper = styled(View)(() => ({
  flexDirection: 'row' as const,
  alignItems: 'center',
  paddingHorizontal: 20,
}));

export const ButtonWrapper = styled(View)({
  flex: 1,
  justifyContent: 'flex-end',
});
