import React from 'react';

import {AppText} from 'Components';
import {ActionButtonView} from '../styles';

interface IActionButtonProps {
  label: string;
  color: AppTheme.TColors;
  radius: number;
  onPress: () => void;
}

const ActionButton = ({label, color, radius, onPress}: IActionButtonProps) => {
  return (
    <ActionButtonView
      color={color}
      radius={radius}
      activeOpacity={0.6}
      onPress={onPress}>
      <AppText color="surface" variant="medium" size={14} textAlign="center">
        {label}
      </AppText>
    </ActionButtonView>
  );
};

export default ActionButton;
