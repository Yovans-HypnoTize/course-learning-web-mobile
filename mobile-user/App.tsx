/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import RootStack from './navigator/Rootstack';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import ToastManager from 'toastify-react-native';
import messaging from '@react-native-firebase/messaging';
import { useEffect } from 'react';

function App() {
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  const getToken = async () => {
    const token = await messaging().getToken();
    console.log('Token = ', token);
  };

  useEffect(() => {
    requestUserPermission();
    getToken();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
      <ToastManager />
    </Provider>
  );
}

export default App;
