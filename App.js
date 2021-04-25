import React from 'react';
import { Provider } from "react-redux";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import { StatusBar } from 'expo-status-bar';
import store from "./store";
import App from './app/App';

const theme = {
   ...DefaultTheme,
   roundness: 7,
   colors: {
      ...DefaultTheme.colors,
      primary: '#66cccc',
      accent: '#aaeecc',
      backgroundr: '#fff'
   },
};

export default function Root() {
   console.log('App executed!');
   return (
      <PaperProvider theme={theme}>
         <Provider store={store}>
            <StatusBar style="light" translucent={false} />
            <App />
         </Provider>
      </PaperProvider>
   );
}

