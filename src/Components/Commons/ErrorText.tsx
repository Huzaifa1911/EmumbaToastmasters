import React from 'react';
import {When} from 'react-if';

import {AppText, Spacer} from 'Components';
import {ISpacerProps} from './Spacer';

interface IErrorTextProps {
  message?: string;
  spacerProps?: ISpacerProps;
}

const ErrorText = ({message, spacerProps}: IErrorTextProps) => {
  return (
    <Spacer {...spacerProps}>
      <When condition={message}>
        <AppText size={12} variant="regular" color="error">
          {message}
        </AppText>
      </When>
    </Spacer>
  );
};

export default ErrorText;
