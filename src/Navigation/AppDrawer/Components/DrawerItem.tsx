import React, {useState} from 'react';

import {StyledDrawerItem} from '../styles';
import {AppText} from 'Components';
import {useAppTheme} from 'Assets';

interface IDrawerItemProps {
  label: string;
  onPress?: () => void;
  right?: React.ReactElement;
  left?: React.ReactElement;
}

const DrawerItem = ({label, left, onPress, right}: IDrawerItemProps) => {
  const [backgroundColor, setBackgroundColor] = useState('transparent');
  const {colors} = useAppTheme();

  return (
    <StyledDrawerItem
      activeOpacity={0.7}
      onPress={onPress}
      backgroundColor={backgroundColor}
      onPressIn={() => setBackgroundColor(colors.surfaceVariant)}
      onPressOut={() => setBackgroundColor('transparent')}>
      {left}
      <AppText size={14} variant="medium">
        {label}
      </AppText>
      {right}
    </StyledDrawerItem>
  );
};

export default DrawerItem;
