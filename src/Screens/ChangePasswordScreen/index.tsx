import React, {useMemo, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {TextInput} from 'react-native-paper';

import {
  AppButton,
  AppInputFormField,
  AppText,
  ScreenWrapper,
  Spacer,
} from 'Components';
import {Container} from './styles';
import {yupResolver} from '@hookform/resolvers/yup';
import {changePasswordSchema} from 'Utils';
import {useUpdatePassword} from 'Services';

type TFormValues = {password: string; confirmPassword: string};

const ChangePassword = () => {
  const [secureText, setSecureText] = useState(true);

  const {mutate} = useUpdatePassword({showLoading: true});

  const methods = useForm<TFormValues>({
    defaultValues: {password: '', confirmPassword: ''},
    resolver: yupResolver(changePasswordSchema),
    mode: 'onChange',
  });

  const togglePassword = () => setSecureText(prev => !prev);

  const eyeIcon = useMemo(
    () => (
      <TextInput.Icon
        icon={secureText ? 'eye-off' : 'eye'}
        size={15}
        onPress={togglePassword}
      />
    ),
    [secureText],
  );

  const onUpdatePassword = (data: TFormValues) => {
    mutate(data);
  };

  return (
    <FormProvider {...methods}>
      <ScreenWrapper>
        <Container>
          <AppText variant="bold" size={23}>
            Create new password
          </AppText>
          <AppText size={14} color="outline">
            Your new password must be different from previously used passwords
          </AppText>

          <Spacer top={30} />
          <AppInputFormField
            name="password"
            label="Password"
            secureTextEntry={secureText}
            right={eyeIcon}
          />

          <Spacer top={15} />
          <AppInputFormField
            name="confirmPassword"
            label="Confirm Password"
            secureTextEntry={secureText}
            right={eyeIcon}
          />

          <Spacer top={80} />
          <AppButton
            mode="contained"
            onPress={methods.handleSubmit(onUpdatePassword)}>
            Reset Password
          </AppButton>
        </Container>
      </ScreenWrapper>
    </FormProvider>
  );
};

export default ChangePassword;
