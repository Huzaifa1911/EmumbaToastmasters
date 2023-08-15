/* eslint-disable quotes */
import React, {useState} from 'react';
import {FadeInDown} from 'react-native-reanimated';
import {TextInput} from 'react-native-paper';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import {
  AppButton,
  AppInputFormField,
  AppText,
  ScreenWrapper,
  Spacer,
} from 'Components';
import {Footer, Header, RowWrapper} from './styles';
import {NavigationService, useLogin} from 'Services';
import {SCREENS, loginSchema} from 'Utils';

type TDefaultValues = {
  email: string;
  password: string;
};

const goToSignupScreen = () =>
  NavigationService.navigate(SCREENS.SIGNUP_SCREEN);

const LoginScreen = () => {
  const [secureText, setSecureText] = useState(true);

  const methods = useForm<TDefaultValues>({
    defaultValues: {
      // email: 'huzaifa.arshad@emumba.com',
      // password: 'asdf@1234',
      email: '',
      password: '',
    },
    mode: 'onChange',
    resolver: yupResolver(loginSchema),
  });

  const togglePassword = () => setSecureText(prev => !prev);
  const {mutate} = useLogin({showLoading: true});

  const onPress = ({email, password}: TDefaultValues) => {
    mutate({email, password});
  };

  return (
    <FormProvider {...methods}>
      <ScreenWrapper backgroundColor="primary">
        <Header>
          <AppText variant="bold" size={25} color="white">
            Login to continue
          </AppText>
        </Header>

        <Footer entering={FadeInDown.duration(800)}>
          <AppInputFormField
            autoCapitalize="none"
            name="email"
            label="Email"
            mode="outlined"
            placeholder="Enter your email"
            autoFocus
            keyboardType="email-address"
          />

          <Spacer top={20} />
          <AppInputFormField
            name="password"
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
          <Spacer top={100} />
          <AppButton
            onPress={methods.handleSubmit(onPress)}
            mode="contained"
            uppercase
            disabled={!methods.formState.isValid}>
            Login
          </AppButton>
          <RowWrapper>
            <AppText>{"Don't Have an account?"}</AppText>
            <AppText
              color="primary"
              variant="medium"
              onPress={goToSignupScreen}>
              Create One
            </AppText>
          </RowWrapper>
        </Footer>
      </ScreenWrapper>
    </FormProvider>
  );
};

export default LoginScreen;
