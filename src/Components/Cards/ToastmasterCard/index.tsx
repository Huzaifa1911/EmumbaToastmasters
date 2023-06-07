import React from 'react';

import {ToasmtasterType} from 'Types';
import AppCard from '../AppCard';
import {AppText, ProfileAvatar, Spacer} from 'Components';
import {Container} from './styles';

interface IToastmasterCardProps {
  toastmaster: ToasmtasterType;
}

const ToastmasterCard = (props: IToastmasterCardProps) => {
  const {toastmaster} = props;
  const {name = '', profileImage = ''} = toastmaster;

  return (
    <AppCard mode="contained" height={90} innerSpacerProps={{horizontal: 20, top: 10}}>
      <Container>
        <ProfileAvatar size={55} uri={profileImage} />

        <Spacer left={14} top={3}>
          <AppText size={18} variant="bold">
            {name}
          </AppText>
        </Spacer>
      </Container>
    </AppCard>
  );
};

export default ToastmasterCard;
