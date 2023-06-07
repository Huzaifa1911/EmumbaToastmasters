import {View} from 'react-native';
import React from 'react';
import styled from 'styled-components';

import {AngleRightIcon} from 'Icons';
import Spacer, {ISpacerProps} from './Spacer';

interface IGoToIndicatorProps {
  spacerProps?: ISpacerProps;
  size?: number;
}

const GoToIndicator = ({spacerProps, size = 20}: IGoToIndicatorProps) => {
  return (
    <Spacer {...spacerProps}>
      <Container size={size}>
        <AngleRightIcon size={size - 6} />
      </Container>
    </Spacer>
  );
};

export default GoToIndicator;

const Container = styled(View)(
  ({theme, size}: {size: number} & AppTheme.ThemeType) => ({
    width: size,
    height: size,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme?.colors.onSurfaceDisabled,
    borderRadius: 4,
  }),
);
