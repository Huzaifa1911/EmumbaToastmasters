import {
  AppButton,
  AppCheckbox,
  AppInputField,
  AppText,
  ScreenWrapper,
  Spacer,
} from 'Components';
import React, {useState} from 'react';
import {FadeInDown} from 'react-native-reanimated';

import {Footer, Header} from './styles';
import {useAppTheme} from 'Assets';
import {JustifyCenter} from 'Styles';
import {NavigationService} from 'Services';
import {SCREENS} from 'Utils';
import {TextInput} from 'react-native-paper';

const LoginScreen = () => {
  const {colors} = useAppTheme();
  const [secureText, setSecureText] = useState(true);
  const [rememberMe, setRememberMe] = useState<'checked' | 'unchecked'>(
    'unchecked',
  );

  const onRememberMe = () => {
    setRememberMe(prev => (prev === 'checked' ? 'unchecked' : 'checked'));
  };
  const togglePassword = () => setSecureText(prev => !prev);

  const onPress = () => {
    //
  };

  const onSignupButtonPress = () => {
    NavigationService.navigate(SCREENS.SIGNUP_SCREEN);
  };

  return (
    <ScreenWrapper backgroundColor={colors.primary}>
      <Header>
        <AppText variant="bold" size={25} color={colors.onPrimary}>
          Login to continue
        </AppText>
      </Header>
      <Footer entering={FadeInDown.duration(800)}>
        <AppInputField
          label="Email"
          mode="outlined"
          placeholder="Enter Email"
        />

        <Spacer top={22} />
        <AppInputField
          label="Password"
          mode="outlined"
          placeholder="Enter Password"
          secureTextEntry={secureText}
          right={
            <TextInput.Icon icon="eye" size={15} onPress={togglePassword} />
          }
        />

        <Spacer top={10} bottom={80}>
          <AppCheckbox
            status={rememberMe}
            onPress={onRememberMe}
            label="Remember Me"
          />
        </Spacer>

        <AppButton onPress={onPress} mode="contained" uppercase>
          Login
        </AppButton>

        {/* Sign up Text */}
        <Spacer top={20} />
        <JustifyCenter>
          <AppText
            rightAccessory={
              <AppText
                variant="medium"
                color={colors.primary}
                textDecorationLine="underline"
                onPress={onSignupButtonPress}>
                Signup
              </AppText>
            }>
            {/*  eslint-disable-next-line react/no-unescaped-entities */}
            Don't have an account?
          </AppText>
        </JustifyCenter>
      </Footer>
    </ScreenWrapper>
  );
};

export default LoginScreen;
