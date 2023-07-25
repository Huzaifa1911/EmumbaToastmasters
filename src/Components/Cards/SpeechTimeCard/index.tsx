import {View} from 'react-native';
import React from 'react';
import dayjs from 'dayjs';
import {When} from 'react-if';

import {TSpeechTimeLog} from 'Types';
import AppCard from '../AppCard';
import {AppButton, AppChip, AppText, Spacer} from 'Components';
import {ColorBox, Content, NameWrapper} from './styles';
import {Row, RowBetween} from 'Styles';
import {
  formateTimeStamp,
  getSpeechDuration,
  getSpeechQualificationColor,
  getSpeechQualificationResult,
} from 'Utils';

interface ISpeechTimeCardProps {
  speech: TSpeechTimeLog;

  onPrimaryButtonPress?: () => void;
}

const SpeechTimeCard = (props: ISpeechTimeCardProps) => {
  const {speech, onPrimaryButtonPress} = props;
  const {endTime, speaker, speech_type} = speech;

  const duration = getSpeechDuration(speech_type);
  const end_timestamp =
    endTime !== 0 ? formateTimeStamp(endTime, 'mm:ss:SSS') : 'Not started yet';

  const minutes = dayjs(endTime).get('minutes');
  const seconds = dayjs(endTime).get('seconds');
  const color = getSpeechQualificationColor({
    minutes,
    seconds,
    speechType: speech_type,
  });

  const {color: chipColor, label: chipLabel} = getSpeechQualificationResult({
    minutes,
    seconds,
    speechType: speech_type,
  });
  const hasSpeechStarted = minutes > 0 || seconds > 0;

  return (
    <AppCard
      height={230}
      mode="contained"
      innerSpacerProps={{horizontal: 20, top: 10}}>
      <Content>
        <Row>
          <ColorBox color={color} />
          <NameWrapper>
            <AppText variant="medium" size={20} numberOfLines={1}>
              {speaker}
            </AppText>
          </NameWrapper>
        </Row>
        <When condition={hasSpeechStarted}>
          <AppChip label={chipLabel} chipColor={chipColor} />
        </When>
      </Content>

      <Spacer top={20} />

      {/* Speech Duration */}
      <RowBetween>
        <View>
          <AppText color="outline" variant="medium">
            {speech_type}
          </AppText>
          <AppText>{duration}</AppText>
        </View>

        <View>
          <AppText variant="medium" color="outline">
            Speech Ended
          </AppText>
          <AppText>{end_timestamp}</AppText>
        </View>
      </RowBetween>

      {/* View Button */}
      <Spacer top={35} />
      <AppButton mode="contained" onPress={onPrimaryButtonPress}>
        View
      </AppButton>
    </AppCard>
  );
};

export default SpeechTimeCard;
