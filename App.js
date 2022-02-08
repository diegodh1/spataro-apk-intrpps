import React from 'react';
import DrawerContent from './src/components/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Login from './src/components/login';
import Order from './src/components/order';
import Dpi from './src/components/dpi';

const Drawer = createDrawerNavigator();

export default App = () => (
  <NavigationContainer>
    <Drawer.Navigator drawerContent={DrawerContent}>
      <Drawer.Screen
        name="Login"
        component={Login}
        options={{
          title: 'Bienvenido',
          headerTintColor: '#979A9A',
          swipeEnabled: false,
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Ordenes"
        component={Order}
        options={{
          title: 'Aprobación de Ordenes',
          headerTintColor: '#979A9A',
        }}
      />
      <Drawer.Screen
        name="Dpi"
        component={Dpi}
        options={{
          title: 'Despachos',
          headerTintColor: '#979A9A',
        }}
      />
    </Drawer.Navigator>
  </NavigationContainer>
);
