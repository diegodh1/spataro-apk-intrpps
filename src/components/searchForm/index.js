import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';
import {
  TextInput,
  Button,
  Snackbar,
  Card,
  Paragraph,
  Avatar,
  Dialog,
  Portal,
  ActivityIndicator,
  FAB,
  Text,
  RadioButton,
} from 'react-native-paper';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {Picker} from '@react-native-community/picker';
import {postLogin} from '../../actions/login';

const SearchForm = ({navigation}) => {
  //reducer variables
  const user = useSelector(state => state.reducer.user);
  const path = useSelector(state => state.reducer.baseUrl);
  const [forms, setForms] = React.useState([]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (user.AppUserName !== '') {
        searchFormsById(user.AppUserErpName);
      }
    });
    return unsubscribe;
  }, [navigation]);

  const searchFormsById = value => {
    const requestOptions = {
      method: 'GET',
    };
    if (value !== undefined && value !== '') {
      fetch(path + '/forms/user/' + value, requestOptions)
        .then(response => response.json())
        .then(data => {
          setForms(data);
        })
        .catch(error => {
          setForms([]);
        });
    }
  };

  //render item order component
  const renderForm = ({item}) => (
    <Card
      elevation={0.2}
      onPress={() => alert('agregar funcionalidad descargar pdf')}>
      <Card.Title
        titleStyle={{fontSize: 25}}
        title={'Formulario #' + item.FormularioId}
        subtitle={moment(item.Fecha).format('YYYY-MM-DD')}
        left={props => (
          <Avatar.Icon
            {...props}
            color="white"
            style={{backgroundColor: '#ed2939'}}
            icon="gesture-tap"
          />
        )}
      />
      <Card.Content>
        <Text style={{textAlign: 'justify', fontSize: 10, marginBottom: '2%'}}>
          <Text style={{color: '#ed2939'}}>Nombre: </Text>
          {item.Nombre}
        </Text>
        <Text style={{textAlign: 'justify', fontSize: 10, marginBottom: '2%'}}>
          <Text style={{color: '#ed2939'}}>Nit: </Text>
          {item.Nit}
        </Text>
      </Card.Content>
    </Card>
  );
  return (
    <SafeAreaView>
      <View style={styles.rootContainer}>
        <FlatList
          data={forms}
          renderItem={renderForm}
          keyExtractor={(item, index) => '' + index}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: 'white',
    height: '100%',
  },
  textInput: {
    marginTop: '7%',
    marginLeft: '5%',
    marginRight: '5%',
    backgroundColor: 'white',
  },
  logo: {
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: '25%',
    width: '90%',
    height: '18%',
    resizeMode: 'stretch',
  },
  viewButton: {
    flexDirection: 'row',
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: '10%',
  },
  button: {
    marginTop: '10%',
    marginRight: '5%',
    marginLeft: '5%',
  },
  buttonDirection: {
    flexDirection: 'row-reverse',
  },
  snackbar: {
    backgroundColor: '#2C3E50',
  },
});

export default SearchForm;
