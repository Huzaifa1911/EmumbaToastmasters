import React, {PropsWithChildren, useMemo} from 'react';
import {Else, If, Then} from 'react-if';
import {StyleSheet, TextProps} from 'react-native';
import {customText} from 'react-native-paper';

import {ButtonWrapper, Wrapper} from './styles';
import {Spacer} from 'Components';

const PaperText = customText<
  'italic' | 'bold' | 'medium' | 'regular' | 'thin'
>();

export interface IAppTextProps {
  onPress?: () => void;
  leftAccessory?: React.ReactElement;
  rightAccessory?: React.ReactElement;
  textAlign?: 'center' | 'left' | 'right' | 'justify' | 'auto';
  textDecorationLine?: 'underline' | 'none' | 'line-through';
  textTransform?: 'capitalize' | 'uppercase' | 'lowercase' | 'none';
  variant?: 'italic' | 'bold' | 'medium' | 'regular' | 'thin';
  color?: string;
  size?: number;
  textProps?: TextProps;
  numberOfLines?: number;
}

const AppText = (props: PropsWithChildren<IAppTextProps>) => {
  const {
    onPress,
    children,
    leftAccessory,
    rightAccessory,
    color,
    numberOfLines,
    size = 16,
    textAlign = 'auto',
    textDecorationLine = 'none',
    textProps,
    textTransform = 'none',
    variant = 'regular',
  } = props;
  const isDisabled = !onPress;

  const appTextStyles = useMemo(
    () =>
      StyleSheet.flatten([
        {
          fontSize: size,
          textAlign,
          textTransform,
          textDecorationLine,
          color,
        },
      ]),
    [size, textAlign, textTransform, textDecorationLine, color],
  );

  return (
    <If condition={isDisabled}>
      <Then>
        <Wrapper>
          <Spacer right={2}>{leftAccessory}</Spacer>
          <PaperText
            variant={variant}
            style={appTextStyles}
            numberOfLines={numberOfLines}
            {...textProps}>
            {children}
          </PaperText>
          <Spacer left={2}>{rightAccessory}</Spacer>
        </Wrapper>
      </Then>

      <Else>
        <ButtonWrapper onPress={onPress}>
          <Spacer right={2}>{leftAccessory}</Spacer>
          <PaperText
            variant={variant}
            style={appTextStyles}
            numberOfLines={numberOfLines}
            {...textProps}>
            {children}
          </PaperText>
          <Spacer left={2}>{rightAccessory}</Spacer>
        </ButtonWrapper>
      </Else>
    </If>
  );
};

export default AppText;
