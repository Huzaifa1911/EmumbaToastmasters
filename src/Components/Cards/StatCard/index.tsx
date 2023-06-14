import React from 'react';

import AppText, {IAppTextProps} from '../../AppText';
import {AnimatedNumber, AppCard} from 'Components';

interface IStatCardProps {
  label?: string;
  labelProps?: IAppTextProps;
  value: number;
  valueProps?: IAppTextProps;
}

const StatCard = (props: IStatCardProps) => {
  const {label, labelProps, value, valueProps} = props;

  return (
    <AppCard height={75} mode="contained">
      <AppText size={15} {...labelProps}>
        {label}
      </AppText>
      <AnimatedNumber
        value={value}
        valueProps={{size: 20, variant: 'bold', ...valueProps}}
      />
    </AppCard>
  );
};

export default StatCard;
