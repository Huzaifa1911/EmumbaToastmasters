import React, {PropsWithChildren} from 'react';

import {Spacer} from 'Components';
import {CardContainer, CardContentContainer} from './styles';
import {IAppCardProps} from './types';

const AppCard = (props: PropsWithChildren<IAppCardProps>) => {
  const {
    onPress,
    outerSpacerProps = {flex: 1},
    innerSpacerProps,
    disabled,
    style,
    roundness = 8,
    contentStyle,
    children,
    height = 'auto',
    showBorder = false,
    borderColor = 'outline',
    width = 'auto',
    mode = 'elevated',
  } = props;

  const isDisabled = !onPress || disabled;

  return (
    <Spacer {...outerSpacerProps}>
      <CardContainer
        onPress={onPress}
        disabled={isDisabled}
        style={style}
        height={height}
        width={width}
        borderColor={borderColor}
        roundness={roundness}
        contentStyle={contentStyle}
        mode={mode}
        showBorder={showBorder}>
        <CardContentContainer roundness={roundness} {...innerSpacerProps}>
          {children}
        </CardContentContainer>
      </CardContainer>
    </Spacer>
  );
};

export default AppCard;
