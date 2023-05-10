import {View} from 'react-native';
import React, {PropsWithChildren} from 'react';
import {useTheme} from 'react-native-paper';

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
  const {
    bottom,
    flex,
    horizontal,
    left,
    right,
    top,
    vertical,
    children,
    color = 'onPrimary',
  } = props;
  const {colors} = useTheme();
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
