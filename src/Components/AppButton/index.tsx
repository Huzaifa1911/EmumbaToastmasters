import React from 'react';
import {ButtonWrapper} from './styles';
import {ButtonProps} from 'react-native-paper';

interface IAppButtonProps extends Omit<ButtonProps, 'contentStyle'> {
  height?: number | string;
  width?: number | string;
  shiftIconToRight?: boolean;
}

const AppButton = (props: IAppButtonProps) => {
  const {children, height = 50, width, shiftIconToRight, ...rest} = props;

  return (
    <ButtonWrapper
      height={height}
      width={width}
      shiftIconToRight={shiftIconToRight}
      {...rest}>
      {children}
    </ButtonWrapper>
  );
};

export default AppButton;
