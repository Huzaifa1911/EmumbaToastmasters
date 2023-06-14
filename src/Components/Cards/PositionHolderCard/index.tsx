import React from 'react';
import {View} from 'react-native';

import {TStandardObject} from 'Types';
import {Container, Content, StyledDivider} from './styles';
import {AppText, ProfileAvatar} from 'Components';

interface IPositionHolderCardProps {
  participant: TStandardObject;
  position: number;
}

const PositionHolderCard = (props: IPositionHolderCardProps) => {
  const {
    participant: {label, value},
    position,
  } = props;
  return (
    <Container>
      <View>
        <AppText variant="bold">{position}</AppText>
        <StyledDivider />
      </View>

      <Content>
        <ProfileAvatar uri="" />
        <AppText textAlign="center" variant="medium">{`@${label}`}</AppText>
        <AppText size={14} color="primary" variant="bold">
          {value}
        </AppText>
      </Content>
    </Container>
  );
};

export default PositionHolderCard;
