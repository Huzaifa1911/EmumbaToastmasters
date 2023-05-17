import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {Provider as ReduxProvider} from 'react-redux';
import {LogBox} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';

import AppWrapper from './AppWrapper';
import {ReduxStore, persistedStore} from 'Store';

const App = () => {
  LogBox.ignoreLogs(['VirtualizedLists']);
  useEffect(() => {
    setTimeout(() => SplashScreen.hide(), 1000);
  }, []);

  return (
    <ReduxProvider store={ReduxStore}>
      <PersistGate persistor={persistedStore}>
        <AppWrapper />
      </PersistGate>
    </ReduxProvider>
  );
};

export default App;
