import React from 'react';
import {RadioButton} from 'react-native-paper';

import AppText, {IAppTextProps} from '../AppText';
import {Container} from './styles';
import Spacer, {ISpacerProps} from '../Commons/Spacer';

interface IAppRadioButtonProps {
  label: string;
  labelProps?: IAppTextProps;
  value: string;
  spacerProps?: ISpacerProps;
}

const AppRadioButton = (props: IAppRadioButtonProps) => {
  const {label, labelProps, value, spacerProps} = props;

  return (
    <Spacer {...spacerProps}>
      <Container>
        <RadioButton.Android value={value} />
        <Spacer left={10}>
          <AppText size={16} variant="medium" {...labelProps}>
            {label}
          </AppText>
        </Spacer>
      </Container>
    </Spacer>
  );
};

export default AppRadioButton;
