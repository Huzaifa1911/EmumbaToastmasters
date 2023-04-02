import {View} from 'react-native';
import React, {PropsWithChildren} from 'react';

interface ISpacerProps {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  horizontal?: number;
  vertical?: number;
  flex?: number;
}

const Spacer = (props: PropsWithChildren<ISpacerProps>) => {
  const {bottom, flex, horizontal, left, right, top, vertical, children} =
    props;
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
      }}>
      {children}
    </View>
  );
};

export default Spacer;
