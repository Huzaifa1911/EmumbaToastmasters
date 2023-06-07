import React, {useState} from 'react';
import {FadeInDown} from 'react-native-reanimated';
import {TextInput} from 'react-native-paper';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import {AppButton, AppCheckbox, AppInputFormField, AppText, ScreenWrapper, Spacer} from 'Components';
import {Footer, Header} from './styles';
import {useLogin} from 'Services';
import {loginSchema} from 'Utils';

type TDefaultValues = {
  username: string;
  password: string;
  rememberMe: 'checked' | 'unchecked';
};

const LoginScreen = () => {
  const [secureText, setSecureText] = useState(true);

  const methods = useForm<TDefaultValues>({
    defaultValues: {
      username: 'huzaifa.arshad@emumba.com',
      password: 'asdf@123',
      rememberMe: 'unchecked',
    },
    mode: 'onChange',
    resolver: yupResolver(loginSchema),
  });

  const onRememberMe = () => {
    methods.setValue('rememberMe', methods.getValues('rememberMe') === 'checked' ? 'unchecked' : 'checked');
  };
  const togglePassword = () => setSecureText(prev => !prev);
  const {mutate} = useLogin({showLoading: true});

  const onPress = ({username, password}: TDefaultValues) => {
    mutate({username, password});
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
          <AppInputFormField autoCapitalize="none" name="username" label="Username" mode="outlined" placeholder="Enter username" autoFocus />

          <Spacer top={22} />
          <AppInputFormField
            name="password"
            label="Password"
            mode="outlined"
            placeholder="Enter Password"
            secureTextEntry={secureText}
            right={<TextInput.Icon icon={secureText ? 'eye-off' : 'eye'} size={15} onPress={togglePassword} />}
          />

          <Spacer top={10} bottom={80}>
            <AppCheckbox status={methods.watch('rememberMe')} onPress={onRememberMe} label="Remember Me" />
          </Spacer>

          <AppButton onPress={methods.handleSubmit(onPress)} mode="contained" uppercase disabled={!methods.formState.isValid}>
            Login
          </AppButton>
        </Footer>
      </ScreenWrapper>
    </FormProvider>
  );
};

export default LoginScreen;
