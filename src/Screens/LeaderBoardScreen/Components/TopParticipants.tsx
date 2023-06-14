import React from 'react';

import {TStandardObject} from 'Types';
import {FirstParticipantContainer, TopParticipantsContainer} from '../styles';
import ParticipantAvatar from './ParticipantAvatar';

interface ITopParticipantsProps {
  first: TStandardObject;
  second: TStandardObject;
  third: TStandardObject;
}

const TopParticipants = (props: ITopParticipantsProps) => {
  const {
    first = {label: '', value: 0},
    second = {label: '', value: 0},
    third = {label: '', value: 0},
  } = props;
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
