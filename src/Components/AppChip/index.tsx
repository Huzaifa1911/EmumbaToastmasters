import React from 'react';

import {StyledChip} from './styles';
import AppText, {IAppTextProps} from '../AppText';
import {Spacer} from 'Components';

interface IAppChipProps {
  label: string;
  labelProps?: IAppTextProps;
  chipColor?: AppTheme.TColors;
  height?: number | string;
  left?: React.ReactElement;
  right?: React.ReactElement;
}

const AppChip = (props: IAppChipProps) => {
  const {label, chipColor = 'onSurfaceDisabled', height = 25, labelProps, left, right} = props;

  return (
    <StyledChip backgroundColor={chipColor} height={height}>
      <Spacer right={5}>{left}</Spacer>

      <AppText size={12} variant="medium" color="white" {...labelProps}>
        {label}
      </AppText>

      <Spacer left={5}>{right}</Spacer>
    </StyledChip>
  );
};

export default AppChip;
