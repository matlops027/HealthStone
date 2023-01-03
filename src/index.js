import React from 'react';
import Routes from './routes.js';

import { MenuProvider } from 'react-native-popup-menu';
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
  return (
    <MenuProvider>
      <Provider store={store}>
        <Routes />
      </Provider>
    </MenuProvider>
  );
}

export default App;
