import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import AddBookScreen from './screens/AddBookScreen';
import MapScreen from './screens/MapScreen';
import { Provider as PaperProvider } from 'react-native-paper';


const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
    
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Add Livro" component={AddBookScreen} />
          <Stack.Screen name="Mapa" component={MapScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}