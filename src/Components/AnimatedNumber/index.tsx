import {Animated} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

import AppText, {IAppTextProps} from '../AppText';

interface IAnimatedNumberProps {
  value: number;
  valueProps?: IAppTextProps;
  duration?: number;
}

const AnimatedNumber = (props: IAnimatedNumberProps) => {
  const {duration = 800, value = 0, valueProps} = props;

  const animatedValue = useRef(new Animated.Value(0)).current;
  const [displayValue, setDisplayValue] = useState(0);

  animatedValue.addListener(({value: currentValue}) => {
    setDisplayValue(Math.trunc(currentValue));
  });

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value,
      duration,
      useNativeDriver: true,
    }).start();
  }, [value, duration]);

  return <AppText {...valueProps}>{displayValue}</AppText>;
};

export default AnimatedNumber;
