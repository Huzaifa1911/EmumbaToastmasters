import React from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {When} from 'react-if';

import {Content, ScreenContainer} from './styles';

interface IAppLoaderProps {
  isLoading: boolean;
}

const AppLoader = ({isLoading = false}: IAppLoaderProps) => {
  return (
    <When condition={isLoading}>
      <ScreenContainer>
        <Content>
          <ActivityIndicator size={20} />
        </Content>
      </ScreenContainer>
    </When>
  );
};

export default AppLoader;
