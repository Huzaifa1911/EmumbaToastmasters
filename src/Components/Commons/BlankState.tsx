import React from 'react';
import {AppText, Spacer} from 'Components';
import {EmptyStateIcon} from 'SvgIcons';
import {JustifyCenter} from 'Styles';

export interface IBlankStateProps {
  label?: string;
  infoText?: string;
}

const BlankState = ({infoText, label}: IBlankStateProps) => {
  return (
    <JustifyCenter style={{flex: 1}}>
      <Spacer top={50} bottom={30}>
        <EmptyStateIcon />
      </Spacer>

      <JustifyCenter>
        <AppText
          variant="bold"
          textAlign="center"
          size={18}
          textTransform="uppercase">
          {label}
        </AppText>
        <AppText textAlign="center">{infoText}</AppText>
      </JustifyCenter>
    </JustifyCenter>
  );
};

export default BlankState;
