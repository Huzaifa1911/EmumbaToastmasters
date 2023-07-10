import React, {createRef} from 'react';

import {
  AppBottomSheet,
  AppText,
  DeactivateAccountSheet,
  InfoButton,
  ScreenWrapper,
  Spacer,
} from 'Components';
import {Container, StyledAvatar, StyledDivider} from './styles';
import {selectUser, useAppSelector} from 'Store';
import {
  DisableAccountIcon,
  EditIcon,
  LockIcon,
  LogoutIcon,
  SmartPhoneIcon,
} from 'Icons';
import {NavigationService, useLogout} from 'Services';
import {SCREENS} from 'Utils';
import {TBottomSheetHandler} from 'Types';

const goToEditProfileScreen = () =>
  NavigationService.navigate(SCREENS.EDIT_PROFILE_SCREEN);

const goToChangePasswordScreen = () =>
  NavigationService.navigate(SCREENS.CHANGE_PASSWORD_SCREEN);

const sheetRef = createRef<TBottomSheetHandler>();

const ProfileScreen = () => {
  const user = useAppSelector(selectUser);

  const {mutate: logoutMutation} = useLogout({showLoading: true});

  const userName = `${user?.first_name} ${user?.last_name}`;
  const email = user?.email;

  return (
    <>
      <ScreenWrapper>
        <Container>
          <StyledAvatar size={80} />
          <Spacer top={10}>
            <AppText variant="bold" size={20}>
              {userName}
            </AppText>
            <AppText variant="regular" size={14} color="outline">
              {email}
            </AppText>
          </Spacer>

          {/* Action Buttons */}
          <InfoButton
            title="Edit Profile"
            icon={<EditIcon size={20} />}
            onPress={goToEditProfileScreen}
            spacerProps={{top: 30}}
          />
          <InfoButton
            spacerProps={{top: 20}}
            title="Change Password"
            icon={<LockIcon size={20} />}
            onPress={goToChangePasswordScreen}
          />
          <StyledDivider />
          <InfoButton
            spacerProps={{top: 20}}
            title="App Information"
            icon={<SmartPhoneIcon size={20} />}
          />
          <StyledDivider />
          <InfoButton
            spacerProps={{top: 20}}
            title="Logout"
            onPress={logoutMutation}
            icon={<LogoutIcon size={20} />}
            iconBackgroundColor="accentRed"
          />
          <InfoButton
            spacerProps={{top: 20}}
            title="Deactivate Account"
            icon={<DisableAccountIcon size={20} />}
            iconBackgroundColor="accentRed"
            onPress={expandBottomSheet}
          />
        </Container>
      </ScreenWrapper>
      <AppBottomSheet
        ref={sheetRef}
        title="Deactivate Account"
        onCloseSheet={closeBottomSheet}
        snapPoints={['60%']}>
        <DeactivateAccountSheet onCloseBottomSheet={closeBottomSheet} />
      </AppBottomSheet>
    </>
  );
};

export default ProfileScreen;

export const expandBottomSheet = () => sheetRef.current?.open();
export const closeBottomSheet = () => sheetRef.current?.close();
