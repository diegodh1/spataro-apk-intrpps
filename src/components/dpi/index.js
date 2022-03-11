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
import {postLogin} from '../../actions/login';

const Dpi = ({navigation}) => {
  //local variables
  const [docs, setDocs] = useState([]);
  const [doc, setDoc] = useState('');
  const [showButton, setShowButton] = useState(false);
  const [itemsDoc, setItemsDoc] = useState([]);
  const [showItems, setShowItems] = React.useState(false);
  const [itemDoc, setItemDoc] = useState({DetdpiBarcode: ''});
  const [visibleError, setVisibleError] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [inputBarcode, setInputBarCode] = React.useState('');
  const [showInputCode, setShowInputCode] = React.useState(false);
  const [visibleSuccess, setVisibleSuccess] = React.useState(false);

  //reducer variables
  //reducer variables
  const [newUser, setNewUser] = useState('');
  //reducer
  const user = useSelector(state => state.reducer.user);
  const path = useSelector(state => state.reducer.baseUrl);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDpiDocs();
    });
    return unsubscribe;
  }, [user]);

  //local functions
  const getDpiDocs = () => {
    const requestOptions = {
      method: 'GET',
    };
    let url = path + '/dpi/docs/' + user.AppUserErpName;
    console.log(JSON.stringify(url));
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(JSON.stringify(data));
        setDocs(data);
      })
      .catch(error => {
        setDocs([]);
      });
  };

  const getDpiHeader = value => {
    setDoc(value);
    setShowButton(false);
    const requestOptions = {
      method: 'GET',
    };
    let url = path + '/dpi/header/' + value;
    console.log(JSON.stringify(url));
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(JSON.stringify(data));
        setItemsDoc(data);
        setShowItems(true);
        if (data.length === 0) {
          setShowButton(true);
        }
      })
      .catch(error => {
        setItemsDoc([]);
        alert(error);
      });
  };

  const validateBarcodeInput = () => {
    console.log(itemDoc);
    console.log(inputBarcode);
    if (inputBarcode == itemDoc.DetdpiBarcode) {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          DpiDocAgrupa: itemDoc.DpiDocAgrupa,
          DetdpiBarcode: itemDoc.DetdpiBarcode,
          CantReq: itemDoc.Cantidad,
          UserAprueba: user.AppUserErpName,
        }),
      };

      console.log(
        JSON.stringify({
          DpiDocAgrupa: itemDoc.DpiDocAgrupa,
          DetdpiBarcode: itemDoc.DetdpiBarcode,
          CantReq: itemDoc.Cantidad,
          UserAprueba: user.AppUserErpName,
        }),
      );
      fetch(path + '/dpi/item/approv', requestOptions)
        .then(response => response.json())
        .then(data => {
          if (data.status !== 200) {
            setMessage(data.message);
            setVisible(true);
          } else {
            setShowInputCode(false);
            setVisibleSuccess(true);
            setMessage('Item registrado con éxito');
            getDpiHeader(doc);
          }
        })
        .catch(error => {
          setMessage('Error no se pudo generar el registro');
          setVisible(true);
        });
    } else {
      setMessage('El código de barras no corresponde a este item');
      setVisible(true);
    }
  };

  const closeDocument = () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        DpiDocAgrupa: itemDoc.DpiDocAgrupa,
        UserAprueba: user.AppUserErpName,
      }),
    };

    console.log(
      JSON.stringify({
        DpiDocAgrupa: itemDoc.DpiDocAgrupa,
        UserAprueba: user.AppUserErpName,
      }),
    );

    fetch(path + '/dpi/doc/approv', requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.status !== 200) {
          setVisible(true);
          setMessage(data.message);
        } else {
          setShowItems(false);
          setShowButton(false);
          setVisible(true);
          setMessage(data.message);
          getDpiDocs(doc);
        }
      })
      .catch(error => {
        setMessage('Error no se pudo generar el registro');
        setVisible(true);
      });
  };

  //render placa
  const renderDoc = ({item}) => (
    <View style={{marginTop: '5%'}}>
      <Button
        style={{width: '60%', marginLeft: '20%'}}
        icon="cart-arrow-down"
        mode="contained"
        onPress={() => getDpiHeader(item)}>
        {item}
      </Button>
    </View>
  );

  //render item
  const renderItem = ({item}) => (
    <Card
      elevation={0.2}
      onPress={() => {
        setMessage('');
        setVisible(false);
        setShowInputCode(true);
        setItemDoc(item);
      }}>
      <Card.Title
        title={item.Codigo}
        subtitle={item.DetdpiBarcode}
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
          <Text style={{color: '#efb810'}}>PESO: </Text>
          {item.Peso}
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
          data={docs}
          renderItem={renderDoc}
          keyExtractor={(item, index) => '' + index}
        />

        <Portal>
          <Dialog visible={showItems} onDismiss={() => setShowItems(false)}>
            <Dialog.Title>Lista de Items</Dialog.Title>
            <Dialog.ScrollArea style={{height: '86%'}}>
              <FlatList
                data={itemsDoc}
                renderItem={renderItem}
                keyExtractor={(item, index) => '' + index}
              />
              <Snackbar
                visible={visible}
                style={styles.snackbar}
                onDismiss={() => setVisible(false)}
                duration={2000}
                action={{
                  label: 'OK',
                  color: '#efb810',
                  onPress: () => {
                    setVisible(false);
                  },
                }}>
                {message}
              </Snackbar>
            </Dialog.ScrollArea>
            <Dialog.Actions style={{flexGrow: 1}}>
              {showButton ? (
                <Button
                  style={{marginRight: '5%'}}
                  color="green"
                  onPress={() => closeDocument()}
                  mode="contained">
                  CERRAR ORDEN
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
            <Dialog.Title>Validación de Código de barras</Dialog.Title>
            <Dialog.ScrollArea>
              <TextInput
                style={{marginBottom: '5%'}}
                autoFocus={true}
                mode="outlined"
                label="Ingresar Código de barras"
                onChangeText={value => setInputBarCode(value)}
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
              <Button onPress={() => validateBarcodeInput()} mode="contained">
                REALIZAR
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
