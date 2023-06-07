import {View} from 'react-native';
import React, {PropsWithChildren} from 'react';

import {useAppTheme} from 'Assets';

export interface ISpacerProps {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  horizontal?: number;
  vertical?: number;
  flex?: number;
  color?: AppTheme.TColors;
}

const Spacer = (props: PropsWithChildren<ISpacerProps>) => {
  const {bottom, flex, horizontal, left, right, top, vertical, children, color = 'transparent'} = props;

  const {colors} = useAppTheme();
  const backgroundColor = colors[color] as string;

  return (
    <View
      style={{
        flex,
        marginBottom: bottom,
        marginTop: top,
        marginRight: right,
        marginLeft: left,
        marginHorizontal: horizontal,
        marginVertical: vertical,
        backgroundColor,
      }}>
      {children}
    </View>
  );
};

export default Spacer;
