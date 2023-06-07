import React from 'react';

import AppText, {IAppTextProps} from '../../AppText';
import {StyledIconButton, TitleWrapper} from '../styles';
import {Flex} from 'Styles';

interface IBottomSheetTitleProps {
  title: string;
  titleProps?: IAppTextProps;
  onCloseSheet?: () => void;
}

const BottomSheetTitle = ({title, onCloseSheet, titleProps}: IBottomSheetTitleProps) => {
  return (
    <TitleWrapper>
      <Flex>
        <StyledIconButton icon="close" onPress={onCloseSheet} />
      </Flex>

      <AppText size={18} variant="bold" {...titleProps}>
        {title}
      </AppText>
      <Flex />
    </TitleWrapper>
  );
};

export default BottomSheetTitle;
