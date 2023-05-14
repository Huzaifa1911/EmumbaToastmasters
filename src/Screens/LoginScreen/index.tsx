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

  return (
    <ScreenWrapper backgroundColor={colors.primary}>
      <Header>
        <AppText variant="bold" size={25}>
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
            <TextInput.Icon
              icon={secureText ? 'eye-off' : 'eye'}
              size={15}
              onPress={togglePassword}
            />
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
      </Footer>
    </ScreenWrapper>
  );
};

export default LoginScreen;
