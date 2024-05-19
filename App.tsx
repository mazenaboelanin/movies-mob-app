import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import MoviesListing from './src/screens/MoviesListing/MoviesListing';
import MovieDetails from './src/screens/MovieDetails/MovieDetails';

const Stack = createNativeStackNavigator();

export default function App() {
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
