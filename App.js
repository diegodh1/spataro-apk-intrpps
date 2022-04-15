import React from 'react';
import DrawerContent from './src/components/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Login from './src/components/login';
import Formulario from './src/components/form';
import SearchForm from './src/components/searchForm';
import SanMarcosForm from './src/components/sanmarcosform';
import UserForm from './src/components/user';

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
        name="UserForm"
        component={UserForm}
        options={{
          title: 'Administracion',
          headerTintColor: '#979A9A',
        }}
      />
      <Drawer.Screen
        name="Formulario"
        component={Formulario}
        options={{
          title: 'Formulario',
          headerTintColor: '#979A9A',
        }}
      />

      <Drawer.Screen
        name="Buscar"
        component={SearchForm}
        options={{
          title: 'Buscar Formulario',
          headerTintColor: '#979A9A',
        }}
      />

      <Drawer.Screen
        name="FormularioSanMarcos"
        component={SanMarcosForm}
        options={{
          title: 'Formulario',
          headerTintColor: '#979A9A',
        }}
      />
    </Drawer.Navigator>
  </NavigationContainer>
);
