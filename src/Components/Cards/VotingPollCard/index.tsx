import React from 'react';

import AppCard from '../AppCard';
import {AppChip, AppText, GoToIndicator, Spacer} from 'Components';
import {TFormattedVotingPoll} from 'Types';
import {RowContent, TextWrapper} from './styles';
import {getTimeDifference, getVotingPollStatus} from 'Utils';
import {Swipeable} from 'react-native-gesture-handler';
import SwipeableActions from './Components/SwipeableActions';

interface IVotingPollCardProps {
  votingPoll: TFormattedVotingPoll;
  onPress?: () => void;
  actions: (() => void)[];
  disabled?: boolean;
  // ! Guest Mode Code
  guestMode?: boolean;
}

const VotingPollCard = (props: IVotingPollCardProps) => {
  const {
    votingPoll = {},
    onPress,
    actions,
    disabled = false,
    // ! Guest Mode Code
    guestMode = false,
  } = props;

  const {
    question = '',
    is_active = false,
    timestamp = 0,
  } = votingPoll as TFormattedVotingPoll;

  const {label, color} = getVotingPollStatus(is_active);
  const date = `Created ${getTimeDifference(timestamp)}`;

  return (
    <Swipeable
      renderRightActions={() =>
        // ! Guest Mode Code
        !guestMode && (
          <SwipeableActions actions={actions} isActive={is_active} />
        )
      }>
      <AppCard
        mode="contained"
        height={100}
        innerSpacerProps={{horizontal: 12}}
        disabled={disabled}
        onPress={onPress}>
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
    </Swipeable>
  );
};

export default VotingPollCard;
