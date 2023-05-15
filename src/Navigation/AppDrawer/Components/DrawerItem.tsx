import React, {useState} from 'react';

import {StyledDrawerItem} from '../styles';
import {AppText, Spacer} from 'Components';
import {useAppTheme} from 'Assets';
import {Row} from 'Styles';
import {When} from 'react-if';

interface IDrawerItemProps {
  label: string;
  onPress?: () => void;
  right?: React.ReactElement;
  left?: React.ReactElement;
  type?: 'info' | 'danger';
  active?: boolean;
}

const DrawerItem = ({
  label,
  left,
  onPress,
  right,
  type = 'info',
}: IDrawerItemProps) => {
  const {colors} = useAppTheme();

  const [backgroundColor, setBackgroundColor] = useState('transparent');

  const color = type === 'info' ? 'onBackground' : 'error';

  return (
    <StyledDrawerItem
      activeOpacity={0.7}
      onPress={onPress}
      backgroundColor={backgroundColor}
      onPressIn={() => setBackgroundColor(colors.surfaceVariant)}
      onPressOut={() => setBackgroundColor('transparent')}>
      <Row>
        <When condition={left !== null}>
          <Spacer right={10}>{left}</Spacer>
        </When>
        <AppText size={14} variant="medium" color={color}>
          {label}
        </AppText>
      </Row>
      <When condition={right !== null}>{right}</When>
    </StyledDrawerItem>
  );
};

export default DrawerItem;
