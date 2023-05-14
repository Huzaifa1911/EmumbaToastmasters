import React, {PropsWithChildren} from 'react';
import {TouchableOpacity} from 'react-native';

import {Spacer} from 'Components';
import {CardContainer, CardContentContainer} from './styles';
import {IAppCardProps} from './types';

const AppCard = (props: PropsWithChildren<IAppCardProps>) => {
  const {
    onPress,
    outerSpacerProps = {flex: 1},
    innerSpacerProps,
    disabled = false,
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
      <TouchableOpacity
        onPress={onPress}
        disabled={isDisabled}
        activeOpacity={0.7}>
        <CardContainer
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
      </TouchableOpacity>
    </Spacer>
  );
};

export default AppCard;
