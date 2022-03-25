import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  FlatList,
  ScrollView,
} from 'react-native';
import {
  Text,
  Button,
  Portal,
  Dialog,
  Card,
  Avatar,
  DataTable,
  IconButton,
  TextInput,
  Switch,
  Snackbar,
  FAB,
} from 'react-native-paper';
import {useSelector} from 'react-redux';
import moment from 'moment';
import SearchBar from 'react-native-dynamic-search-bar';
import Geolocation from '@react-native-community/geolocation';
import {Picker} from '@react-native-community/picker';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import {zonas} from './zonas';
import base64 from 'react-native-base64';

const SanMarcosForm = ({navigation}) => {
  const [showClients, setShowClients] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [showAddProveedor, setShowAddProveedor] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showProveedores, setShowProveedores] = useState(false);
  const [vendeCemento, setVendeCemento] = useState(false);
  const [virgen, setVirgen] = useState(false);
  const [fachadaCsm, setFachadaCsm] = useState(false);
  const [panaflex, setPanaFlex] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState(false);
  const [location, setLocation] = useState({});
  const [today, setToday] = useState(new Date());
  const [barrido, setBarrido] = useState('');
  const [encuestas, setEncuestas] = useState([]);
  const [microzona, setMicroZona] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [direccion, setDireccion] = useState('');
  const [nombre, setNombre] = useState('');
  const [barrio, setBarrio] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [contacto, setContacto] = useState('');
  const [telefono, setTelefono] = useState('');
  //proveedor
  const [proveedor, setProveedor] = useState('');
  const [marcaProveedor, setMarcaProveedor] = useState('');
  const [volumenCompra, setVolumenCompra] = useState('');
  const [volumenVenta, setVolumenVenta] = useState('');
  const [precioCompra, setPrecioCompra] = useState('');
  const [precioVenta, setPrecioVenta] = useState('');
  const [comentarios, setComentarios] = useState('');
  const [modalidadEntrega, setModalidadEntrega] = useState('');
  const [encuesta, setEncuesta] = useState({
    encuestaId: -1,
    encuestador: '',
    fecha: '',
    ciudad: '',
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
  const searchForm = value => {
    setShowSpinner(true);
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + base64.encode('omnilatam:OmniL$232'),
      },
    };
    console.log('http://192.168.101.11:8080' + '/encuesta?text=' + value);
    if (value !== undefined && value !== '') {
      fetch(
        'http://192.168.101.11:8080' + '/encuesta?text=' + value,
        requestOptions,
      )
        .then(response => response.json())
        .then(data => {
          setShowSpinner(false);
          setEncuestas(data.encuestas);
        })
        .catch(error => {
          setShowSpinner(false);
          setEncuestas([]);
        });
    } else {
      setEncuestas([]);
    }
  };

  const getAllProveedores = value => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + base64.encode('omnilatam:OmniL$232'),
      },
    };
    console.log(
      'http://192.168.101.11:8080' + '/encuesta/proveedor?encuesta=' + value,
    );
    if (value !== undefined && value !== '') {
      fetch(
        'http://192.168.101.11:8080' + '/encuesta/proveedor?encuesta=' + value,
        requestOptions,
      )
        .then(response => response.json())
        .then(data => {
          setProveedores(data);
        })
        .catch(error => {
          setProveedores([]);
        });
    } else {
      setProveedores([]);
    }
  };

  const save = () => {
    let body = {
      encuestador: user.AppUserErpName,
      barrido: barrido,
      microzona: microzona,
      nombre: nombre,
      departamento: departamento,
      ciudad: ciudad,
      barrio: barrio,
      direccion: direccion,
      contacto: contacto,
      telefono: telefono,
      latitud: location.coords !== undefined ? location.coords.latitude : 0.0,
      longitud: location.coords !== undefined ? location.coords.longitude : 0.0,
      vendeCemento: vendeCemento,
      fachadaCsm: fachadaCsm,
      panaflex: panaflex,
      proveedores: proveedores,
    };
    if (barrido === undefined || barrido === '') {
      setShowMessage(true);
      setMessage('El barrido no puede estar vacio');
    } else if (microzona === undefined || microzona === '') {
      setShowMessage(true);
      setMessage('La microzona no puede estar vacia');
    } else if (nombre === undefined || nombre === '') {
      setShowMessage(true);
      setMessage('El nombre no puede estar vacio');
    } else {
      requestSave(body);
    }
  };

  const requestSave = body => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + base64.encode('omnilatam:OmniL$232'),
      },
      body: JSON.stringify(body),
    };
    console.log('Basic ' + base64.encode('omnilatam:OmniL$232'));
    console.log(JSON.stringify(body));
    fetch('http://192.168.101.11:8080' + '/encuesta', requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(JSON.stringify(data));
        setVendeCemento(false);
        setVirgen(false);
        setFachadaCsm(false);
        setPanaFlex(false);
        setBarrido('');
        setProveedores([]);
        setDireccion('');
        setNombre('');
        setBarrio('');
        setContacto('');
        setTelefono('');
        setShowMessage(true);
        setMessage('Registro realizado');
      })
      .catch(error => {
        setShowMessage(true);
        setMessage('Error al registrar información');
      });
  };

  const addProveedor = () => {
    if (proveedor === undefined || proveedor === '') {
      setMessage('El proveedor no puede estar vacio');
      setShowMessage(true);
    } else if (marcaProveedor === undefined || marcaProveedor === '') {
      setMessage('La marca de proveedor no puede estar vacia');
      setShowMessage(true);
    } else if (
      volumenCompra === undefined ||
      isNaN(parseFloat(volumenCompra))
    ) {
      setMessage('Volumen Compra debe ser numérico');
      setShowMessage(true);
    } else if (volumenVenta === undefined || isNaN(parseFloat(volumenVenta))) {
      setMessage('Volumen Venta debe ser numérico');
      setShowMessage(true);
    } else if (precioCompra === undefined || isNaN(parseFloat(precioCompra))) {
      setMessage('Precio Compra debe ser numérico');
      setShowMessage(true);
    } else if (precioVenta === undefined || isNaN(parseFloat(precioVenta))) {
      setMessage('Precio Venta debe ser numérico');
      setShowMessage(true);
    } else if (modalidadEntrega === undefined || modalidadEntrega === '') {
      setMessage('modalidad de entrega no puede estar vacia');
      setShowMessage(true);
    } else {
      setShowAddProveedor(false);
      let newProveedores = proveedores;
      newProveedores.push({
        proveedor: proveedor,
        marcaProveedor: marcaProveedor,
        volumenCompra: parseFloat(volumenCompra),
        volumenVenta: parseFloat(volumenVenta),
        precioCompra: parseFloat(precioCompra),
        precioVenta: parseFloat(precioVenta),
        comentarios: comentarios,
        modalidadEntrega: modalidadEntrega,
      });
      setProveedor('');
      setMarcaProveedor('');
      setVolumenCompra('');
      setVolumenVenta('');
      setPrecioCompra('');
      setPrecioVenta('');
      setComentarios('');
      setModalidadEntrega('');
      setProveedores(newProveedores);
    }
  };

  const renderEncuesta = ({item}) => (
    <Card
      style={{borderWidth: 2, marginBottom: '5%'}}
      elevation={0.2}
      onPress={() => {
        setEncuesta(item);
        setNombre(item.nombre);
        setCiudad(item.ciudad);
        console.log(item.ciudad)
        setDepartamento(item.departamento);
        setBarrio(item.barrio);
        setMicroZona(item.microzona);
        setNombre(item.nombre);
        setDireccion(item.direccion);
        setContacto(item.contacto);
        setTelefono(item.telefono);
        setVendeCemento(item.vendeCemento);
        setFachadaCsm(item.fachadaCsm);
        setPanaFlex(item.panaflex);
        setShowClients(false);
        getAllProveedores(item.encuestaId);
      }}>
      <Card.Title
        title={item.encuestaId.toString()}
        subtitle={item.nombre}
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
          <Text style={{fontWeight: 'bold'}}>Fecha: </Text>
          {moment(item.fecha).format('DD-MM-YYYY')}
        </Text>
        <Text style={{textAlign: 'justify', fontSize: 10, marginBottom: '2%'}}>
          <Text style={{fontWeight: 'bold'}}>Microzona: </Text>
          {item.microzona.trim()}
        </Text>
        <Text style={{textAlign: 'justify', fontSize: 10, marginBottom: '2%'}}>
          <Text style={{fontWeight: 'bold'}}>Ciudad: </Text>
          {item.ciudad.trim()}
        </Text>
        <Text style={{textAlign: 'justify', fontSize: 10, marginBottom: '2%'}}>
          <Text style={{fontWeight: 'bold'}}>Barrio: </Text>
          {item.barrio.trim()}
        </Text>
        <Text style={{textAlign: 'justify', fontSize: 10, marginBottom: '2%'}}>
          <Text style={{fontWeight: 'bold'}}>Dirección: </Text>
          {item.direccion.trim()}
        </Text>
        <Text style={{textAlign: 'justify', fontSize: 10, marginBottom: '2%'}}>
          <Text style={{fontWeight: 'bold'}}>Contacto: </Text>
          {item.contacto.trim()}
        </Text>
        <Text style={{textAlign: 'justify', fontSize: 10, marginBottom: '2%'}}>
          <Text style={{fontWeight: 'bold'}}>telefono: </Text>
          {item.telefono.trim()}
        </Text>
      </Card.Content>
    </Card>
  );

  const renderProveedor = ({item, index}) => (
    <Card
      style={{borderWidth: 2, marginBottom: '5%'}}
      elevation={0.2}
      onPress={() => {
        console.log(item);
      }}>
      <Card.Title
        title={item.proveedor}
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
          <Text style={{fontWeight: 'bold'}}>MARCA: </Text>
          {item.marcaProveedor}
        </Text>
        <Text style={{textAlign: 'justify', fontSize: 10, marginBottom: '2%'}}>
          <Text style={{fontWeight: 'bold'}}>VOLUMEN COMPRA: </Text>
          {item.volumenCompra.toString()}
        </Text>
        <Text style={{textAlign: 'justify', fontSize: 10, marginBottom: '2%'}}>
          <Text style={{fontWeight: 'bold'}}>VOLUMEN VENTA: </Text>
          {item.volumenVenta.toString()}
        </Text>
        <Text style={{textAlign: 'justify', fontSize: 10, marginBottom: '2%'}}>
          <Text style={{fontWeight: 'bold'}}>PRECIO COMPRA: </Text>
          {item.precioCompra.toString()}
        </Text>
        <Text style={{textAlign: 'justify', fontSize: 10, marginBottom: '2%'}}>
          <Text style={{fontWeight: 'bold'}}>PRECIO VENTA: </Text>
          {item.precioVenta.toString()}
        </Text>
        <Text style={{textAlign: 'justify', fontSize: 10, marginBottom: '2%'}}>
          <Text style={{fontWeight: 'bold'}}>MODALIDAD ENTREGA: </Text>
          {item.modalidadEntrega}
        </Text>
        <Text style={{textAlign: 'justify', fontSize: 10, marginBottom: '2%'}}>
          <Text style={{fontWeight: 'bold'}}>COMENTARIOS: </Text>
          {item.comentarios}
        </Text>
        <Button
          style={{marginBottom: '5%', backgroundColor: 'red'}}
          mode="contained"
          onPress={() => {
            let newProveedores = proveedores;
            newProveedores.splice(index, 1);
            setProveedores(newProveedores);
            setLoading(true);
            setTimeout(function () {
              setLoading(false);
            }, 1000);
          }}>
          <Text style={{color: 'white'}}>Eliminar</Text>
        </Button>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.viewHorizontal}>
          <Button
            style={{width: '45%', marginLeft: '5%', marginRight: '2%'}}
            icon="magnify"
            mode="contained"
            onPress={() => setShowClients(true)}>
            Buscar
          </Button>
          <Button
            style={{width: '45%', marginRight: '2%'}}
            icon="clipboard-check-outline"
            mode="contained"
            onPress={() => save()}>
            Guardar
          </Button>
        </View>
        <View style={{marginLeft: '5%', marginTop: '5%', marginRight: '5%'}}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Encuestador</DataTable.Title>
              <DataTable.Title>Fecha</DataTable.Title>
            </DataTable.Header>

            <DataTable.Row>
              <DataTable.Cell>{user.AppUserErpName}</DataTable.Cell>
              <DataTable.Cell>
                {moment(today).format('DD-MM-YYYY')}
              </DataTable.Cell>
            </DataTable.Row>
          </DataTable>

          <View style={styles.picker}>
            <Picker
              selectedValue={barrido}
              style={{
                height: 40,
                width: '100%',
              }}
              mode={'dropdown'}
              onValueChange={(itemValue, itemIndex) => setBarrido(itemValue)}>
              <Picker.Item label="Barrido" value="" />
              <Picker.Item label="Visita" value="Visita" />
              <Picker.Item label="Otro" value="Otro" />
            </Picker>
          </View>
          <Collapse>
            <CollapseHeader>
              <View
                style={{
                  ...styles.viewHorizontal,
                  backgroundColor: '#E8E8E8',
                  padding: 8,
                  borderWidth: 1,
                  borderTopLeftRadius: 5,
                  borderTopRightRadius: 5,
                  borderBottomRightRadius: 5,
                  borderBottomLeftRadius: 5,
                  marginBottom: '5%',
                }}>
                <Avatar.Icon
                  style={{marginRight: '5%'}}
                  size={28}
                  icon="home-outline"
                />
                <Text style={{fontSize: 16, marginRight: '15%'}}>
                  Información del Establecimiento
                </Text>
              </View>
            </CollapseHeader>
            <CollapseBody>
              <View style={styles.picker}>
                <Picker
                  selectedValue={microzona}
                  style={{
                    height: 45,
                    width: '100%',
                  }}
                  mode={'dropdown'}
                  onValueChange={(itemValue, itemIndex) =>
                    setMicroZona(itemValue)
                  }>
                  <Picker.Item label="Micro Zona" value="" />
                  {zonas.map(zona => (
                    <Picker.Item
                      key={zona.id}
                      label={zona.departamento}
                      value={zona.departamento}
                    />
                  ))}
                </Picker>
              </View>
              <TextInput
                style={styles.textInput}
                mode="outlined"
                label={
                  nombre === undefined || nombre === '' ? 'Nombre' : nombre
                }
                onChangeText={value => setNombre(value)}
                right={<TextInput.Icon name="pencil-outline" color="black" />}
              />
              <View style={{...styles.picker, marginTop: '5%'}}>
                <Picker
                  selectedValue={departamento}
                  style={{
                    height: 45,
                    width: '100%',
                  }}
                  mode={'dropdown'}
                  onValueChange={(itemValue, itemIndex) => {
                    setDepartamento(itemValue);
                    let departamento = zonas.find(function (zona) {
                      return zona.departamento === itemValue;
                    });
                    if (departamento !== undefined) {
                      setCiudades(departamento.ciudades);
                    } else {
                      setCiudades([]);
                    }
                  }}>
                  <Picker.Item label="Departamento" value="" />
                  {zonas.map(zona => (
                    <Picker.Item
                      key={zona.id}
                      label={zona.departamento}
                      value={zona.departamento}
                    />
                  ))}
                </Picker>
              </View>
              <View style={{...styles.picker, marginTop: '5%'}}>
                <Picker
                  selectedValue={ciudad}
                  style={{
                    height: 45,
                    width: '100%',
                  }}
                  mode={'dropdown'}
                  onValueChange={(itemValue, itemIndex) =>
                    setCiudad(itemValue)
                  }>
                  <Picker.Item label={encuesta.ciudad === '' ? 'Ciudad': encuesta.ciudad} value="" />
                  {ciudades.map((ciudad, index) => (
                    <Picker.Item key={index} label={ciudad} value={ciudad} />
                  ))}
                </Picker>
              </View>
              <TextInput
                style={styles.textInput}
                mode="outlined"
                label={
                  barrio === undefined || barrio === '' ? 'Barrio' : barrio
                }
                onChangeText={value => setBarrio(value)}
                right={<TextInput.Icon name="pencil-outline" color="black" />}
              />
              <TextInput
                style={styles.textInput}
                mode="outlined"
                label={
                  direccion === undefined || direccion === ''
                    ? 'Dirección'
                    : direccion
                }
                onChangeText={value => setDireccion(value)}
                right={<TextInput.Icon name="pencil-outline" color="black" />}
              />
              <TextInput
                style={styles.textInput}
                mode="outlined"
                label={
                  contacto === undefined || contacto === ''
                    ? 'Contacto'
                    : contacto
                }
                onChangeText={value => setContacto(value)}
                right={<TextInput.Icon name="pencil-outline" color="black" />}
              />
              <TextInput
                style={{...styles.textInput, marginBottom: '5%'}}
                mode="outlined"
                label={
                  telefono === undefined || telefono === ''
                    ? 'Teléfono'
                    : telefono
                }
                onChangeText={value => setTelefono(value)}
                right={<TextInput.Icon name="pencil-outline" color="black" />}
              />
              <Text
                style={{
                  textAlign: 'justify',
                  fontSize: 15,
                  marginBottom: '2%',
                }}>
                <Text style={{fontWeight: 'bold'}}>LATITUD: </Text>
                {location.coords !== undefined
                  ? location.coords.latitude
                  : 'Habilitar opción GPS'}
              </Text>
              <Text
                style={{
                  textAlign: 'justify',
                  fontSize: 15,
                  marginBottom: '2%',
                }}>
                <Text style={{fontWeight: 'bold'}}>LONGITUD: </Text>
                {location.coords !== undefined
                  ? location.coords.longitude
                  : 'Habilitar opción GPS'}
              </Text>
            </CollapseBody>
          </Collapse>
          <View style={styles.viewHorizontal}>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 15,
                marginBottom: '2%',
                fontWeight: 'bold',
                marginRight: '5%',
              }}>
              ¿VENDE CEMENTO?
            </Text>
            <Switch
              value={vendeCemento}
              onValueChange={() => setVendeCemento(!vendeCemento)}
            />
          </View>
          {vendeCemento ? (
            <View>
              <Button
                style={{marginBottom: '5%'}}
                icon="check"
                mode="contained"
                onPress={() => setShowAddProveedor(true)}>
                Adicionar Proveedor
              </Button>
              <Button
                icon="format-list-checks"
                mode="outline"
                onPress={() => setShowProveedores(true)}>
                Verificar Proveedores
              </Button>
            </View>
          ) : null}
          <View style={styles.viewHorizontal}>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 15,
                marginBottom: '2%',
                fontWeight: 'bold',
                marginRight: '5%',
              }}>
              ¿VIRGEN?
            </Text>
            <Switch value={virgen} onValueChange={() => setVirgen(!virgen)} />
          </View>
          <View style={styles.viewHorizontal}>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 15,
                marginBottom: '2%',
                fontWeight: 'bold',
                marginRight: '5%',
              }}>
              ¿FACHADA CSM?
            </Text>
            <Switch
              value={fachadaCsm}
              onValueChange={() => setFachadaCsm(!fachadaCsm)}
            />
          </View>
          <View style={styles.viewHorizontal}>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 15,
                marginBottom: '2%',
                fontWeight: 'bold',
                marginRight: '5%',
              }}>
              ¿PANAFLEX SAN MARCOS?
            </Text>
            <Switch
              value={panaflex}
              onValueChange={() => setPanaFlex(!panaflex)}
            />
          </View>
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
                <SafeAreaView>
                  <ScrollView>
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
                      onChangeText={value => searchForm(value)}
                      onClearPress={() => setEncuestas([])}
                    />
                    <FlatList
                      showsVerticalScrollIndicator={false}
                      data={encuestas}
                      renderItem={renderEncuesta}
                      keyExtractor={(item, index) => '' + index}
                    />
                  </ScrollView>
                </SafeAreaView>
              </View>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setShowClients(false)}>OK</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

        <Portal>
          <Dialog
            visible={showProveedores}
            onDismiss={() => {
              () => setShowProveedores(false);
            }}>
            <Dialog.Title>Proveedores</Dialog.Title>
            <Dialog.Content style={{height: '80%'}}>
              <View style={{marginBottom: '5%'}}>
                {loading ? null : (
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={proveedores}
                    renderItem={renderProveedor}
                    keyExtractor={(item, index) => '' + index}
                  />
                )}
              </View>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setShowProveedores(false)}>OK</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

        <Portal>
          <Dialog
            visible={showAddProveedor}
            onDismiss={() => {
              () => showAddProveedor(false);
            }}>
            <Dialog.Title>Proveedor</Dialog.Title>
            <Dialog.Content style={{height: '80%'}}>
              <SafeAreaView>
                <ScrollView scrollEnabled={true}>
                  <TextInput
                    style={{...styles.textInput, marginBottom: '5%'}}
                    mode="outlined"
                    label={'Proveedor'}
                    onChangeText={value => setProveedor(value)}
                    right={
                      <TextInput.Icon name="pencil-outline" color="black" />
                    }
                  />
                  <View style={styles.picker}>
                    <Picker
                      selectedValue={marcaProveedor}
                      style={{
                        height: 45,
                        width: '100%',
                      }}
                      mode={'dropdown'}
                      onValueChange={(itemValue, itemIndex) =>
                        setMarcaProveedor(itemValue)
                      }>
                      <Picker.Item label="Marca Proveedor" value="" />
                      <Picker.Item label="Alion" value="Alion" />
                    </Picker>
                  </View>
                  <TextInput
                    style={{...styles.textInput, marginBottom: '5%'}}
                    mode="outlined"
                    label={'Volumen Compra'}
                    onChangeText={value => setVolumenCompra(value)}
                    right={
                      <TextInput.Icon name="pencil-outline" color="black" />
                    }
                  />
                  <TextInput
                    style={{...styles.textInput, marginBottom: '5%'}}
                    mode="outlined"
                    label={'Volumen Venta'}
                    onChangeText={value => setVolumenVenta(value)}
                    right={
                      <TextInput.Icon name="pencil-outline" color="black" />
                    }
                  />
                  <TextInput
                    style={{...styles.textInput, marginBottom: '5%'}}
                    mode="outlined"
                    label={'Precio de Compra'}
                    onChangeText={value => setPrecioCompra(value)}
                    right={
                      <TextInput.Icon name="pencil-outline" color="black" />
                    }
                  />
                  <TextInput
                    style={{...styles.textInput, marginBottom: '5%'}}
                    mode="outlined"
                    label={'Precio de Venta'}
                    onChangeText={value => setPrecioVenta(value)}
                    right={
                      <TextInput.Icon name="pencil-outline" color="black" />
                    }
                  />
                  <TextInput
                    style={{...styles.textInput, marginBottom: '5%'}}
                    mode="outlined"
                    multiline={true}
                    label={'Comentarios'}
                    onChangeText={value => setComentarios(value)}
                    right={
                      <TextInput.Icon name="pencil-outline" color="black" />
                    }
                  />
                  <View style={styles.picker}>
                    <Picker
                      selectedValue={modalidadEntrega}
                      style={{
                        height: 45,
                        width: '100%',
                      }}
                      mode={'dropdown'}
                      onValueChange={(itemValue, itemIndex) =>
                        setModalidadEntrega(itemValue)
                      }>
                      <Picker.Item label="Modalidad Entrega" value="" />
                      <Picker.Item label="Mula" value="Mula" />
                    </Picker>
                  </View>
                  <Snackbar
                    visible={showMessage}
                    style={styles.snackbar}
                    onDismiss={() => setShowMessage(false)}
                    duration={2000}
                    action={{
                      label: 'OK',
                      color: '#efb810',
                      onPress: () => {
                        setShowMessage(false);
                      },
                    }}>
                    {message}
                  </Snackbar>
                </ScrollView>
              </SafeAreaView>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                style={{backgroundColor: 'red', marginRight: '5%'}}
                onPress={() => setShowAddProveedor(false)}>
                <Text style={{color: 'white'}}>CANCELAR</Text>
              </Button>
              <Button
                style={{backgroundColor: 'green'}}
                onPress={() => {
                  addProveedor();
                }}>
                <Text style={{color: 'white'}}>AGREGAR</Text>
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <Snackbar
          visible={showMessage}
          style={styles.snackbar}
          onDismiss={() => setShowMessage(false)}
          duration={2000}
          action={{
            label: 'OK',
            color: '#efb810',
            onPress: () => {
              setShowMessage(false);
            },
          }}>
          {message}
        </Snackbar>
      </ScrollView>
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
    marginTop: '5%',
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
  picker: {
    borderWidth: 1,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    padding: 4,
    borderColor: '#808080',
  },
});

export default SanMarcosForm;
