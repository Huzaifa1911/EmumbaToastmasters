import {ProfileAvatar} from 'Components';
import {View} from 'react-native';
import {Divider} from 'react-native-paper';
import styled from 'styled-components/native';

export const Container = styled(View)({paddingTop: 40, paddingHorizontal: 20});
export const StyledAvatar = styled(ProfileAvatar)({marginLeft: 13});

export const StyledDivider = styled(Divider)({
  marginTop: 20,
});
