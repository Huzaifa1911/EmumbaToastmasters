import React, {useMemo} from 'react';
import {Spacer} from 'Components';
import {Row} from 'Styles';
import {
  ACTIVE_POLL_SWIPEABLE_ACTIONS,
  CLOSED_POLL_SWIPEABLE_ACTIONS,
} from 'Utils';
import ActionButton from './ActionButton';

interface ISwipeableActionsProps {
  actions: (() => void)[];
  isActive: boolean;
}

const SwipeableActions = ({actions, isActive}: ISwipeableActionsProps) => {
  const ACTIONS = useMemo(
    () =>
      isActive ? ACTIVE_POLL_SWIPEABLE_ACTIONS : CLOSED_POLL_SWIPEABLE_ACTIONS,
    [isActive],
  );

  return (
    <Spacer>
      <Row>
        {ACTIONS.map((button, key) => {
          return (
            <ActionButton
              key={key}
              label={button.name}
              color={button.color}
              radius={key === ACTIONS.length - 1 ? 8 : 0}
              onPress={actions[key] && actions[key]}
            />
          );
        })}
      </Row>
    </Spacer>
  );
};

export default SwipeableActions;
