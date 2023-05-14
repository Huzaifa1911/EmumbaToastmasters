import {ViewProps, ScrollViewProps} from 'react-native';
import React, {PropsWithChildren} from 'react';
import {Case, Default, Switch} from 'react-if';
import {KeyboardAwareScrollViewProps} from 'react-native-keyboard-aware-scroll-view';

import {
  ScreenKeyboardAwareScrollView,
  ScreenScrollView,
  ScreenView,
} from './styles';
import {useAppTheme} from 'Assets';

interface IScreenWrapperProps {
  type?: 'scroll' | 'none' | 'keyboard';
  viewProps?: ViewProps;
  scrollViewProps?: ScrollViewProps;
  keyboardAwareScrollViewProps?: KeyboardAwareScrollViewProps;
  backgroundColor?: AppTheme.TColors;
}

const ScreenWrapper = (props: PropsWithChildren<IScreenWrapperProps>) => {
  const {colors} = useAppTheme();
  const {
    type = 'none',
    children,
    scrollViewProps,
    viewProps,
    keyboardAwareScrollViewProps,
    backgroundColor = 'background',
  } = props;
  const color = colors[backgroundColor] as string;
  return (
    <>
      <Switch>
        <Case condition={type === 'scroll'}>
          <ScreenScrollView color={color} {...scrollViewProps}>
            {children}
          </ScreenScrollView>
        </Case>
        <Case condition={type === 'keyboard'}>
          <ScreenKeyboardAwareScrollView
            color={color}
            {...keyboardAwareScrollViewProps}>
            {children}
          </ScreenKeyboardAwareScrollView>
        </Case>
        <Default>
          <ScreenView color={color} {...viewProps}>
            {children}
          </ScreenView>
        </Default>
      </Switch>
    </>
  );
};

export default ScreenWrapper;
