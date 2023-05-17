import React from 'react';

import {CalendarIconContainer, DateWrapper, MonthWrapper} from '../styles';
import {formateTimeStamp} from 'Utils';
import {AppText, Spacer} from 'Components';

interface ICalendarIconProps {
  timestamp: number;
  size?: number;
}

const CalendarIcon = ({timestamp, size = 55}: ICalendarIconProps) => {
  const month = formateTimeStamp(timestamp, 'MMM');
  const date = formateTimeStamp(timestamp, 'DD');
  const time = formateTimeStamp(timestamp, 'hh:mm A');

  return (
    <CalendarIconContainer size={size}>
      <MonthWrapper size={size}>
        <AppText size={12} color="white">
          {month}
        </AppText>
      </MonthWrapper>

      <DateWrapper size={size}>
        <AppText size={20} variant="bold">
          {date}
        </AppText>
      </DateWrapper>

      <Spacer top={3}>
        <AppText size={12} color="outline">
          {time}
        </AppText>
      </Spacer>
    </CalendarIconContainer>
  );
};

export default CalendarIcon;
