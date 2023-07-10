/* eslint-disable quotes */
import React from 'react';

import {ActionWrapper, Container} from './styles';
import {AppButton, AppText, Spacer} from 'Components';
import {JustifyCenter} from 'Styles';
import {WarningIcon} from 'Icons';
import {useAppTheme} from 'Assets';
import {useDeActivateAccount} from 'Services';

interface IDeactivateAccountSheetProps {
  onCloseBottomSheet: () => void;
}

const DeactivateAccountSheet = ({
  onCloseBottomSheet,
}: IDeactivateAccountSheetProps) => {
  const {colors} = useAppTheme();

  const {mutate} = useDeActivateAccount({showLoading: true});

  return (
    <Container>
      <JustifyCenter>
        <WarningIcon size={50} color={colors.yellow} />
        <AppText textAlign="center" size={18} variant="medium">
          {"You're about to deactivate your account"}
        </AppText>
        <Spacer top={5} />
        <AppText textAlign="center" size={16} color="onSurfaceVariant">
          This will deactivate your account and you will not able to login
          again!
        </AppText>
      </JustifyCenter>

      <ActionWrapper>
        <AppButton mode="outlined" onPress={onCloseBottomSheet}>
          Cancel
        </AppButton>
        <Spacer top={10} />
        <AppButton mode="contained" onPress={() => mutate(null)}>
          Deactivate
        </AppButton>
      </ActionWrapper>
    </Container>
  );
};

export default DeactivateAccountSheet;
