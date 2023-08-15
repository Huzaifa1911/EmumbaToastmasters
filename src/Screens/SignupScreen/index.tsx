import React, {useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {FadeInDown} from 'react-native-reanimated';
import {TextInput} from 'react-native-paper';
import {yupResolver} from '@hookform/resolvers/yup';

import {
  AppButton,
  AppInputFormField,
  AppText,
  ScreenWrapper,
  Spacer,
} from 'Components';
import {Footer, Header, ScrollContent} from './styles';
import {NavigationService, useCreateAccount} from 'Services';
import {signupSchema} from 'Utils';

type TDefaultValues = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
};

const SignupScreen = () => {
  const [secureText, setSecureText] = useState(true);

  const methods = useForm<TDefaultValues>({
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
    resolver: yupResolver(signupSchema),
  });

  const {mutate} = useCreateAccount({showLoading: true});

  const togglePassword = () => setSecureText(prev => !prev);

  const onPress = ({
    confirmPassword,
    email,
    firstName,
    lastName,
    password,
  }: TDefaultValues) => {
    mutate({
      first_name: firstName,
      last_name: lastName,
      username: email,
      email,
      password1: password,
      password2: confirmPassword,
    });
  };

  return (
    <FormProvider {...methods}>
      <ScreenWrapper backgroundColor="primary">
        <Header>
          <AppText variant="bold" size={25} color="white">
            Create your account
          </AppText>
        </Header>

        <Footer entering={FadeInDown.duration(800)}>
          <ScrollContent>
            <AppInputFormField
              name="firstName"
              label="First Name"
              mode="outlined"
              placeholder="Enter firstname"
              autoFocus
            />

            <Spacer top={20} />
            <AppInputFormField
              name="lastName"
              label="Last Name"
              mode="outlined"
              placeholder="Enter lastname"
            />

            <Spacer top={20} />
            <AppInputFormField
              autoCapitalize="none"
              name="email"
              label="Email"
              mode="outlined"
              placeholder="Enter email"
              keyboardType="email-address"
            />

            <Spacer top={20} />
            <AppInputFormField
              autoCapitalize="none"
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

            <Spacer top={20} />
            <AppInputFormField
              autoCapitalize="none"
              name="confirmPassword"
              label="Confirm Password"
              mode="outlined"
              placeholder="Enter password again"
              secureTextEntry={secureText}
              right={
                <TextInput.Icon
                  icon={secureText ? 'eye-off' : 'eye'}
                  size={15}
                  onPress={togglePassword}
                />
              }
            />

            <Spacer top={50} />
            <AppButton
              onPress={methods.handleSubmit(onPress)}
              mode="contained"
              uppercase
              disabled={!methods.formState.isValid}>
              Create Account
            </AppButton>

            <Spacer top={20} />
            <AppButton
              onPress={NavigationService.goBack}
              mode="outlined"
              uppercase>
              Go back
            </AppButton>
          </ScrollContent>
        </Footer>
      </ScreenWrapper>
    </FormProvider>
  );
};

export default SignupScreen;
