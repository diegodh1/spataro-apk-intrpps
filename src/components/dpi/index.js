import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, SafeAreaView, FlatList} from 'react-native';
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
} from 'react-native-paper';
import {useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import { postLogin } from "../../actions/login";

const Dpi = ({navigation}) => {
  //local variables
  const [placas, setPlacas] = useState([]);
  const [placa, setPlaca] = useState('');
  const [showButton, setShowButton] = useState(false);
  const [itemsPlaca, setItemsPlaca] = useState([]);
  const [showItems, setShowItems] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [inputUbicacion, setInputUbicacion] = React.useState('');
  const [showInputCode, setShowInputCode] = React.useState(false);
  const [placaItem, setPlacaItem] = useState({Ubicacion: ''});
  const [visibleSuccess, setVisibleSuccess] = React.useState(false);

  //reducer variables
  const user = useSelector(state => state.reducer.user);
  const path = useSelector(state => state.reducer.baseUrl);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (user.AppUserName !== '') {
        getPlacas();
      }
    });
    return unsubscribe;
  }, [navigation]);

  //local functions
  const getPlacas = () => {
    const requestOptions = {
      method: 'GET',
    };
    let url = path + '/dpi/placas/CEDI';
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(JSON.stringify(data));
        setPlacas(data);
      })
      .catch(error => {
        setPlacas([]);
      });
  };

  const getHeaderPlaca = value => {
    setPlaca(value);
    setShowItems(true);
    const requestOptions = {
      method: 'GET',
    };
    let url = path + '/dpi/header/CEDI/' + value;
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => {
        setItemsPlaca(data);
        if (data.length === 0) {
          setShowButton(true);
          getPlacas();
        }
      })
      .catch(error => {
        setItemsPlaca([]);
        setShowItems(false);
      });
  };
  //validate ubicación
  const validateUbicationInput = () => {
    if (inputUbicacion == placaItem.DetdpiUbica.trim()) {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          DpiPlaca: placaItem.DpiPlaca,
          DetdpiBodega: placaItem.DetdpiBodega,
          Codigo: parseInt(placaItem.Codigo),
          UserAprueba: user.AppUserErpName,
        }),
      };
      fetch(path + '/dpi/item/approv', requestOptions)
        .then(response => response.json())
        .then(data => {
          if (data.status !== 200) {
            setMessage(data.message);
            setVisible(true);
          } else {
            setShowInputCode(false);
            getHeaderPlaca(placa);
            setVisibleSuccess(true);
            setMessage('Item ubicado con éxito');
          }
        })
        .catch(error => {
          setMessage('Error no se pudo generar el registro');
          setVisible(true);
        });
    } else {
      setMessage('La ubicación ingresada no corresponde a este item');
      setVisible(true);
    }
  };

  //cerrar vehiculo
  const closeVehicle = () => {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({Placa: placa.trim()}),
    };
    fetch(path + '/dpi/doc/approv', requestOptions)
      .then(response => response.json())
      .then(data => {
        setMessage(data.message);
        setVisibleSuccess(true);
        getPlacas();
      })
      .catch(error => {
        setMessage(error.message);
        setVisibleSuccess(true);
      });
  };
  //render placa
  const renderPlaca = ({item}) => (
    <Button
      style={{width: '60%', marginLeft: '20%'}}
      icon="car-arrow-right"
      mode="contained"
      onPress={() => getHeaderPlaca(item)}>
      {item}
    </Button>
  );

  //render item
  const renderItem = ({item}) => (
    <Card
      elevation={0.2}
      onPress={() => {
        setMessage('');
        setVisible(false);
        setShowInputCode(true);
        setPlacaItem(item);
      }}>
      <Card.Title
        title={item.Codigo}
        subtitle={item.DpiPlaca}
        left={props => (
          <Avatar.Icon
            {...props}
            color="white"
            style={{backgroundColor: '#efb810'}}
            icon="checkbox-marked-circle"
          />
        )}
      />
      <Card.Content>
        <Text style={{textAlign: 'justify', fontSize: 10, marginBottom: '2%'}}>
          <Text style={{color: '#efb810'}}>DESCRIPCIÓN: </Text>
          {item.Descripcion}
        </Text>
        <Text style={{textAlign: 'justify', fontSize: 10, marginBottom: '2%'}}>
          <Text style={{color: '#efb810'}}>TIPO MEDIDA: </Text>
          {item.Und}
        </Text>
        <Text style={{textAlign: 'justify', fontSize: 10, marginBottom: '2%'}}>
          <Text style={{color: '#efb810'}}>UBICACIÓN: </Text>
          {item.DetdpiUbica.trim()}
        </Text>
        <TextInput
          style={styles.textInput}
          mode="outlined"
          label="Cantidad"
          value={item.Cantidad.toString()}
          disabled={true}
          right={<TextInput.Icon name="check" color="black" />}
        />
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView>
      <View style={styles.rootContainer}>
        <FlatList
          style={styles.rootContainer}
          data={placas}
          renderItem={renderPlaca}
          keyExtractor={(item, index) => '' + index}
        />

        <Portal>
          <Dialog visible={showItems} onDismiss={() => setShowItems(false)}>
            <Dialog.Title>Lista de Items</Dialog.Title>
            <Dialog.ScrollArea style={{height: '86%'}}>
              <FlatList
                data={itemsPlaca}
                renderItem={renderItem}
                keyExtractor={(item, index) => '' + index}
              />
            </Dialog.ScrollArea>
            <Dialog.Actions style={{flexGrow: 1}}>
              {showButton ? (
                <Button
                  style={{marginRight: '5%'}}
                  color="green"
                  onPress={() => closeVehicle()}
                  mode="contained">
                  CERRAR VEHICULO
                </Button>
              ) : null}
              <Button onPress={() => setShowItems(false)} mode="contained">
                OK
              </Button>
            </Dialog.Actions>
          </Dialog>
          <Snackbar
            visible={visibleSuccess}
            style={styles.snackbar}
            onDismiss={() => setVisibleSuccess(false)}
            duration={2000}
            action={{
              label: 'OK',
              color: '#efb810',
              onPress: () => {
                setVisibleSuccess(false);
              },
            }}>
            {message}
          </Snackbar>
        </Portal>

        <Portal>
          <Dialog
            visible={showInputCode}
            onDismiss={() => setShowInputCode(false)}>
            <Dialog.Title>Validación de Ubicación</Dialog.Title>
            <Dialog.ScrollArea>
              <TextInput
                style={{marginBottom: '5%'}}
                autoFocus={true}
                mode="outlined"
                label="Ingresar Ubicación"
                onChangeText={value => setInputUbicacion(value)}
                right={<TextInput.Icon name="check" color="black" />}
              />
              {visible ? <Text style={{color: 'red'}}>{message}</Text> : null}
            </Dialog.ScrollArea>
            <Dialog.Actions style={{flexGrow: 1}}>
              <Button
                style={{marginRight: '5%'}}
                onPress={() => setShowInputCode(false)}
                mode="outlined">
                CANCELAR
              </Button>
              <Button onPress={() => validateUbicationInput()} mode="contained">
                UBICAR
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: 'white',
    height: '100%',
  },
});

export default Dpi;
