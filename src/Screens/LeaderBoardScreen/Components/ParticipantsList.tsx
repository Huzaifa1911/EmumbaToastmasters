import React from 'react';

import {ToasmtasterType} from 'Types';
import {PositionHolderCard} from 'Components';

interface IParticipantsListProps {
  participants: ToasmtasterType[];
}

const ParticipantsList = ({participants = []}: IParticipantsListProps) => {
  participants.map((participant, index) => {
    return <PositionHolderCard key={index} participant={participant} />;
  });
};

export default ParticipantsList;
