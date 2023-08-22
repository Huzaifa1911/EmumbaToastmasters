import React from 'react';
import Animated, {
  EntryAnimationsValues,
  ExitAnimationsValues,
  SharedValue,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {
  StyleSheet,
  Text,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';

export const DEFAULT_ANIMATION_DELAY = 0;
export const DEFAULT_ANIMATION_DISTANCE = 80;
export const DEFAULT_ANIMATION_DURATION = 200;

interface IStopWatchTextProps {
  tensOfMs: number;
  lastDigit: number;
  tens: number;
  minutes: number;
  enterAnimationType?: 'slide-in-up' | 'slide-in-down';
  containerStyle?: StyleProp<ViewStyle>;
  digitStyle?: StyleProp<TextStyle>;
  separatorStyle?: StyleProp<TextStyle>;
  textCharStyle?: StyleProp<TextStyle>;
  trailingZeros?: 0 | 1 | 2;
  leadingZeros?: 1 | 2;
}

const StopwatchText = ({
  tensOfMs,
  lastDigit,
  tens,
  minutes,
  enterAnimationType = 'slide-in-up',
  containerStyle,
  digitStyle,
  separatorStyle,
  textCharStyle,
  leadingZeros = 1,
  trailingZeros = 1,
}: IStopWatchTextProps) => {
  const isSecondsDigitMounted = useSharedValue(false);
  const isTensOfSecondsDigitMounted = useSharedValue(false);
  const isMinutesDigitMounted = useSharedValue(false);

  const createEntering =
    (isFirstRender: SharedValue<boolean>) =>
    (values: EntryAnimationsValues) => {
      'worklet';
      if (!isFirstRender.value) {
        // Skip entering animation on first render
        isFirstRender.value = true;
        return {initialValues: {}, animations: {}};
      }
      const animations = {
        originY: withDelay(
          DEFAULT_ANIMATION_DELAY,
          withTiming(values.targetOriginY, {
            duration: DEFAULT_ANIMATION_DURATION,
          }),
        ),
      };
      const enterDirection = enterAnimationType === 'slide-in-up' ? -1 : 1;
      const initialValues = {
        originY:
          values.targetOriginY + DEFAULT_ANIMATION_DISTANCE * enterDirection,
      };
      return {
        initialValues,
        animations,
      };
    };

  const exiting = (values: ExitAnimationsValues) => {
    'worklet';
    const exitDirection = enterAnimationType === 'slide-in-up' ? 1 : -1;
    const animations = {
      originY: withDelay(
        DEFAULT_ANIMATION_DELAY,
        withTiming(
          values.currentOriginY + DEFAULT_ANIMATION_DISTANCE * exitDirection,
          {
            duration: DEFAULT_ANIMATION_DURATION,
          },
        ),
      ),
    };
    const initialValues = {
      originY: values.currentOriginY,
    };
    return {
      initialValues,
      animations,
    };
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {width, ...textCharStyleWithoutWidth} = StyleSheet.flatten(
    textCharStyle || {},
  );

  return (
    <View style={[styles.container, containerStyle]}>
      {leadingZeros === 2 && (
        <Text
          style={[
            styles.defaultCharStyle,
            textCharStyleWithoutWidth,
            digitStyle,
          ]}>
          0
        </Text>
      )}
      <Animated.Text
        key={`${minutes}-minutes`}
        style={[styles.defaultCharStyle, textCharStyleWithoutWidth, digitStyle]}
        entering={createEntering(isMinutesDigitMounted)}
        exiting={exiting}>
        {minutes}
      </Animated.Text>
      <Text
        style={[
          styles.defaultCharStyle,
          textCharStyleWithoutWidth,
          separatorStyle,
        ]}>
        :
      </Text>
      <Animated.Text
        key={`${tens}-tens`}
        style={[styles.defaultCharStyle, textCharStyleWithoutWidth, digitStyle]}
        entering={createEntering(isTensOfSecondsDigitMounted)}
        exiting={exiting}>
        {tens}
      </Animated.Text>
      <Animated.Text
        key={`${lastDigit}-count`}
        style={[styles.defaultCharStyle, textCharStyleWithoutWidth, digitStyle]}
        entering={createEntering(isSecondsDigitMounted)}
        exiting={exiting}>
        {lastDigit}
      </Animated.Text>
      {trailingZeros > 0 && (
        <>
          <Text
            style={[
              styles.defaultCharStyle,
              textCharStyleWithoutWidth,
              separatorStyle,
            ]}>
            ,
          </Text>
          <Text
            style={[
              styles.defaultCharStyle,
              textCharStyleWithoutWidth,
              digitStyle,
            ]}>
            {tensOfMs >= 10 ? String(tensOfMs).charAt(0) : 0}
          </Text>
          {trailingZeros === 2 && (
            <Text
              style={[
                styles.defaultCharStyle,
                textCharStyleWithoutWidth,
                digitStyle,
              ]}>
              {tensOfMs >= 10
                ? String(tensOfMs).charAt(1)
                : String(tensOfMs).charAt(0)}
            </Text>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  defaultCharStyle: {
    textAlign: 'center',
  },
});

export default StopwatchText;
