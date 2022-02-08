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

const Order = ({navigation}) => {
  //local variables
  const [orders, setOrders] = useState([]);
  const isFocused = useIsFocused();
  const [visible, setVisible] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [visibleSuccess, setVisibleSuccess] = React.useState(false);
  const [visibleError, setVisibleError] = React.useState(false);
  const [showItems, setShowItems] = React.useState(false);
  const [inputUbicacion, setInputUbicacion] = React.useState('');
  const [orderItems, setOrderItems] = useState([]);
  const [orderItem, setOrderItem] = useState({Ubicacion: ''});
  const [orderId, setOrderId] = useState('');
  const [showInputCode, setShowInputCode] = React.useState(false);

  //reducer variables
  const user = useSelector(state => state.reducer.user);
  const path = useSelector(state => state.reducer.baseUrl);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (user.AppUserName !== '') {
        getOrders('OC');
      }
    });
    return unsubscribe;
  }, [navigation]);

  //local functions
  const getOrders = value => {
    const requestOptions = {
      method: 'GET',
    };
    let url = path + '/order/ubi/getAll';
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(JSON.stringify(data));
        setOrders(data);
      })
      .catch(error => {
        setOrders([]);
      });
  };

  const getItemsOrders = value => {
    setOrderId(value.CodOrden);
    const requestOptions = {
      method: 'GET',
    };
    let url = path + `/order/items/${value.CodOrden}/${value.F850Rowid}/ubi`;
    console.log(url);
    let index = 0;
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => {
        data.forEach(element => {
          element.Index = index;
          element.Selected = false;
          index++;
        });
        setOrderItems(data);
        setShowItems(true);
        if (data.length === 0) {
          getOrders('OC');
        }
      })
      .catch(error => {
        setOrderItems([]);
        console.log(error);
      });
  };

  const validateUbicationInput = () => {
    console.log(orderItem);
    console.log(inputUbicacion);
    if (inputUbicacion == orderItem.Ubicacion) {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          OrdenID: orderItem.CodOrden,
          CodItem: orderItem.CodItem,
          F850Rowid: orderItem.F850Rowid,
          F851Rowid: orderItem.F851Rowid,
          Ubicacion: orderItem.Ubicacion,
        }),
      };
      fetch(path + '/order/ingress/ubi', requestOptions)
        .then(response => response.json())
        .then(data => {
          if (data.status !== 200) {
            setMessage(data.message);
            setVisible(true);
          } else {
            setShowInputCode(false);
            setVisibleSuccess(true);
            setMessage('Item ubicado con éxito');
            getItemsOrders(orderItem);
          }
        })
        .catch(error => {
          setMessage('Error no se pudo generar el registro');
          setVisibleError(true);
        });
    } else {
      setMessage('La ubicación ingresada no corresponde a este item');
      setVisibleError(true);
    }
  };

  //render components
  //render item order component
  const renderOrder = ({item}) => (
    <Card elevation={0.2} onPress={() => getItemsOrders(item, item.Index)}>
      <Card.Title
        titleStyle={{fontSize: 25}}
        title={item.CodOrden}
        subtitle={item.TipoOrden}
        left={props => (
          <Avatar.Icon
            {...props}
            color="white"
            style={{backgroundColor: '#d3a000'}}
            icon="gesture-tap"
          />
        )}
      />
    </Card>
  );
  //render order's items
  const renderItem = ({item}) => (
    <Card
      elevation={0.2}
      onPress={() => {
        setShowInputCode(true);
        setOrderItem(item);
        setVisible(false);
        setMessage('');
        console.log(JSON.stringify(item));
      }}>
      <Card.Title
        title={item.Referencia}
        subtitle={item.TipoOrden}
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
          <Text style={{color: '#efb810'}}>TIPO UNIDAD: </Text>
          {item.UnidadMedida}
        </Text>
        <Text style={{textAlign: 'justify', fontSize: 10, marginBottom: '2%'}}>
          <Text style={{color: '#efb810'}}>Ext 1: </Text>
          {item.Ext1}
        </Text>
        <Text style={{textAlign: 'justify', fontSize: 10, marginBottom: '2%'}}>
          <Text style={{color: '#efb810'}}>Ext 2: </Text>
          {item.Ext2}
        </Text>
        <Text style={{textAlign: 'justify', fontSize: 10, marginBottom: '2%'}}>
          <Text style={{color: '#efb810'}}>Ubicación: </Text>
          {item.Ubicacion}
        </Text>
        <TextInput
          style={styles.textInput}
          mode="outlined"
          label="Entradas"
          value={item.Entradas.toString()}
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
          data={orders}
          renderItem={renderOrder}
          keyExtractor={(item, index) => '' + index}
        />
        <Portal>
          <Dialog visible={showItems} onDismiss={() => setShowItems(false)}>
            <Dialog.Title>Lista de Items</Dialog.Title>
            <Dialog.ScrollArea style={{height: '86%'}}>
              <FlatList
                data={orderItems}
                renderItem={renderItem}
                keyExtractor={(item, index) => '' + index}
              />
            </Dialog.ScrollArea>
            <Dialog.Actions style={{flexGrow: 1}}>
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
              {visibleError ? <Text style={{color: 'red'}}>{message}</Text> : null}
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

export default Order;
