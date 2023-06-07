import React from 'react';
import {ActivityIndicator, ActivityIndicatorProps} from 'react-native-paper';
import {When} from 'react-if';

import Spacer, {ISpacerProps} from './Spacer';

interface IAppActivityIndicator extends ActivityIndicatorProps {
  isLoading: boolean;
  spacerProps?: ISpacerProps;
}

const AppActivityIndicator = ({
  isLoading,
  spacerProps,
  ...rest
}: IAppActivityIndicator) => {
  return (
    <When condition={isLoading}>
      <Spacer {...spacerProps}>
        <ActivityIndicator size={20} {...rest} />
      </Spacer>
    </When>
  );
};

export default AppActivityIndicator;
