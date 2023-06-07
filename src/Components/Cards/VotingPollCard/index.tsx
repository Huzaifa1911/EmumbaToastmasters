import React from 'react';

import AppCard from '../AppCard';
import {AppChip, AppText, GoToIndicator, Spacer} from 'Components';
import {TFormattedVotingPoll} from 'Types';
import {RowContent, TextWrapper} from './styles';
import {getTimeDifference, getVotingPollStatus} from 'Utils';

interface IVotingPollCardProps {
  votingPoll: TFormattedVotingPoll;
  onPress?: () => void;
}

const VotingPollCard = (props: IVotingPollCardProps) => {
  const {votingPoll = {}, onPress} = props;

  const {question = '', is_active = false, timestamp = 0} = votingPoll as TFormattedVotingPoll;

  const {label, color} = getVotingPollStatus(is_active);
  const date = `About ${getTimeDifference(timestamp)}`;

  return (
    <AppCard mode="contained" height={100} innerSpacerProps={{horizontal: 12}} onPress={onPress}>
      <RowContent>
        {/* Info Content */}
        <TextWrapper>
          <AppText size={16} variant="bold" numberOfLines={2}>
            {question}
          </AppText>
        </TextWrapper>

        <Spacer left={5}>
          <AppChip label={label} chipColor={color} />
        </Spacer>

        <GoToIndicator />
      </RowContent>

      {/* timestamp */}
      <Spacer top={12} />
      <AppText size={12}>{date}</AppText>
    </AppCard>
  );
};

export default VotingPollCard;
