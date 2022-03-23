import React, {useState, useEffect} from 'react';
import {StyleSheet, SafeAreaView, View, FlatList} from 'react-native';
import {Text, Button, Portal, Dialog, Card, Avatar} from 'react-native-paper';
import {useSelector} from 'react-redux';
import moment from 'moment';
import SearchBar from 'react-native-dynamic-search-bar';
import Geolocation from '@react-native-community/geolocation';

const SanMarcosForm = ({navigation}) => {
  const [showClients, setShowClients] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [location, setLocation] = useState({});
  const [clients, setClients] = useState([]);
  const [client, setClient] = useState({
    Dpto: '',
    Ciudad: '',
    Direccion: '',
    Contacto: '',
    NombreTercero: '',
    Nit: '',
  });
  //reducer variables
  const user = useSelector(state => state.reducer.user);
  const path = useSelector(state => state.reducer.baseUrl);

  //location

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      Geolocation.getCurrentPosition(info => setLocation(info));
    });
    return unsubscribe;
  }, [navigation]);
  //functions
  const searchClient = value => {
    setShowSpinner(true);
    const requestOptions = {
      method: 'GET',
    };
    if (value !== undefined && value !== '') {
      fetch(path + '/client/search/' + value, requestOptions)
        .then(response => response.json())
        .then(data => {
          setShowSpinner(false);
          setClients(data);
        })
        .catch(error => {
          setShowSpinner(false);
          setClients([]);
        });
    } else {
      setClients([]);
    }
  };

  const renderClient = ({item}) => (
    <Card
      style={{borderWidth: 2, marginBottom: '5%'}}
      elevation={0.2}
      onPress={() => {
        setClient(item);
        setShowClients(false);
      }}>
      <Card.Title
        title={item.NombreTercero.toString()}
        subtitle={'N.I.T ' + item.Nit}
        left={props => (
          <Avatar.Icon
            {...props}
            color="white"
            style={{backgroundColor: 'green'}}
            icon="check"
          />
        )}
      />
      <Card.Content>
        <Text style={{textAlign: 'justify', fontSize: 10, marginBottom: '2%'}}>
          <Text style={{fontWeight: 'bold'}}>CONTACTO: </Text>
          {item.Contacto.trim()}
        </Text>
        <Text style={{textAlign: 'justify', fontSize: 10, marginBottom: '2%'}}>
          <Text style={{fontWeight: 'bold'}}>DEPARTAMENTO: </Text>
          {item.Dpto.trim()}
        </Text>
        <Text style={{textAlign: 'justify', fontSize: 10, marginBottom: '2%'}}>
          <Text style={{fontWeight: 'bold'}}>CIUDAD: </Text>
          {item.Ciudad.trim()}
        </Text>
        <Text style={{textAlign: 'justify', fontSize: 10, marginBottom: '2%'}}>
          <Text style={{fontWeight: 'bold'}}>DIRECCION: </Text>
          {item.Direccion.trim()}
        </Text>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView>
      <View style={styles.viewHorizontal}>
        <Button
          style={{width: '45%', marginLeft: '5%', marginRight: '2%'}}
          icon="account-search-outline"
          mode="contained"
          onPress={() => setShowClients(true)}>
          Buscar Cliente
        </Button>
        <Button
          style={{width: '45%', marginRight: '2%'}}
          icon="account-plus-outline"
          mode="contained"
          onPress={() => console.log('Pressed')}>
          Crear Cliente
        </Button>
      </View>
      <View style={{marginLeft: '5%', marginTop: '5%'}}>
        <Text style={styles.inputInfo}>
          <Text style={{fontWeight: 'bold'}}>NOMBRE: </Text>
          {client.NombreTercero.trim()}
        </Text>
        <Text style={styles.inputInfo}>
          <Text style={{fontWeight: 'bold'}}>N.I.T: </Text>
          {client.Nit.trim()}
        </Text>
        <Text style={styles.inputInfo}>
          <Text style={{fontWeight: 'bold'}}>DEPARTAMENTO: </Text>
          {client.Dpto.trim()}
        </Text>
        <Text style={styles.inputInfo}>
          <Text style={{fontWeight: 'bold'}}>CIUDAD: </Text>
          {client.Ciudad.trim()}
        </Text>
        <Text style={styles.inputInfo}>
          <Text style={{fontWeight: 'bold'}}>DIRECCION: </Text>
          {client.Direccion.trim()}
        </Text>
        <Text style={styles.inputInfo}>
          <Text style={{fontWeight: 'bold'}}>CONTACTO: </Text>
          {client.Contacto.trim()}
        </Text>
        <Text style={styles.inputInfo}>
          <Text style={{fontWeight: 'bold'}}>LOCATION: </Text>
          {JSON.stringify(location)}
        </Text>
      </View>

      <Portal>
        <Dialog
          visible={showClients}
          onDismiss={() => {
            () => setShowClients(false);
          }}>
          <Dialog.Title>Clientes</Dialog.Title>
          <Dialog.Content>
            <View style={{marginBottom: '5%'}}>
              <SearchBar
                style={{marginBottom: '5%'}}
                height={50}
                fontSize={15}
                iconColor="black"
                shadowColor="black"
                cancelIconColor="black"
                spinnerVisibility={showSpinner}
                placeholder="Buscar Cliente ..."
                fontFamily="BurbankBigCondensed-Black"
                onChangeText={value => searchClient(value)}
                onClearPress={() => setClients([])}
              />
              <FlatList
                showsVerticalScrollIndicator={false}
                data={clients}
                renderItem={renderClient}
                keyExtractor={(item, index) => '' + index}
              />
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowClients(false)}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: 'white',
    height: '100%',
  },
  inputInfo: {
    textAlign: 'justify',
    fontSize: 13,
    marginBottom: '2%',
  },
  viewHorizontal: {
    flexDirection: 'row',
    marginTop: '5%',
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

export default SanMarcosForm;
