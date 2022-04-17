import React, {useState} from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import {Avatar, Title, Caption, Drawer, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';

const ProfileInfo = () => {
  const login = useSelector(state => state.reducer.user);

  return (
    <View style={{flexDirection: 'row', marginTop: 15}}>
      <Avatar.Image source={require('../../assets/avatar.jpeg')} size={50} />
      <View style={{marginLeft: 15, flexDirection: 'column'}}>
        <Title style={styles.title}>
          {login.user.name !== undefined ? login.user.name : ''}
        </Title>
      </View>
    </View>
  );
};

const DrawerContent = ({navigation}) => {
  //render
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...navigation}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <ProfileInfo />
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({color, size}) => (
                <Icon
                  name="clipboard-check-outline"
                  color={color}
                  size={size}
                />
              )}
              label="Formulario"
              onPress={() => {
                navigation.navigate('FormularioSanMarcos');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon
                  name="cog-outline"
                  color={color}
                  size={size}
                />
              )}
              label="Administración"
              onPress={() => {
                navigation.navigate('UserForm');
              }}
            />
          </Drawer.Section>
          <Drawer.Section title="Información">
            <View style={styles.preference}>
              <Text style={{marginBottom: '5%'}}>
                Aplicación desarrollada por
              </Text>
              <Text style={{color: 'red'}}>https://www.integrapps.com/</Text>
            </View>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Cerrar Sesión"
          onPress={() => {
            navigation.navigate('Login');
          }}
        />
      </Drawer.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  title: {
    fontSize: 13,
    marginTop: 3,
    maxWidth: '90%',
  },
  caption: {
    fontSize: 12,
    lineHeight: 14,
    maxWidth: '87%',
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

export default DrawerContent;
