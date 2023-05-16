import React from 'react';

import {LegendBox} from '../styles';
import {AppText} from 'Components';
import {Row} from 'Styles';

const ChartLegend = ({label, color}: {label: string; color: string}) => {
  return (
    <Row>
      <LegendBox color={color} />
      <AppText size={12} variant="medium">
        {label}
      </AppText>
    </Row>
  );
};

export default ChartLegend;
