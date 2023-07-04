import React from 'react';
import {IconContainer, MainContainer, TextContent} from './styles';

import {AppText} from 'Components';
import {AngleRightIcon} from 'Icons';
import Spacer, {ISpacerProps} from '../Commons/Spacer';

interface IInfoButtonProps {
  icon?: React.ReactElement;
  iconBackgroundColor?: AppTheme.TColors;
  title: string;
  onPress?: () => void;
  spacerProps?: ISpacerProps;
}

const InfoButton = (props: IInfoButtonProps) => {
  const {
    onPress,
    title,
    icon,
    iconBackgroundColor = 'primaryContainer',
    spacerProps,
  } = props;

  return (
    <Spacer {...spacerProps}>
      <MainContainer onPress={onPress} activeOpacity={0.6}>
        <TextContent>
          <IconContainer color={iconBackgroundColor}>{icon}</IconContainer>
          <AppText variant="medium" size={14}>
            {title}
          </AppText>
        </TextContent>
        <AngleRightIcon size={23} />
      </MainContainer>
    </Spacer>
  );
};

export default InfoButton;
