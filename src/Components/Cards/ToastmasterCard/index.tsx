import React from 'react';

import {ToasmtasterType} from 'Types';
import AppCard from '../AppCard';
import {AppText, ProfileAvatar, Spacer} from 'Components';
import {Container} from './styles';
import {Else, If, Then} from 'react-if';
import {CardSkeleton} from 'Skeletons';

interface IToastmasterCardProps {
  toastmaster: ToasmtasterType;
  isLoading?: boolean;
}

const ToastmasterCard = (props: IToastmasterCardProps) => {
  const {toastmaster, isLoading} = props;
  const {label} = toastmaster;

  return (
    <If condition={isLoading}>
      <Then>
        <CardSkeleton height={90} />
      </Then>
      <Else>
        <AppCard
          mode="contained"
          height={90}
          outerSpacerProps={{vertical: 10}}
          innerSpacerProps={{horizontal: 20, top: 10}}>
          <Container>
            <ProfileAvatar size={55} uri="" />

            <Spacer left={14} top={3}>
              <AppText size={18} variant="bold">
                {label}
              </AppText>
            </Spacer>
          </Container>
        </AppCard>
      </Else>
    </If>
  );
};

export default ToastmasterCard;
