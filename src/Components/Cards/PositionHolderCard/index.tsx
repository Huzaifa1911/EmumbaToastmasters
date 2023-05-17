import React from 'react';
import {View} from 'react-native';

import {ToasmtasterType} from 'Types';
import {Container, Content, StyledDivider} from './styles';
import {AppText, ProfileAvatar} from 'Components';

interface IPositionHolderCardProps {
  participant: ToasmtasterType;
}

const PositionHolderCard = (props: IPositionHolderCardProps) => {
  const {
    participant: {name = '', points = 0, profileImage = '', position = 0},
  } = props;
  return (
    <Container>
      <View>
        <AppText variant="bold">{position}</AppText>
        <StyledDivider />
      </View>

      <Content>
        <ProfileAvatar uri={profileImage} />
        <AppText textAlign="center" variant="medium">{`@${name}`}</AppText>
        <AppText size={14} color="primary" variant="bold">
          {points}
        </AppText>
      </Content>
    </Container>
  );
};

export default PositionHolderCard;
