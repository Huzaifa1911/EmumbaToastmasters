import React from 'react';
import {AppText, Spacer} from 'Components';
import {EmptyStateIcon} from 'SvgIcons';
import {JustifyCenter} from 'Styles';
import {When} from 'react-if';

export interface IBlankStateProps {
  label?: string;
  infoText?: string;
  showIcon?: boolean;
}

const BlankState = ({infoText, label, showIcon = true}: IBlankStateProps) => {
  return (
    <JustifyCenter style={{flex: 1}}>
      <When condition={showIcon}>
        <Spacer top={50} bottom={30}>
          <EmptyStateIcon />
        </Spacer>
      </When>

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
