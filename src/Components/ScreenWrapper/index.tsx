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
  backgroundColor?: string;
}

const ScreenWrapper = (props: PropsWithChildren<IScreenWrapperProps>) => {
  const theme = useAppTheme();
  const {
    type = 'none',
    children,
    scrollViewProps,
    viewProps,
    keyboardAwareScrollViewProps,
    backgroundColor = theme.colors.background,
  } = props;
  return (
    <>
      <Switch>
        <Case condition={type === 'scroll'}>
          <ScreenScrollView color={backgroundColor} {...scrollViewProps}>
            {children}
          </ScreenScrollView>
        </Case>
        <Case condition={type === 'keyboard'}>
          <ScreenKeyboardAwareScrollView
            color={backgroundColor}
            {...keyboardAwareScrollViewProps}>
            {children}
          </ScreenKeyboardAwareScrollView>
        </Case>
        <Default>
          <ScreenView color={backgroundColor} {...viewProps}>
            {children}
          </ScreenView>
        </Default>
      </Switch>
    </>
  );
};

export default ScreenWrapper;
