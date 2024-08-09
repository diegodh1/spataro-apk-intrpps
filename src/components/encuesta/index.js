import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  FlatList,
  Dimensions,
  Platform,
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
} from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { Picker } from '@react-native-picker/picker';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import Feather from 'react-native-vector-icons/Feather';
import { color } from "react-native-reanimated";

const Encuesta = ({ navigation }) => {
  //local variables
  const [visible, setVisible] = React.useState(false);
  const [showItems, setShowItems] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [tipoDoc, setTipoDoc] = React.useState('');
  const [nit, setNit] = React.useState('');
  const [etiqueta, setEtiqueta] = React.useState('');
  const etiquetaRef = useRef(null);
  const [ubicacionEntra, setUbicacionEntra] = React.useState('');
  const ubicacionEntraRef = useRef(null);
  const [ubicacionSale, setUbicacionSale] = React.useState('');
  const ubicacionSaleRef = useRef(null);
  const [cantidad, setCantidad] = React.useState('');
  const cantidadRef = useRef(null);
  const [nits, setNits] = React.useState([]);
  const [documentos, setDocumentos] = React.useState([]);
  const [trasalados, setTraslados] = React.useState([]);
  const [loading, setLoading] = useState(false);
  //reducer variables
  //reducer variables
  //reducer
  const user = useSelector(state => state.reducer.user);
  const path = useSelector(state => state.reducer.baseUrl);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('hola mundo');
      getDocsType();
    });
    return unsubscribe;
  }, [user]);

  const onOpenSuggestionsList = useCallback(isOpened => { }, []);

  const getDocsType = () => {
    const requestOptions = {
      method: 'GET',
    };
    let url = path + '/documento/tipo';
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setDocumentos(data);
      })
      .catch(error => {
        setDocumentos([]);
      });
  };

  const getNits = value => {
    setNits([]);
    setLoading(true);
    const requestOptions = {
      method: 'GET',
    };
    let url = path + '/cliente/nit/' + value;
    console.log(JSON.stringify(url));
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => {
        let temp = data.map(item => ({
          id: item,
          title: item,
        }));
        setNits(temp);
        setLoading(false);
      })
      .catch(error => {
        setNits([]);
        setLoading(false);
      });
  };

  const deleteItem = (index) => {
    let newTraslados = trasalados
    newTraslados.splice(index, 1);
    setTraslados(newTraslados);
    setShowItems(false)
  }


  const addNewItemTraslados = () => {
    console.log(tipoDoc);
    if (tipoDoc == '') {
      setMessage('Error el tipo de documento no puede estar vacio');
      setVisible(true);
    } else if (etiqueta == '') {
      setMessage('Error la etiqueta no puede estar vacia');
      setVisible(true);
    } else if (tipoDoc == "RQI" && ubicacionSale == '') {
      setMessage('Error la ubicación sale no puede estar vacia');
      setVisible(true);
    }
    else if (tipoDoc == "TRI" && ubicacionEntra == '' && ubicacionSale == '') {
      setMessage('Error la ubicación entra/sale no puede estar vacia');
      setVisible(true);
    }
    else if (tipoDoc == "INV" && ubicacionEntra == '') {
      setMessage('Error la ubicación entra no puede estar vacia');
      setVisible(true);
    }
    else if (cantidad == '' || isNaN(cantidad)) {
      setMessage('Error la cantidad debe ser un valor valido numérico');
      setVisible(true);
    } else {
      let newTraslados = trasalados
      newTraslados.push({
        UbicacionSale: ubicacionSale,
        Etiqueta: etiqueta,
        Cantidad: parseInt(cantidad),
        UbicacionEntra: ubicacionEntra,
      });
      setCantidad('');
      setEtiqueta('');
      setTraslados(newTraslados);
      console.log(JSON.stringify(newTraslados));
    }
  }
  const submit = () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Usuario: user.AppUserErpName,
        Nit: nit,
        TipoDoc: tipoDoc,
        Detalle: trasalados,
      }),
    };
    console.log(
      JSON.stringify({
        Usuario: user.AppUserErpName,
        Nit: nit,
        TipoDoc: tipoDoc,
        Detalle: trasalados,
      }),
    );
    fetch(path + '/documento/add', requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(JSON.stringify(data));
        if (data.status === 201) {
          setUbicacionSale('');
          setTraslados([]);
          setCantidad('');
          setEtiqueta('');
          setUbicacionEntra('');
          setNit('');
          setNits([]);
          etiquetaRef.current.value = '';
          console.log(data);
          setMessage('Registro realizado con éxito');
        } else {
          setMessage(data.message);
        }
        setVisible(true);
      })
      .catch(error => {
        setMessage('Error no se pudo generar el registro');
        setVisible(true);
      });
  };

  //render item
  const renderItem = ({item, index}) => (
    <Card elevation={0.2}>
      <Card.Title
        title={item.Etiqueta}
        left={props => (
          <Avatar.Icon
            {...props}
            color="black"
            icon="pencil"
          />
        )}
      />
      <Card.Content>
        <Text style={{textAlign: 'justify', fontSize: 10, marginBottom: '2%'}}>
          <Text style={{color: '#efb810'}}>Cantidad: </Text>
          <Text style={{color: 'black'}}>{item.Cantidad}</Text>
        </Text>
        <Text style={{textAlign: 'justify', fontSize: 10, marginBottom: '2%'}}>
          <Text style={{color: '#efb810'}}>Ubicación Entra: </Text>
          <Text style={{color: 'black'}}>{item.UbicacionEntra}</Text>
        </Text>
        <Text style={{textAlign: 'justify', fontSize: 10, marginBottom: '2%'}}>
          <Text style={{color: '#efb810'}}>Ubicación Sale:  </Text>
          <Text style={{color: 'black'}}>{item.UbicacionSale}</Text>
        </Text>
        <Button
          style={{width: '80%', marginLeft: '5%'}}
          icon="cancel"
          mode="outline"
          onPress={() => deleteItem(index)}>
          Eliminar
      </Button>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView>
      <View style={styles.rootContainer}>
        <View style={styles.picker}>
          <Picker
            selectedValue={tipoDoc}
            style={{
              height: 50,
              width: '100%',
            }}
            mode={'dropdown'}
            onValueChange={(itemValue, itemIndex) => setTipoDoc(itemValue)}>
            <Picker.Item label="Seleccionar Tipo Documento" value="" />
            {documentos.map(element => (
              <Picker.Item
                key={element.IdTipoDoc}
                label={element.NombreDoc}
                value={element.TipoDoc}
              />
            ))}
          </Picker>
        </View>
        <AutocompleteDropdown
          // initialValue={'1'}
          containerStyle={{
            marginTop: '5%',
            marginRight: '5%',
            marginLeft: '5%',
          }}
          direction={Platform.select({ ios: 'down' })}
          clearOnFocus={false}
          closeOnBlur={true}
          onOpenSuggestionsList={onOpenSuggestionsList}
          closeOnSubmit={false}
          initialValue={{ id: '-1' }}
          dataSet={nits}
          onChangeText={getNits}
          onSelectItem={item => {
            item && setNit(item.id);
          }}
          debounce={600}
          loading={loading}
          suggestionsListMaxHeight={Dimensions.get('window').height * 0.4}
          ChevronIconComponent={
            <Feather name="chevron-down" size={20} color="#fff" />
          }
          textInputProps={{
            placeholder: 'Seleccionar Nit...',
            autoCorrect: false,
            autoCapitalize: 'none',
            style: {
              backgroundColor: 'white',
              color: 'black',
              paddingLeft: 10,
              marginRight: '5%',
            },
          }}
        />
        <TextInput
          style={styles.textInput}
          mode="outlined"
          label={'Etiqueta'}
          ref={etiquetaRef}
          autoFocus={true}
          value={etiqueta}
          onChangeText={value => setEtiqueta(value)}
          right={<TextInput.Icon name="pencil-outline" color="black" />}
        />
        <TextInput
          style={styles.textInput}
          mode="outlined"
          ref={cantidadRef}
          value={cantidad}
          label={'Cantidad'}
          keyboardType={'numeric'}
          onChangeText={value => setCantidad(value)}
          right={<TextInput.Icon name="pencil-outline" color="black" />}
        />
        <TextInput
          style={styles.textInput}
          mode="outlined"
          value={ubicacionEntra}
          label={'Ubicación Entra'}
          ref={ubicacionEntraRef}
          onChangeText={value => setUbicacionEntra(value)}
          right={<TextInput.Icon name="pencil-outline" color="black" />}
        />
        <TextInput
          style={styles.textInput}
          mode="outlined"
          value={ubicacionSale}
          label={'Ubicación Sale'}
          ref={ubicacionSaleRef}
          onChangeText={value => setUbicacionSale(value)}
          right={<TextInput.Icon name="pencil-outline" color="black" />}
        />
        <Button
          style={{ ...styles.button, marginBottom: '2%' }}
          contentStyle={styles.buttonDirection}
          mode="contained"
          onPress={() => addNewItemTraslados()}>
          AGREGAR
        </Button>
        <Button
          style={{ ...styles.button, marginBottom: '2%', backgroundColor:'orange' }}
          contentStyle={styles.buttonDirection}
          mode="contained"
          onPress={() => setShowItems(true)}>
          MOSTRAR TRASLADOS
        </Button>
        <Button
          style={{ ...styles.button, marginBottom: '15%', backgroundColor:'#40CC3A' }}
          contentStyle={styles.buttonDirection}
          icon="check"
          mode="contained"
          onPress={() => submit()}>
          FINALIZAR
        </Button>

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
        

        <Portal>
          <Dialog visible={showItems} onDismiss={() => setShowItems(false)}>
            <Dialog.Title>Lista de Items</Dialog.Title>
            <Dialog.ScrollArea style={{height: '86%'}}>
              <FlatList
                data={trasalados}
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
              <Button onPress={() => setShowItems(false)} mode="contained">
                CERRAR
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textInput: {
    marginTop: '2%',
    marginLeft: '5%',
    marginRight: '5%',
    backgroundColor: 'white',
  },
  snackbar: {
    backgroundColor: '#2C3E50',
  },
  button: {
    marginTop: '5%',
    marginRight: '5%',
    marginLeft: '5%',
  },
  rootContainer: {
    backgroundColor: 'white',
    height: '100%',
  },
  fabRight: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  fabLeft: {
    position: 'absolute',
    margin: 16,
    left: 0,
    bottom: 0,
  },
  picker: {
    marginTop: '5%',
    borderWidth: 1,
    marginLeft: '5%',
    marginRight: '5%',
  },
});

export default Encuesta;
