import React from 'react';
import {Provider as ReduxProvider} from 'react-redux';
import {LogBox} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';
import {QueryClientProvider} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import AppWrapper from './AppWrapper';
import {ReduxStore, persistedStore} from 'Store';
import {queryClient} from 'Services';

const App = () => {
  LogBox.ignoreLogs([
    'AxiosError',
    'VirtualizedLists',
    'Expected style "shadowOpacity: 0.7px" to be unitless',
    'Node of type rule not supported as an inline style',
    'Warning: Overriding previous layout animation with new one before the first began',
  ]);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ReduxProvider store={ReduxStore}>
        <PersistGate persistor={persistedStore}>
          <QueryClientProvider client={queryClient}>
            <AppWrapper />
            <Toast />
          </QueryClientProvider>
        </PersistGate>
      </ReduxProvider>
    </GestureHandlerRootView>
  );
};

export default App;
