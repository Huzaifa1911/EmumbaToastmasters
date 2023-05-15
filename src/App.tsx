import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {Provider as ReduxProvider} from 'react-redux';

import AppWrapper from './AppWrapper';
import {ReduxStore, persistedStore} from 'Store';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
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
