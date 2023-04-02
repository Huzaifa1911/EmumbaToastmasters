import React, {PropsWithChildren, useMemo} from 'react';
import {Else, If, Then} from 'react-if';
import {StyleSheet, Text, TextProps} from 'react-native';

import {ButtonWrapper, Wrapper} from './styles';
import {AppTheme} from 'Assets';

export interface IAppTextProps {
  onPress?: () => void;
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  textAlign?: 'center' | 'left' | 'right' | 'justify' | 'auto';
  textDecorationLine?: 'underline' | 'none' | 'line-through';
  textTransform?: 'capitalize' | 'uppercase' | 'lowercase' | 'none';
  color?: string;
  size?: number;
  kind?: keyof typeof AppTheme.fonts;
  textProps?: TextProps;
  numberOfLines?: number;
}

const AppText = (props: PropsWithChildren<IAppTextProps>) => {
  const {
    onPress,
    children,
    leftIcon,
    rightIcon,
    color = AppTheme.colors.text,
    numberOfLines,
    size = 16,
    textAlign = 'auto',
    textDecorationLine = 'none',
    textProps,
    textTransform = 'none',
    kind = 'Regular',
  } = props;
  const isDisabled = !onPress;

  const appTextStyles = useMemo(
    () =>
      StyleSheet.flatten([
        {
          fontFamily: AppTheme.fonts[kind],
          fontSize: size,
          textAlign,
          textTransform,
          textDecorationLine,
          color,
        },
      ]),
    [kind, size, textAlign, textTransform, textDecorationLine, color],
  );

  return (
    <If condition={isDisabled}>
      <Then>
        <Wrapper>
          {leftIcon}
          <Text
            style={appTextStyles}
            numberOfLines={numberOfLines}
            {...textProps}>
            {children}
          </Text>
          {rightIcon}
        </Wrapper>
      </Then>

      <Else>
        <ButtonWrapper onPress={onPress}>
          {leftIcon}
          <Text
            style={appTextStyles}
            numberOfLines={numberOfLines}
            {...textProps}>
            {children}
          </Text>
          {rightIcon}
        </ButtonWrapper>
      </Else>
    </If>
  );
};

export default AppText;
