import React from 'react';
import {ButtonWrapper} from './styles';
import {ButtonProps} from 'react-native-paper';

interface IAppButtonProps extends Omit<ButtonProps, 'contentStyle'> {
  height?: number | string;
  width?: number | string;
  shiftIconToRight?: boolean;
}

const AppButton = (props: IAppButtonProps) => {
  const {children, height = 50, width, shiftIconToRight, mode, ...rest} = props;

  return (
    <ButtonWrapper outlined={mode === 'outlined'} mode={mode} height={height} width={width} shiftIconToRight={shiftIconToRight} {...rest}>
      {children}
    </ButtonWrapper>
  );
};

export default AppButton;
