import {View} from 'react-native';
import React from 'react';
import {TSpeechTimeSlot} from 'Types';
import AppCard from '../AppCard';

import {AppButton, AppText, Spacer} from 'Components';
import {ColorBox, Content} from './styles';
import {RowBetween} from 'Styles';
import {
  formateTimeStamp,
  getSpeechDuration,
  getSpeechQualificationColor,
} from 'Utils';
import dayjs from 'dayjs';

interface ISpeechTimeCardProps {
  speech: TSpeechTimeSlot;

  onPrimaryButtonPress?: () => void;
}

const SpeechTimeCard = (props: ISpeechTimeCardProps) => {
  const {speech, onPrimaryButtonPress} = props;
  const {endTime, speaker, speech_type} = speech;

  const duration = getSpeechDuration(speech_type);
  const end_timestamp =
    endTime !== 0 ? formateTimeStamp(endTime, 'mm:ss:SSS') : 'Not started yet';
  const color = getSpeechQualificationColor({
    minutes: dayjs(endTime).get('minutes'),
    seconds: dayjs(endTime).get('seconds'),
    speechType: speech_type,
  });

  return (
    <AppCard
      height={230}
      mode="contained"
      innerSpacerProps={{horizontal: 20, top: 10}}>
      <Content>
        <ColorBox color={color} />
        <AppText variant="medium" size={20} numberOfLines={1}>
          {speaker}
        </AppText>
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
