import React from 'react';

import AppText, {IAppTextProps} from '../../AppText';
import {AppCard} from 'Components';

interface IStatCardProps {
  label?: string;
  labelProps?: IAppTextProps;
  value?: string;
  valueProps?: IAppTextProps;
}

const StatCard = (props: IStatCardProps) => {
  const {label, labelProps, value, valueProps} = props;
  return (
    <AppCard height={75} mode="contained">
      <AppText size={20} variant="bold" {...valueProps}>
        {value}
      </AppText>

      <AppText size={15} variant="regular" {...labelProps}>
        {label}
      </AppText>
    </AppCard>
  );
};

export default StatCard;
