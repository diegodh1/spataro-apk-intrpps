import React, {useState, useEffect} from 'react';
import {StyleSheet, View, SafeAreaView, ScrollView} from 'react-native';
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

const Formulario = ({navigation}) => {
  //CLIENTE
  let now = new Date();
  const [visible, setVisible] = React.useState(false);
  const [fecha, setFecha] = React.useState(moment(now).format('YYYY-MM-DD'));
  const [codigo, setCodigo] = React.useState('');
  const [nit, setNit] = React.useState('');
  const [nombre, setNombre] = React.useState('');
  const [direccion, setDireccion] = React.useState('');
  const [departamento, setDepartamento] = React.useState('');
  const [ciudad, setCiudad] = React.useState('');
  const [barrio, setBarrio] = React.useState('');
  const [comuna, setComuna] = React.useState('');
  const [contacto, setContacto] = React.useState('');
  const [cargo, setCargo] = React.useState('');
  const [telefono, setTelefono] = React.useState('');
  //OTROS PRODUCTOS
  const [ferreteria, setFerreteria] = React.useState('');
  const [areaEstablecimiento, setAreaEstablecimiento] = React.useState('');
  const [rangoFacturacion, setRangoFacturacion] = React.useState('');
  const [porcentajeAcero, setPorcentajeAcero] = React.useState('');
  const [vehiculosPropios, setVehiculosPropios] = React.useState('');
  const [ofreceCreditosCliente, setOfreceCreditosCliente] = React.useState('');
  const [medio, setMedio] = React.useState('');
  const [categoria, setCategoria] = React.useState('');
  const [marca, setMarca] = React.useState('');
  const [proveedor, setProveedor] = React.useState('');
  const [facturacionMensual, setFacturacionMensual] = React.useState('');
  const [toneladasMes, setToneladasMes] = React.useState('');
  const [precioCompra, setPrecioCompra] = React.useState('');
  const [precioVenta, setPrecioVenta] = React.useState('');
  //STEPS
  const [activeSteps, setActiveSteps] = React.useState(0);

  //reducer variables
  const user = useSelector(state => state.reducer.user);
  const path = useSelector(state => state.reducer.baseUrl);

  //methods
  const searchClientById = value => {
    setNit(value);

    const requestOptions = {
      method: 'GET',
    };
    if (value !== undefined && value !== '') {
      fetch(path + '/client/info/' + value, requestOptions)
        .then(response => response.json())
        .then(data => {
          if (data.status === 200) {
            setNombre(data.payload.NombreTercero);
            setDireccion(data.payload.Direccion);
            setDepartamento(data.payload.Dpto);
            setCiudad(data.payload.Ciudad);
            setContacto(data.payload.Contacto);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  return (
    <SafeAreaView>
      <ScrollView style={styles.scrollView}>
        {activeSteps === 0 ? (
          <View style={styles.rootContainer}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20,
                color: 'white',
                backgroundColor: 'red',
                padding: 7,
                width: '90%',
                marginLeft: '5%',
              }}>
              Información del Cliente
            </Text>
            <TextInput
              style={styles.textInput}
              mode="outlined"
              label="Fecha"
              disabled={true}
              value={fecha}
              right={<TextInput.Icon name="pencil-outline" color="black" />}
            />
            <TextInput
              style={styles.textInput}
              mode="outlined"
              label="Codigo"
              onChangeText={value => setCodigo(value)}
              right={<TextInput.Icon name="pencil-outline" color="black" />}
            />
            <TextInput
              style={styles.textInput}
              mode="outlined"
              label="NIT"
              onChangeText={value => searchClientById(value)}
              right={<TextInput.Icon name="pencil-outline" color="black" />}
            />
            <TextInput
              style={styles.textInput}
              mode="outlined"
              label="Nombre"
              value={nombre}
              disabled={true}
              right={<TextInput.Icon name="pencil-outline" color="black" />}
            />
            <TextInput
              style={styles.textInput}
              mode="outlined"
              label="Direccción"
              value={direccion}
              disabled={true}
              right={<TextInput.Icon name="pencil-outline" color="black" />}
            />
            <TextInput
              style={styles.textInput}
              mode="outlined"
              label="Departamento"
              value={departamento}
              disabled={true}
              right={<TextInput.Icon name="pencil-outline" color="black" />}
            />
            <TextInput
              style={styles.textInput}
              mode="outlined"
              label="Municipio"
              value={ciudad}
              disabled={true}
              right={<TextInput.Icon name="pencil-outline" color="black" />}
            />
            <TextInput
              style={styles.textInput}
              mode="outlined"
              label="Barrio"
              onChangeText={value => setBarrio(value)}
              right={<TextInput.Icon name="pencil-outline" color="black" />}
            />

            <TextInput
              style={styles.textInput}
              mode="outlined"
              label="Comuna"
              onChangeText={value => setComuna(value)}
              right={<TextInput.Icon name="pencil-outline" color="black" />}
            />

            <TextInput
              style={styles.textInput}
              mode="outlined"
              label="Contacto"
              value={contacto}
              disabled={true}
              right={<TextInput.Icon name="pencil-outline" color="black" />}
            />

            <TextInput
              style={styles.textInput}
              mode="outlined"
              label="Cargo"
              onChangeText={value => setCargo(value)}
              right={<TextInput.Icon name="pencil-outline" color="black" />}
            />

            <TextInput
              style={{
                marginTop: '2%',
                marginBottom: '15%',
                marginLeft: '5%',
                marginRight: '5%',
                backgroundColor: 'white',
              }}
              mode="outlined"
              label="Telefono/Celular"
              onChangeText={value => setTelefono(value)}
              right={<TextInput.Icon name="pencil-outline" color="black" />}
            />
          </View>
        ) : null}
        {activeSteps === 1 ? (
          <View style={styles.rootContainer}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20,
                color: 'white',
                backgroundColor: 'red',
                padding: 7,
                width: '90%',
                marginLeft: '5%',
              }}>
              Productos no Sidoc
            </Text>
            <View style={styles.picker}>
              <Picker
                selectedValue={ferreteria}
                style={{
                  height: 50,
                  width: '100%',
                }}
                mode={'dropdown'}
                onValueChange={(itemValue, itemIndex) =>
                  setFerreteria(itemValue)
                }>
                <Picker.Item label="Seleccionar Ferreteria" value="" />
                <Picker.Item label="Ferrelectricos" value="Ferrelectricos" />
                <Picker.Item
                  label="Linea Blanca / Ceramica"
                  value="Linea Blanca / Ceramica"
                />
                <Picker.Item label="Patio de Acopio" value="Patio de Acopio" />
                <Picker.Item
                  label="Ferretería miscelanea"
                  value="Ferretería miscelanea"
                />
                <Picker.Item label="Obra Negra" value="Obra Negra" />
              </Picker>
            </View>
            <View style={styles.picker}>
              <Picker
                selectedValue={areaEstablecimiento}
                style={{
                  height: 50,
                  width: '100%',
                }}
                mode={'dropdown'}
                onValueChange={(itemValue, itemIndex) =>
                  setAreaEstablecimiento(itemValue)
                }>
                <Picker.Item
                  label="Área del establecimiento bodega M2"
                  value=""
                />
                <Picker.Item label="0 a 20" value="0 a 20" />
                <Picker.Item label="21 a 50" value="21 a 50" />
                <Picker.Item label="51 a 80" value="51 a 80" />
                <Picker.Item label="81 a 120" value="81 a 120" />
                <Picker.Item label="121 a 300" value="121 a 300" />
                <Picker.Item label="más de 300" value="más de 300" />
              </Picker>
            </View>
            <View style={styles.picker}>
              <Picker
                selectedValue={rangoFacturacion}
                style={{
                  height: 50,
                  width: '100%',
                }}
                onValueChange={(itemValue, itemIndex) =>
                  setRangoFacturacion(itemValue)
                }>
                <Picker.Item
                  label="Rango de facturación Mensual de la Ferretería"
                  value=""
                />
                <Picker.Item label="$0MM A $10MM" value="$0MM A $10MM" />
                <Picker.Item label="$10MM A $20MM" value="$10MM A $20MM" />
                <Picker.Item label="$20MM A $30MM" value="$20MM A $30MM" />
                <Picker.Item label="$30MM A $50MM" value="$30MM A $50MM" />
                <Picker.Item label="$50MM A $80MM" value="$50MM A $80MM" />
                <Picker.Item label="$80MM A $100MM" value="$80MM A $100MM" />
                <Picker.Item label=">100MM" value=">100MM" />
              </Picker>
            </View>

            <RadioButton.Group
              onValueChange={newValue => setVehiculosPropios(newValue)}
              value={vehiculosPropios}>
              <View
                style={{
                  ...styles.picker,
                  flex: 1,
                  flexDirection: 'row',
                }}>
                <View style={{width: '50%'}}>
                  <Text style={{textAlign: 'center', marginTop: '3%'}}>
                    ¿El establecimiento cuenta con vehículos propios?
                  </Text>
                </View>
                <View style={{width: '50%', flex: 1, flexDirection: 'row'}}>
                  <View style={{width: '40%', marginLeft: '15%'}}>
                    <Text style={{marginLeft: '15%'}}>Sí</Text>
                    <RadioButton value="Sí" />
                  </View>
                  <View style={{width: '40%'}}>
                    <Text style={{marginLeft: '15%'}}>No</Text>
                    <RadioButton value="No" />
                  </View>
                </View>
              </View>
            </RadioButton.Group>

            <RadioButton.Group
              onValueChange={newValue => setOfreceCreditosCliente(newValue)}
              value={ofreceCreditosCliente}>
              <View
                style={{
                  ...styles.picker,
                  flex: 1,
                  flexDirection: 'row',
                }}>
                <View style={{width: '50%'}}>
                  <Text style={{textAlign: 'center', marginTop: '3%'}}>
                    ¿Ofrece crédito a sus clientes?
                  </Text>
                </View>
                <View style={{width: '50%', flex: 1, flexDirection: 'row'}}>
                  <View style={{width: '40%', marginLeft: '15%'}}>
                    <Text style={{marginLeft: '15%'}}>Sí</Text>
                    <RadioButton value="Sí" />
                  </View>
                  <View style={{width: '40%'}}>
                    <Text style={{marginLeft: '15%'}}>No</Text>
                    <RadioButton value="No" />
                  </View>
                </View>
              </View>
            </RadioButton.Group>
            <TextInput
              style={styles.textInput}
              mode="outlined"
              label="¿Por qué medio?"
              onChangeText={value => setMedio(value)}
              right={<TextInput.Icon name="pencil-outline" color="black" />}
            />
            <View style={styles.picker}>
              <Picker
                selectedValue={categoria}
                style={{
                  height: 50,
                  width: '100%',
                }}
                onValueChange={(itemValue, itemIndex) =>
                  setCategoria(itemValue)
                }>
                <Picker.Item label="Categoría" value="" />
                <Picker.Item label="Acero" value="Acero" />
                <Picker.Item label="Cemento" value="Cemento" />
                <Picker.Item label="No sidoc" value="No sidoc" />
              </Picker>
            </View>
            <View style={styles.picker}>
              <Picker
                selectedValue={marca}
                style={{
                  height: 50,
                  width: '100%',
                }}
                onValueChange={(itemValue, itemIndex) => setMarca(itemValue)}>
                <Picker.Item label="Marca" value="" />
                <Picker.Item label="Acesco" value="Acesco" />
                <Picker.Item label="Corpacero" value="Corpacero" />
                <Picker.Item label="Colmena" value="Colmena" />
                <Picker.Item label="Fanalca" value="Fanalca" />
                <Picker.Item label="Arme" value="Arme" />
                <Picker.Item label="Trefilados" value="Trefilados" />
                <Picker.Item label="Corpacero" value="Corpacero" />
                <Picker.Item label="Ipac" value="Ipac" />
                <Picker.Item label="Icoperfiles" value="Icoperfiles" />
                <Picker.Item label="La Campana" value="Campana" />
                <Picker.Item label="Eternit" value="Eternit" />
                <Picker.Item label="Etex-Colombia" value="Etex-Colombia" />
                <Picker.Item label="Toptec" value="Toptec" />
              </Picker>
            </View>
            <TextInput
              style={styles.textInput}
              mode="outlined"
              label="Proveedor"
              onChangeText={value => setProveedor(value)}
              right={<TextInput.Icon name="pencil-outline" color="black" />}
            />
            <TextInput
              style={styles.textInput}
              mode="outlined"
              label="Facturación mensual promedio antes de iva/ (kilos si aplica)"
              onChangeText={value => setFacturacionMensual(value)}
              right={<TextInput.Icon name="pencil-outline" color="black" />}
            />
            <TextInput
              style={styles.textInput}
              mode="outlined"
              label="Toneladas mes / promedio"
              onChangeText={value => setToneladasMes(value)}
              right={<TextInput.Icon name="pencil-outline" color="black" />}
            />
            <TextInput
              style={styles.textInput}
              mode="outlined"
              label="Precio compra (antes de iva)"
              onChangeText={value => precioCompra(value)}
              right={<TextInput.Icon name="pencil-outline" color="black" />}
            />
            <TextInput
              style={{...styles.textInput, marginBottom: '15%'}}
              mode="outlined"
              label="precio venta (antes de iva)"
              onChangeText={value => precioVenta(value)}
              right={<TextInput.Icon name="pencil-outline" color="black" />}
            />
          </View>
        ) : null}
      </ScrollView>
      {activeSteps !== 0 ? (
        <FAB
          style={styles.fabLeft}
          small
          icon="arrow-left-thick"
          onPress={() => setActiveSteps(activeSteps - 1)}
        />
      ) : null}
      <FAB
        style={styles.fabRight}
        small
        icon="arrow-right-thick"
        onPress={() => setActiveSteps(activeSteps + 1)}
      />
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
    marginLeft: '5%',
    width: '90%',
    flex: 0.3,
    borderWidth: 1,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    padding: 4,
    borderColor: '#808080',
    marginTop: '5%',
  },
});

export default Formulario;
