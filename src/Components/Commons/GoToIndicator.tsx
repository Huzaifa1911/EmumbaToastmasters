import {View} from 'react-native';
import React from 'react';

import {AngleRightIcon} from 'Icons';
import styled from 'styled-components';

const GoToIndicator = () => {
  return (
    <Container>
      <AngleRightIcon size={18} />
    </Container>
  );
};

export default GoToIndicator;

const Container = styled(View)(({theme}: AppTheme.ThemeType) => ({
  width: 23,
  height: 23,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme?.colors.onSurfaceDisabled,
  borderRadius: 4,
}));
