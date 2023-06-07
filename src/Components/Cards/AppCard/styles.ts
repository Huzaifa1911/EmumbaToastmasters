import {Card} from 'react-native-paper';
import styled from 'styled-components/native';

import {TCardContainer, TCardContentContainer} from './types';

export const CardContainer = styled(Card)(
  ({
    height,
    showBorder,
    width,
    borderColor,
    roundness,
    theme,
  }: TCardContainer) => ({
    height,
    width,
    borderRadius: roundness,
    ...(showBorder && {
      borderWidth: 1,
      borderColor: theme?.colors[borderColor] as string,
    }),
  }),
);

export const CardContentContainer = styled(Card.Content)(
  ({
    bottom,
    horizontal = 10,
    left,
    right,
    top,
    vertical = 10,
    roundness,
  }: TCardContentContainer) => ({
    paddingHorizontal: horizontal,
    paddingVertical: vertical,
    paddingRight: right,
    paddingLeft: left,
    paddingBottom: bottom,
    paddingTop: top,
    borderRadius: roundness,
  }),
);
