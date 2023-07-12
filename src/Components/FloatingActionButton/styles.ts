import {FAB} from 'react-native-paper';
import styled from 'styled-components/native';

export const FabActionButton = styled(FAB)(() => ({
  position: 'absolute' as const,
  right: 25,
  bottom: 35,
  borderRadius: 50,
}));
