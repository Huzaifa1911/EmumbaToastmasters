import React from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import {
  AppButton,
  AppInputFormField,
  AppText,
  ScreenWrapper,
  Spacer,
} from 'Components';
import {Container, StyledAvatar, UploadAvatarWrapper} from './styles';
import {PlusIcon} from 'Icons';
import {useAppTheme} from 'Assets';
import {selectUser, useAppSelector} from 'Store';
import {TUser} from 'Types';
import {showToast, updateProfileSchema} from 'Utils';
import {NetworkTypes, useUpdateProfile} from 'Services';

const onProfileUpdateButtonPress = () => {
  showToast(
    'Profile Update functionality not yet implemented.',
    'Profile Update',
    'error',
  );
};

const EditProfile = () => {
  const {colors} = useAppTheme();
  const {
    first_name = '',
    last_name = '',
    email = '',
    id: userId = 0,
  } = useAppSelector(selectUser) as TUser;

  const {mutate: updateProfileMutation} = useUpdateProfile({showLoading: true});

  const methods = useForm<NetworkTypes.TUpdateProfile>({
    defaultValues: {first_name: '', last_name: '', email: ''},
    values: {first_name: first_name, last_name: last_name, email: email},
    resolver: yupResolver(updateProfileSchema),
  });

  const onSubmit = (data: NetworkTypes.TUpdateProfile) => {
    updateProfileMutation({payload: data, userId});
  };

  return (
    <FormProvider {...methods}>
      <ScreenWrapper
        type="scroll"
        scrollViewProps={{contentContainerStyle: {flexGrow: 1}}}>
        <Container>
          {/* Upload Profile Container */}
          <UploadAvatarWrapper>
            <StyledAvatar size={70} />
            <AppText
              onPress={onProfileUpdateButtonPress}
              color="primary"
              variant="medium"
              rightAccessory={<PlusIcon size={20} color={colors.primary} />}>
              Photo Upload
            </AppText>
          </UploadAvatarWrapper>

          {/* Form Fields */}
          <Spacer top={40} />
          <AppInputFormField name="email" mode="flat" label="Email" />

          <Spacer top={15} />
          <AppInputFormField name="first_name" mode="flat" label="First Name" />

          <Spacer top={15} />
          <AppInputFormField name="last_name" mode="flat" label="Last Name" />
        </Container>
        <Spacer bottom={50} horizontal={16}>
          <AppButton
            mode="contained"
            disabled={!methods.formState.isDirty || !methods.formState.isValid}
            onPress={methods.handleSubmit(onSubmit)}>
            Save
          </AppButton>
        </Spacer>
      </ScreenWrapper>
    </FormProvider>
  );
};

export default EditProfile;
