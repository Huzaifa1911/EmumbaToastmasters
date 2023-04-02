import React from 'react';
import {ActivityIndicator, StyleProp, ViewStyle} from 'react-native';
import {When} from 'react-if';

import AppText, {IAppTextProps} from '../AppText';
import {ButtonWrapper} from './styles';
import {AppTheme} from 'Assets';
import Spacer from '../Commons/Spacer';

interface IAppButtonProps {
  title: string;
  onPress: () => void;
  color?: string;
  leftAccessory?: React.ReactElement;
  rightAccessory?: React.ReactElement;
  titleProps?: Omit<IAppTextProps, 'leftIcon' | 'rightIcon'>;
  outlined?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

const AppButton = (props: IAppButtonProps) => {
  const {
    onPress,
    title,
    titleProps,
    outlined = false,
    color = AppTheme.colors.primary,
    leftAccessory,
    rightAccessory,
    isLoading = false,
    disabled = false,
    style,
  } = props;

  const buttonAccessorycolor = disabled
    ? AppTheme.colors.placeHolder
    : outlined
    ? color
    : AppTheme.colors.white;

  return (
    <ButtonWrapper
      style={style}
      disabled={disabled}
      onPress={onPress}
      activeOpacity={0.5}
      outlined={outlined}
      color={color}>
      <When condition={leftAccessory !== null}>
        <Spacer right={15}>{leftAccessory}</Spacer>
      </When>

      <When condition={isLoading && !disabled}>
        <Spacer right={15}>
          <ActivityIndicator color={buttonAccessorycolor} size={20} />
        </Spacer>
      </When>

      <AppText kind="Medium" color={buttonAccessorycolor} {...titleProps}>
        {title}
      </AppText>

      <When condition={rightAccessory !== null}>
        <Spacer left={15}>{rightAccessory}</Spacer>
      </When>
    </ButtonWrapper>
  );
};

export default AppButton;
