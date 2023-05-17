import React from 'react';

import {ToasmtasterType} from 'Types';
import {FirstParticipantContainer, TopParticipantsContainer} from '../styles';
import ParticipantAvatar from './ParticipantAvatar';

interface ITopParticipantsProps {
  first: ToasmtasterType;
  second: ToasmtasterType;
  third: ToasmtasterType;
}

const TopParticipants = (props: ITopParticipantsProps) => {
  const {first, second, third} = props;
  return (
    <TopParticipantsContainer>
      <ParticipantAvatar participant={second} position="second" />

      <FirstParticipantContainer>
        <ParticipantAvatar participant={first} position="first" />
      </FirstParticipantContainer>

      <ParticipantAvatar participant={third} position="third" />
    </TopParticipantsContainer>
  );
};

export default TopParticipants;
