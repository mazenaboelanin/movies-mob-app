import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, NativeModules, Alert } from 'react-native';
import RNRestart from 'react-native-restart';
import MoviesListing from './src/screens/MoviesListing/MoviesListing';
import MovieDetails from './src/screens/MovieDetails/MovieDetails';
import { addEventListener } from "@react-native-community/netinfo";
import { useEffect} from "react";
const { ToastAndroid } = NativeModules;

const Stack = createNativeStackNavigator();

export default function App() {

  useEffect(() => {
    unsubscribe();
  },[]);

  const unsubscribe = addEventListener(state => {
    if (state.isConnected) {
      ToastAndroid.show("internet connection exists", ToastAndroid.SHORT);
    } else if (!state.isConnected) {
      console.log("**** DISCONNECTED ****");
      Alert.alert("No internet connection", "Please reconnect to the internet to use the app", [
        { text: "Reload App", onPress: () => RNRestart.restart() }
      ]);
    }
  });

  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Movies" 
          screenOptions={{
            headerTintColor: 'white',
            headerStyle: { backgroundColor: '#1976D2' },
          }}
          >
          <Stack.Screen name="Movies" component={MoviesListing} />
          <Stack.Screen name="Movie Details" component={MovieDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
