import React from 'react';

import {ToastmasterAttendedSessionType} from 'Types';
import AppCard from '../AppCard';
import CalendarIcon from './Components/CalendarIcon';
import {AppText, GoToIndicator, Spacer} from 'Components';
import {Container, TextContent} from './styles';
import {Row} from 'Styles';

interface IToastmasterSessionCardProps {
  session: ToastmasterAttendedSessionType;
  onCardPress?: () => void;
}

const ToastmasterAttendedSessionCard = (
  props: IToastmasterSessionCardProps,
) => {
  const {session} = props;
  const {performedRole = '', theme = '', timestamp = 0} = session;

  return (
    <AppCard
      height={102}
      mode="contained"
      innerSpacerProps={{top: 8, horizontal: 15}}>
      <Container>
        <CalendarIcon timestamp={timestamp} />
        {/* Sesssion Theme */}
        <Spacer left={14}>
          <TextContent>
            <AppText size={18} variant="bold" numberOfLines={1}>
              {theme + theme}
            </AppText>
          </TextContent>

          {/* Performed Role Info */}
          <Spacer top={5} />
          <Row>
            <AppText size={14}>Performed Role: </AppText>
            <AppText size={14} variant="medium">
              {performedRole}
            </AppText>
          </Row>
        </Spacer>

        <GoToIndicator spacerProps={{left: -20}} />
      </Container>
    </AppCard>
  );
};

export default ToastmasterAttendedSessionCard;
