import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';

import WelcomeScreen from "../screens/WelcomeScreen";
import RegisterScreen from "../screens/RegisterScreen";
import PuntajesScreen from "../screens/PuntajesScreen";
import Pantalla1Screen from "../screens/Pantalla1Screen";
import Pantalla2Screen from "../screens/Pantalla2Screen";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Pantalla 1" component={Pantalla1Screen} />
      <Drawer.Screen name="Pantalla 2" component={Pantalla2Screen} />
    </Drawer.Navigator>
  );
}

function MyStack() {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Drawer" component={MyDrawer} />
      <Stack.Screen name="Puntajes" component={PuntajesScreen} />
    </Stack.Navigator>
  );
}

export default function MainNavigator() {
  return <MyStack />;
}
