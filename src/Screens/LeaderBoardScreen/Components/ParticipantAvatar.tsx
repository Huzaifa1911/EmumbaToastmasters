import React from 'react';

import {ToasmtasterType} from 'Types';
import {StyledProfileAvatar, TextContent} from '../styles';
import {AppText} from 'Components';
import {JustifyCenter} from 'Styles';

type TPosition = 'first' | 'second' | 'third';

interface IParticipantAvatarProps {
  participant: ToasmtasterType;
  position: TPosition;
}

const getPositionInfo = (position: TPosition) => {
  switch (position) {
    case 'first':
      return {
        position: 1,
        badge: '👑',
      };
    case 'second':
      return {
        position: 2,
        badge: '',
      };
    case 'third':
      return {
        position: 3,
        badge: '',
      };
    default:
      return {position: 1, badge: '👑'};
  }
};

const ParticipantAvatar = (props: IParticipantAvatarProps) => {
  const {
    participant: {name = '', points = 0, profileImage = ''},
    position,
  } = props;

  const positionInfo = getPositionInfo(position);

  const isFirst = position === 'first';

  return (
    <JustifyCenter>
      <AppText size={14} variant="bold">
        {positionInfo.position}
      </AppText>

      <AppText size={45}>{positionInfo.badge}</AppText>

      <StyledProfileAvatar uri={profileImage} isFirst={isFirst} />

      <TextContent isFirst={isFirst}>
        <AppText numberOfLines={1} textAlign="center" size={10}>
          {`@${name}`}
        </AppText>
      </TextContent>

      <AppText color="primary" textAlign="center" variant="bold" size={10}>
        {points}
      </AppText>
    </JustifyCenter>
  );
};

export default ParticipantAvatar;
