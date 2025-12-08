import React from 'react';
import Navigation from './src/navigation/Navigation';
import axios from 'axios';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/redux/store/index';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  const baseurl = 'http://192.168.1.40:8200/socialapp';
  axios.defaults.baseURL = baseurl;
  axios.defaults.timeout = 5000;

  axios.interceptors.request.use(req => {
    console.log('Request:', req);
    return req;
  });

  axios.interceptors.response.use(
    res => {
      console.log('Response:', res.data);
      return res;
    },
    err => {
      console.log('Axios Error:', err);
      return Promise.reject(err);
    },
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <PaperProvider>
            <Navigation />
          </PaperProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
