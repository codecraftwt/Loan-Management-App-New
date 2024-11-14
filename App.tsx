import React from 'react';
import {StatusBar} from 'react-native';
// import { PaperProvider } from 'react-native-paper';
// import { NavigationContainer } from '@react-navigation/native';
// import Toast, { BaseToast } from 'react-native-toast-message';
// import { Provider } from 'react-redux';
// import store from './src/Redux/store/store';
import Navigation from './src/Navigations/Navigations';
import {PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        {/* Set the StatusBar color here */}
        <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />
        <Navigation />
        {/* <Toast config={toastConfig} /> */}
      </NavigationContainer>
    </PaperProvider>
  );
}