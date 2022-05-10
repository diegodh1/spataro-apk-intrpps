import React from 'react';
import {StyleSheet, View, SafeAreaView, ScrollView} from 'react-native';
import {
  TextInput,
  Button,
  Snackbar,
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
  const [message, setMessage] = React.useState(false);
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
  const [vendeAcero, setVendeAcero] = React.useState('Sí');
  const [marcaProveedor1, setMarcaProveedor1] = React.useState('');
  const [tiempoEntrega, setTiempoEntrega] = React.useState('');
  const [plazoPagoDias, setPlazoPagoDias] = React.useState('');
  const [volumenCompraBarraDelgada, setVolumenCompraBarraDelgada] =
    React.useState(0);
  const [costoBarraDelgada, setCostoBarraDelgada] = React.useState(0);
  const [precioVentaBarraDelgada, setPrecioVentaBarraDelgada] =
    React.useState(0);
  const [volumenCompraBarraGruesa, setVolumenCompraBarraGruesa] =
    React.useState(0);
  const [costoBarraGruesa, setCostoBarraGruesa] = React.useState(0);
  const [precioVentaBarraGruesa, setPrecioVentaBarraGruesa] = React.useState(0);
  const [volumenCompraChipa, setVolumenCompraChipa] = React.useState(0);
  const [costoChipa, setCostoChipa] = React.useState(0);
  const [precioVentaChipa, setPrecioVentaChipa] = React.useState(0);
  const [volumenCompraMalla, setVolumenCompraMalla] = React.useState(0);
  const [costoMalla, setCostoMalla] = React.useState(0);
  const [precioMall, setPrecioMalla] = React.useState(0);
  //proveedor 2
  const [marcaProveedor2, setMarcaProveedor2] = React.useState('');
  const [tiempoEntrega2, setTiempoEntrega2] = React.useState('');
  const [plazoPagoDias2, setPlazoPagoDias2] = React.useState('');
  const [volumenCompraBarraDelgada2, setVolumenCompraBarraDelgada2] =
    React.useState(0);
  const [costoBarraDelgada2, setCostoBarraDelgada2] = React.useState(0);
  const [precioVentaBarraDelgada2, setPrecioVentaBarraDelgada2] =
    React.useState(0);
  const [volumenCompraBarraGruesa2, setVolumenCompraBarraGruesa2] =
    React.useState(0);
  const [costoBarraGruesa2, setCostoBarraGruesa2] = React.useState(0);
  const [precioVentaBarraGruesa2, setPrecioVentaBarraGruesa2] =
    React.useState(0);
  //STEPS
  const [activeSteps, setActiveSteps] = React.useState(0);

  //reducer variables
  const user = useSelector(state => state.reducer.user);
  const path = useSelector(state => state.reducer.baseUrl);

  //cemento
  const [vendeCemento, setVendeCemento] = React.useState('Sí');
  const [proveedorCemento, setProveedorCemento] = React.useState('');
  const [marcaCemento, setMarcaCemento] = React.useState('');
  const [tiempoEntregaCemento, setTiempoEntregaCemento] = React.useState('');
  const [plazoPagoDiasCemento, setPlazoPagoDiasCemento] = React.useState('');
  const [volumenCompraCemento, setVolumenCompraCemento] = React.useState(0);
  const [volumenVentaCemento, setVolumenVentaCemento] = React.useState(0);
  const [costoCemento, setCostoCemento] = React.useState(0);
  const [precioVentaCemento, setPrecioVentaCemento] = React.useState(0);

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

  const createForm = () => {
    if(nombre !== '') {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Cliente: getClientInfoForm(),
          Producto: getProductosNoSidoc(),
          Acero: getAcero(),
          AceroAux: getAcero2(),
          Cemento: getCemento(),
        }),
      };
      fetch(path + '/form/submit', requestOptions)
        .then(response => response.json())
        .then(data => {
          setMessage(data.message);
          setVisible(true);
          if (data.status === 201) {
            setFecha(moment(now).format('YYYY-MM-DD'));
            setCodigo('');
            setNit('');
            setNombre('');
            setDireccion('');
            setDepartamento('');
            setCiudad('');
            setBarrio('');
            setComuna('');
            setContacto('');
            setCargo('');
            setTelefono('');

            setFerreteria('');
            setAreaEstablecimiento('');
            setRangoFacturacion('');
            setPorcentajeAcero('');
            setVehiculosPropios('');
            setOfreceCreditosCliente('');
            setMedio('');
            setCategoria('');
            setMarca('');
            setProveedor('');
            setFacturacionMensual('');
            setToneladasMes('');
            setPrecioCompra('');
            setPrecioVenta('');
            setVendeAcero('Sí');
            setMarcaProveedor1('');
            setTiempoEntrega('');
            setPlazoPagoDias('');
            setVolumenCompraBarraDelgada(0);
            setCostoBarraDelgada(0);
            setPrecioVentaBarraDelgada(0);
            setVolumenCompraBarraGruesa(0);
            setCostoBarraGruesa(0);
            setPrecioVentaBarraGruesa(0);
            setVolumenCompraChipa(0);
            setCostoChipa(0);
            setPrecioVentaChipa(0);
            setVolumenCompraMalla(0);
            setCostoMalla(0);
            setPrecioMalla(0);
            //proveedor 2
            setMarcaProveedor2('');
            setTiempoEntrega2('');
            setPlazoPagoDias2('');
            setVolumenCompraBarraDelgada2(0);
            setCostoBarraDelgada2(0);
            setPrecioVentaBarraDelgada2(0);
            setVolumenCompraBarraGruesa2(0);
            setCostoBarraGruesa2(0);
            setPrecioVentaBarraGruesa2(0);
            setActiveSteps(0);
          }
          console.log(JSON.stringify(data));
        })
        .catch(error => {
          console.log(error);
          setVisible(true);
        });
    } else {
      setMessage('La información del cliente es obligatoria');
      setVisible(true);
    }
  };

  const getClientInfoForm = () => {
    return {
      Codigo: codigo,
      Nit: nit,
      Nombre: nombre,
      Direccion: direccion,
      Departamento: departamento,
      Municipio: ciudad,
      Barrio: barrio,
      Comuna: comuna,
      Contacto: contacto,
      Celular: telefono,
      UsuCrea: user.AppUserErpName,
    };
  };

  const getProductosNoSidoc = () => {
    return {
      Ferreteria: String(ferreteria),
      AreaEstablecimientoBodega: String(areaEstablecimiento),
      RangoFacturacionMensual: String(rangoFacturacion),
      TieneVehiculosPropios: vehiculosPropios === 'Sí',
      OfreceCreditos: ofreceCreditosCliente === 'Sí',
      Medio: String(medio),
      Categoria: String(categoria),
      Marca: String(marca),
      Proveedor: String(proveedor),
      FacturacionMensualSinIva: !isNaN(parseFloat(facturacionMensual))
        ? parseFloat(facturacionMensual)
        : 0.0,
      ToneladasMesPromedio: !isNaN(parseFloat(toneladasMes))
        ? parseFloat(toneladasMes)
        : 0.0,
      PrecioCompraSinIva: !isNaN(parseFloat(precioCompra))
        ? parseFloat(precioCompra)
        : 0.0,
      PrecioVentaSinIva: !isNaN(parseFloat(precioVenta))
        ? parseFloat(precioVenta)
        : 0.0,
    };
  };

  const getAcero = () => {
    return {
      VendeAcero: vendeAcero === 'Sí',
      MarcaProveedor: String(marcaProveedor1),
      TiempoEntrega: String(tiempoEntrega),
      PlazoPagoDias: String(plazoPagoDias),
      VolumenCompraBarraDelgada: String(volumenCompraBarraDelgada),
      CostoBarraDelgadaSinIva: !isNaN(parseFloat(costoBarraDelgada))
        ? parseFloat(costoBarraDelgada)
        : 0,
      PrecioBarraDelgadaSinIva: !isNaN(parseFloat(precioVentaBarraDelgada))
        ? parseFloat(precioVentaBarraDelgada)
        : 0,
      VolumenCompraBarraGruesa: String(volumenCompraBarraGruesa),
      CostoBarraGruesaSinIva: !isNaN(parseFloat(costoBarraGruesa))
        ? parseFloat(costoBarraGruesa)
        : 0,
      PrecioBarraGruesaSinIva: !isNaN(parseFloat(precioVentaBarraGruesa))
        ? parseFloat(precioVentaBarraGruesa)
        : 0,
      VolumenCompraChipa: String(volumenCompraChipa),
      CostoChipa: !isNaN(parseFloat(costoChipa)) ? parseFloat(costoChipa) : 0,
      PrecioVentaChipa: Number.isInteger(precioVentaChipa)
        ? parseFloat(precioVentaChipa)
        : 0,
      VolumenCompraMalla: String(volumenCompraMalla),
      CostoMalla: !isNaN(parseFloat(costoMalla)) ? parseFloat(costoMalla) : 0,
      PrecioVentaMall: !isNaN(parseFloat(precioMall))
        ? parseFloat(precioMall)
        : 0,
    };
  };

  const getAcero2 = () => {
    return {
      MarcaProveedorAux: String(marcaProveedor2),
      TiempoEntrega: String(tiempoEntrega2),
      PlazoPagoDias: String(plazoPagoDias2),
      VolumenCompraBarraDelgada: String(volumenCompraBarraDelgada2),
      CostoBarraDelgada: !isNaN(parseFloat(precioVentaBarraDelgada2))
        ? 0
        : parseFloat(costoBarraDelgada2),
      PrecioVentaBarraDelgada: !isNaN(parseFloat(precioVentaBarraDelgada2))
        ? parseFloat(precioVentaBarraDelgada2)
        : 0,
      VolumenCompraBarraGruesa: String(volumenCompraBarraGruesa2),
      CostoBarraGruesa: !isNaN(parseFloat(costoBarraGruesa2))
        ? parseFloat(costoBarraGruesa2)
        : 0,
      PrecioVentaBarraGruesa: !isNaN(parseFloat(precioVentaBarraGruesa2))
        ? parseFloat(precioVentaBarraGruesa2)
        : 0,
    };
  };

  const getCemento = () => {
    return {
      VendeCemento: vendeCemento === 'Sí',
      MarcaProveedor: String(marcaCemento),
      Proveedor: String(proveedorCemento),
      TiempoEntregaProveedor: String(tiempoEntregaCemento),
      PlazoPagoDiasProveedor: !isNaN(parseFloat(plazoPagoDiasCemento))
        ? parseInt(plazoPagoDiasCemento)
        : 0,
      VolumenCompraCemento: String(volumenCompraCemento),
      VolumenVentaMostradorObras: String(volumenVentaCemento),
      CostoCementoSinIva: !isNaN(parseFloat(costoCemento))
        ? parseFloat(costoCemento)
        : 0,
      PrecioVentaPublicoSinIva: !isNaN(parseFloat(precioVentaCemento))
        ? parseFloat(precioVentaCemento)
        : 0,
    };
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
              label={'Codigo: ' + codigo}
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
              label={'Barrio: ' + barrio}
              onChangeText={value => setBarrio(value)}
              right={<TextInput.Icon name="pencil-outline" color="black" />}
            />

            <TextInput
              style={styles.textInput}
              mode="outlined"
              label={'Comuna: ' + comuna}
              onChangeText={value => setComuna(value)}
              right={<TextInput.Icon name="pencil-outline" color="black" />}
            />

            <TextInput
              style={styles.textInput}
              mode="outlined"
              label={'Contacto: ' + contacto}
              value={contacto}
              disabled={true}
              right={<TextInput.Icon name="pencil-outline" color="black" />}
            />

            <TextInput
              style={styles.textInput}
              mode="outlined"
              label={'Cargo: ' + cargo}
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
              label={'Telefono/Celular: ' + telefono}
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
              label={'¿Por qué medio? ' + medio}
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
              label={'Proveedor: ' + proveedor}
              onChangeText={value => setProveedor(value)}
              right={<TextInput.Icon name="pencil-outline" color="black" />}
            />
            <TextInput
              style={styles.textInput}
              mode="outlined"
              label={facturacionMensual === ''?"Facturación mensual promedio antes de iva/ (kilos si aplica)":"Facturación mensual promedio: " +facturacionMensual}
              onChangeText={value => setFacturacionMensual(value)}
              right={<TextInput.Icon name="pencil-outline" color="black" />}
            />
            <TextInput
              style={styles.textInput}
              mode="outlined"
              label={'Toneladas mes / promedio: ' + toneladasMes}
              onChangeText={value => setToneladasMes(value)}
              right={<TextInput.Icon name="pencil-outline" color="black" />}
            />
            <TextInput
              style={styles.textInput}
              mode="outlined"
              label={'Precio compra (antes de iva): ' + precioCompra}
              onChangeText={value => setPrecioCompra(value)}
              right={<TextInput.Icon name="pencil-outline" color="black" />}
            />
            <TextInput
              style={{...styles.textInput, marginBottom: '15%'}}
              mode="outlined"
              label={'precio venta (antes de iva): ' + precioVenta}
              onChangeText={value => setPrecioVenta(value)}
              right={<TextInput.Icon name="pencil-outline" color="black" />}
            />
          </View>
        ) : null}
        {activeSteps === 2 ? (
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
              ACERO
            </Text>

            <RadioButton.Group
              onValueChange={newValue => setVendeAcero(newValue)}
              value={vendeAcero}>
              <View
                style={{
                  ...styles.picker,
                  flex: 1,
                  flexDirection: 'row',
                }}>
                <View style={{width: '50%'}}>
                  <Text style={{textAlign: 'center', marginTop: '3%'}}>
                    ¿Vende Acero?
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
            <View style={styles.picker}>
              <Picker
                selectedValue={marcaProveedor1}
                style={{
                  height: 50,
                  width: '100%',
                }}
                onValueChange={(itemValue, itemIndex) =>
                  setMarcaProveedor1(itemValue)
                }>
                <Picker.Item label="Marca Proveedor 1" value="" />
                <Picker.Item label="Sidoc" value="Sidoc" />
                <Picker.Item label="GyJ Ferreterías" value="GyJ Ferreterías" />
                <Picker.Item label="Tubolaminas" value="Tubolaminas" />
                <Picker.Item label="Armetales" value="Armetales" />
                <Picker.Item label="Cyrgo" value="Cyrgo" />
                <Picker.Item label="Diaco" value="Diaco" />
                <Picker.Item label="Multialambres" value="Multialambres" />
                <Picker.Item
                  label="Ternium- Ferrasa"
                  value="Ternium- Ferrasa"
                />
                <Picker.Item label="Agofer" value="Agofer" />
                <Picker.Item label="sidenal" value="sidenal" />
                <Picker.Item
                  label="Aceros america/ Arequipa"
                  value="Aceros america/ Arequipa"
                />
                <Picker.Item label="Ecuatoriano" value="Ecuatoriano" />
                <Picker.Item label="importado" value="importado" />
                <Picker.Item label="steckerl" value="steckerl" />
                <Picker.Item label="paz del rio" value="paz del rio" />
                <Picker.Item label="Tul" value="Tul" />
              </Picker>
            </View>

            <View style={styles.picker}>
              <Picker
                selectedValue={tiempoEntrega}
                style={{
                  height: 50,
                  width: '100%',
                }}
                onValueChange={(itemValue, itemIndex) =>
                  setTiempoEntrega(itemValue)
                }>
                <Picker.Item label="Tiempo de entrega (días)" value="" />
                <Picker.Item label="<=1" value="<=1" />
                <Picker.Item label="2" value="2" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="4" value="4" />
                <Picker.Item label="5" value="5" />
                <Picker.Item label="6" value="6" />
                <Picker.Item label=">6" value=">6" />
              </Picker>
            </View>

            <View style={styles.picker}>
              <Picker
                selectedValue={plazoPagoDias}
                style={{
                  height: 50,
                  width: '100%',
                }}
                onValueChange={(itemValue, itemIndex) =>
                  setPlazoPagoDias(itemValue)
                }>
                <Picker.Item
                  label="Si ofrece cupo proveedor plazo de pago en días Proveedor (días)"
                  value=""
                />
                <Picker.Item label="0" value="0" />
                <Picker.Item label="30" value="30" />
                <Picker.Item label="45" value="45" />
                <Picker.Item label="60" value="60" />
                <Picker.Item label=">90" value=">90" />
              </Picker>
            </View>

            <View style={styles.picker}>
              <Picker
                selectedValue={volumenCompraBarraDelgada}
                style={{
                  height: 50,
                  width: '100%',
                }}
                onValueChange={(itemValue, itemIndex) =>
                  setVolumenCompraBarraDelgada(itemValue)
                }>
                <Picker.Item
                  label="Volumen de compra Barras Delgadas (Toneladas)"
                  value=""
                />
                <Picker.Item label="<=1" value="<=1" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="6" value="6" />
                <Picker.Item label="9" value="9" />
                <Picker.Item label="12" value="12" />
                <Picker.Item label="15" value="15" />
                <Picker.Item label="18" value="18" />
                <Picker.Item label="21" value="21" />
                <Picker.Item label="24" value="24" />
                <Picker.Item label="27" value="27" />
                <Picker.Item label="30" value="30" />
                <Picker.Item label="33" value="33" />
                <Picker.Item label="35" value="35" />
                <Picker.Item label="70" value="70" />
                <Picker.Item label="105" value="105" />
                <Picker.Item label="140" value="140" />
                <Picker.Item label=">175" value=">175" />
              </Picker>
            </View>

            <TextInput
              style={{...styles.textInput}}
              mode="outlined"
              label={
                'Costo barras delgadas antes de iva ($/kg): ' +
                setCostoBarraDelgada
              }
              onChangeText={value => setCostoBarraDelgada(value)}
              right={<TextInput.Icon name="pencil-outline" color="black" />}
            />

            <TextInput
              style={{...styles.textInput}}
              mode="outlined"
              label={
                'Precio de Venta barras delgadas antes de iva (kg): ' +
                precioVentaBarraDelgada
              }
              onChangeText={value => setPrecioVentaBarraDelgada(value)}
              right={<TextInput.Icon name="pencil-outline" color="black" />}
            />

            <View style={styles.picker}>
              <Picker
                selectedValue={volumenCompraBarraGruesa}
                style={{
                  height: 50,
                  width: '100%',
                }}
                onValueChange={(itemValue, itemIndex) =>
                  setVolumenCompraBarraGruesa(itemValue)
                }>
                <Picker.Item
                  label="Volumen de compra Barras Gruesas (Toneladas)"
                  value=""
                />
                <Picker.Item label="<=1" value="<=1" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="6" value="6" />
                <Picker.Item label="9" value="9" />
                <Picker.Item label="12" value="12" />
                <Picker.Item label="15" value="15" />
                <Picker.Item label="18" value="18" />
                <Picker.Item label="21" value="21" />
                <Picker.Item label="24" value="24" />
                <Picker.Item label="27" value="27" />
                <Picker.Item label="30" value="30" />
                <Picker.Item label="33" value="33" />
                <Picker.Item label="35" value="35" />
                <Picker.Item label="70" value="70" />
                <Picker.Item label="105" value="105" />
                <Picker.Item label="140" value="140" />
                <Picker.Item label=">175" value=">175" />
              </Picker>
            </View>

            <TextInput
              style={{...styles.textInput}}
              mode="outlined"
              label={
                'Costo barras gruesas antes de iva ($/kg): ' + costoBarraGruesa
              }
              onChangeText={value => setCostoBarraGruesa(value)}
              right={<TextInput.Icon name="pencil-outline" color="black" />}
            />
            <TextInput
              style={{...styles.textInput}}
              mode="outlined"
              label={
                'Precio de Venta barras gruesas antes de iva ($/kg): ' +
                precioVentaBarraGruesa
              }
              onChangeText={value => setPrecioVentaBarraGruesa(value)}
              right={<TextInput.Icon name="pencil-outline" color="black" />}
            />
            <TextInput
              style={{...styles.textInput}}
              mode="outlined"
              label={
                'Volumen de compra Chipa (Toneladas): ' + volumenCompraChipa
              }
              onChangeText={value => setVolumenCompraChipa(value)}
              right={<TextInput.Icon name="pencil-outline" color="black" />}
            />
            <TextInput
              style={{...styles.textInput}}
              mode="outlined"
              label={'Costo chipa antes de iva ($/kg): ' + costoChipa}
              onChangeText={value => setCostoChipa(value)}
              right={<TextInput.Icon name="pencil-outline" color="black" />}
            />
            <TextInput
              style={{...styles.textInput}}
              mode="outlined"
              label={
                'Precio de Venta chipa antes de iva  ($/kg): ' +
                precioVentaChipa
              }
              onChangeText={value => setPrecioVentaChipa(value)}
              right={<TextInput.Icon name="pencil-outline" color="black" />}
            />
            <TextInput
              style={{...styles.textInput}}
              mode="outlined"
              label={
                'Volumen de compra Malla (Toneladas ): ' + volumenCompraMalla
              }
              onChangeText={value => setVolumenCompraMalla(value)}
              right={<TextInput.Icon name="pencil-outline" color="black" />}
            />
            <TextInput
              style={{...styles.textInput}}
              mode="outlined"
              label={'Costo Malla antes de iva ($/kg): ' + costoMalla}
              onChangeText={value => setCostoMalla(value)}
              right={<TextInput.Icon name="pencil-outline" color="black" />}
            />
            <TextInput
              style={{...styles.textInput, marginBottom: '15%'}}
              mode="outlined"
              label={'Precio de Venta Malla antes de iva ($/kg)' + precioMall}
              onChangeText={value => setPrecioMalla(value)}
              right={<TextInput.Icon name="pencil-outline" color="black" />}
            />
          </View>
        ) : null}
        {activeSteps === 3 ? (
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
              ACERO
            </Text>
            <View style={styles.picker}>
              <Picker
                selectedValue={marcaProveedor2}
                style={{
                  height: 50,
                  width: '100%',
                }}
                onValueChange={(itemValue, itemIndex) =>
                  setMarcaProveedor2(itemValue)
                }>
                <Picker.Item label="Marca Proveedor 2" value="" />
                <Picker.Item label="Sidoc" value="Sidoc" />
                <Picker.Item label="GyJ Ferreterías" value="GyJ Ferreterías" />
                <Picker.Item label="Tubolaminas" value="Tubolaminas" />
                <Picker.Item label="Armetales" value="Armetales" />
                <Picker.Item label="Cyrgo" value="Cyrgo" />
                <Picker.Item label="Diaco" value="Diaco" />
                <Picker.Item label="Multialambres" value="Multialambres" />
                <Picker.Item
                  label="Ternium- Ferrasa"
                  value="Ternium- Ferrasa"
                />
                <Picker.Item label="Agofer" value="Agofer" />
                <Picker.Item label="sidenal" value="sidenal" />
                <Picker.Item
                  label="Aceros america/ Arequipa"
                  value="Aceros america/ Arequipa"
                />
                <Picker.Item label="Ecuatoriano" value="Ecuatoriano" />
                <Picker.Item label="importado" value="importado" />
                <Picker.Item label="steckerl" value="steckerl" />
                <Picker.Item label="paz del rio" value="paz del rio" />
                <Picker.Item label="Tul" value="Tul" />
              </Picker>
            </View>
            <View style={styles.picker}>
              <Picker
                selectedValue={tiempoEntrega2}
                style={{
                  height: 50,
                  width: '100%',
                }}
                onValueChange={(itemValue, itemIndex) =>
                  setTiempoEntrega2(itemValue)
                }>
                <Picker.Item label="Tiempo de entrega (días)" value="" />
                <Picker.Item label="<=1" value="<=1" />
                <Picker.Item label="2" value="2" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="4" value="4" />
                <Picker.Item label="5" value="5" />
                <Picker.Item label="6" value="6" />
                <Picker.Item label=">6" value=">6" />
              </Picker>
            </View>

            <View style={styles.picker}>
              <Picker
                selectedValue={plazoPagoDias2}
                style={{
                  height: 50,
                  width: '100%',
                }}
                onValueChange={(itemValue, itemIndex) =>
                  setPlazoPagoDias2(itemValue)
                }>
                <Picker.Item
                  label="Si ofrece cupo proveedor plazo de pago en días Proveedor (días)"
                  value=""
                />
                <Picker.Item label="0" value="0" />
                <Picker.Item label="30" value="30" />
                <Picker.Item label="45" value="45" />
                <Picker.Item label="60" value="60" />
                <Picker.Item label=">90" value=">90" />
              </Picker>
            </View>

            <View style={styles.picker}>
              <Picker
                selectedValue={volumenCompraBarraDelgada2}
                style={{
                  height: 50,
                  width: '100%',
                }}
                onValueChange={(itemValue, itemIndex) =>
                  setVolumenCompraBarraDelgada2(itemValue)
                }>
                <Picker.Item
                  label="Volumen de compra Barras Delgadas (Toneladas)"
                  value=""
                />
                <Picker.Item label="<=1" value="<=1" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="6" value="6" />
                <Picker.Item label="9" value="9" />
                <Picker.Item label="12" value="12" />
                <Picker.Item label="15" value="15" />
                <Picker.Item label="18" value="18" />
                <Picker.Item label="21" value="21" />
                <Picker.Item label="24" value="24" />
                <Picker.Item label="27" value="27" />
                <Picker.Item label="30" value="30" />
                <Picker.Item label="33" value="33" />
                <Picker.Item label="35" value="35" />
                <Picker.Item label="70" value="70" />
                <Picker.Item label="105" value="105" />
                <Picker.Item label="140" value="140" />
                <Picker.Item label=">175" value=">175" />
              </Picker>
            </View>

            <TextInput
              style={{...styles.textInput}}
              mode="outlined"
              label={
                'Costo barras delgadas antes de iva ($/kg): ' +
                costoBarraDelgada2
              }
              onChangeText={value => setCostoBarraDelgada2(value)}
              right={<TextInput.Icon name="pencil-outline" color="black" />}
            />

            <TextInput
              style={{...styles.textInput}}
              mode="outlined"
              label={
                'Precio de Venta barras delgadas antes de iva (kg): ' +
                precioVentaBarraDelgada2
              }
              onChangeText={value => setPrecioVentaBarraDelgada2(value)}
              right={<TextInput.Icon name="pencil-outline" color="black" />}
            />

            <View style={styles.picker}>
              <Picker
                selectedValue={volumenCompraBarraGruesa2}
                style={{
                  height: 50,
                  width: '100%',
                }}
                onValueChange={(itemValue, itemIndex) =>
                  setVolumenCompraBarraGruesa2(itemValue)
                }>
                <Picker.Item
                  label="Volumen de compra Barras Gruesas (Toneladas)"
                  value=""
                />
                <Picker.Item label="<=1" value="<=1" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="6" value="6" />
                <Picker.Item label="9" value="9" />
                <Picker.Item label="12" value="12" />
                <Picker.Item label="15" value="15" />
                <Picker.Item label="18" value="18" />
                <Picker.Item label="21" value="21" />
                <Picker.Item label="24" value="24" />
                <Picker.Item label="27" value="27" />
                <Picker.Item label="30" value="30" />
                <Picker.Item label="33" value="33" />
                <Picker.Item label="35" value="35" />
                <Picker.Item label="70" value="70" />
                <Picker.Item label="105" value="105" />
                <Picker.Item label="140" value="140" />
                <Picker.Item label=">175" value=">175" />
              </Picker>
            </View>

            <TextInput
              style={{...styles.textInput}}
              mode="outlined"
              label={
                'Costo barras gruesas antes de iva ($/kg): ' + costoBarraGruesa2
              }
              onChangeText={value => setCostoBarraGruesa2(value)}
              right={<TextInput.Icon name="pencil-outline" color="black" />}
            />
            <TextInput
              style={{...styles.textInput, marginBottom: '15%'}}
              mode="outlined"
              label={
                'Precio de Venta barras gruesas antes de iva ($/kg): ' +
                precioVentaBarraGruesa2
              }
              onChangeText={value => setPrecioVentaBarraGruesa2(value)}
              right={<TextInput.Icon name="pencil-outline" color="black" />}
            />
          </View>
        ) : null}
        {activeSteps === 4 ? (
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
              CEMENTO
            </Text>

            <RadioButton.Group
              onValueChange={newValue => setVendeCemento(newValue)}
              value={vendeCemento}>
              <View
                style={{
                  ...styles.picker,
                  flex: 1,
                  flexDirection: 'row',
                }}>
                <View style={{width: '50%'}}>
                  <Text style={{textAlign: 'center', marginTop: '3%'}}>
                    ¿Vende Cemento?
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
            <View style={styles.picker}>
              <Picker
                selectedValue={marcaCemento}
                style={{
                  height: 50,
                  width: '100%',
                }}
                mode={'dropdown'}
                onValueChange={(itemValue, itemIndex) =>
                  setMarcaCemento(itemValue)
                }>
                <Picker.Item label="Marca Proveedor" value="" />
                <Picker.Item label="Cemex" value="Cemex" />
                <Picker.Item label="Argos" value="Argos" />
                <Picker.Item label="CSM" value="CSM" />
                <Picker.Item label="Holcim" value="Holcim" />
                <Picker.Item label="Alion" value="Alion" />
                <Picker.Item label="Tequendama" value="Tequendama" />
                <Picker.Item label="Ultracem" value="Ultracem" />
                <Picker.Item label="Fortecem" value="Fortecem" />
              </Picker>
            </View>
            <View style={styles.picker}>
              <Picker
                selectedValue={proveedorCemento}
                style={{
                  height: 50,
                  width: '100%',
                }}
                mode={'dropdown'}
                onValueChange={(itemValue, itemIndex) =>
                  setProveedorCemento(itemValue)
                }>
                <Picker.Item label="Proveedor" value="" />
                <Picker.Item label="Cemex" value="Cemex" />
                <Picker.Item label="Argos" value="Argos" />
                <Picker.Item label="CSM" value="CSM" />
                <Picker.Item label="Holcim" value="Holcim" />
                <Picker.Item label="Alion" value="Alion" />
                <Picker.Item label="Tequendama" value="Tequendama" />
                <Picker.Item label="Ultracem" value="Ultracem" />
                <Picker.Item label="Fortecem" value="Fortecem" />
              </Picker>
            </View>
            <View style={styles.picker}>
              <Picker
                selectedValue={tiempoEntregaCemento}
                style={{
                  height: 50,
                  width: '100%',
                }}
                mode={'dropdown'}
                onValueChange={(itemValue, itemIndex) =>
                  setTiempoEntregaCemento(itemValue)
                }>
                <Picker.Item label="Tiempo de entrega proveedor" value="" />
                <Picker.Item label="<=1" value="<=1" />
                <Picker.Item label="2" value="2" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="4" value="4" />
                <Picker.Item label="5" value="5" />
                <Picker.Item label="6" value="6" />
                <Picker.Item label=">6" value=">6" />
              </Picker>
            </View>
            <View style={styles.picker}>
              <Picker
                selectedValue={tiempoEntregaCemento}
                style={{
                  height: 50,
                  width: '100%',
                }}
                mode={'dropdown'}
                onValueChange={(itemValue, itemIndex) =>
                  setTiempoEntregaCemento(itemValue)
                }>
                <Picker.Item label="Plazo de pago en días Proveedor" value="" />
                <Picker.Item label="0" value="0" />
                <Picker.Item label="15" value="15" />
                <Picker.Item label="30" value="30" />
              </Picker>
            </View>
            <View style={styles.picker}>
              <Picker
                selectedValue={volumenCompraCemento}
                style={{
                  height: 50,
                  width: '100%',
                }}
                mode={'dropdown'}
                onValueChange={(itemValue, itemIndex) =>
                  setVolumenCompraCemento(itemValue)
                }>
                <Picker.Item
                  label="Volumen de compra cemento (Toneladas)"
                  value=""
                />
                <Picker.Item label="<=1" value="<=1" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="6" value="6" />
                <Picker.Item label="9" value="9" />
                <Picker.Item label="12" value="12" />
                <Picker.Item label="15" value="15" />
                <Picker.Item label="18" value="18" />
                <Picker.Item label="21" value="21" />
                <Picker.Item label="24" value="24" />
                <Picker.Item label="27" value="27" />
                <Picker.Item label="30" value="30" />
                <Picker.Item label="33" value="33" />
                <Picker.Item label="35" value="35" />
                <Picker.Item label="70" value="70" />
                <Picker.Item label="105" value="105" />
                <Picker.Item label="140" value="140" />
                <Picker.Item label=">=175" value=">=175" />
              </Picker>
            </View>

            <View style={styles.picker}>
              <Picker
                selectedValue={volumenVentaCemento}
                style={{
                  height: 50,
                  width: '100%',
                }}
                mode={'dropdown'}
                onValueChange={(itemValue, itemIndex) =>
                  setVolumenVentaCemento(itemValue)
                }>
                <Picker.Item
                  label="Volumen de venta x mostrador y obras (Toneladas)"
                  value=""
                />
                <Picker.Item label="<=1" value="<=1" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="6" value="6" />
                <Picker.Item label="9" value="9" />
                <Picker.Item label="12" value="12" />
                <Picker.Item label="15" value="15" />
                <Picker.Item label="18" value="18" />
                <Picker.Item label="21" value="21" />
                <Picker.Item label="24" value="24" />
                <Picker.Item label="27" value="27" />
                <Picker.Item label="30" value="30" />
                <Picker.Item label="33" value="33" />
                <Picker.Item label="35" value="35" />
                <Picker.Item label="70" value="70" />
                <Picker.Item label="105" value="105" />
                <Picker.Item label="140" value="140" />
                <Picker.Item label=">=175" value=">=175" />
              </Picker>
            </View>

            <TextInput
              style={{...styles.textInput}}
              mode="outlined"
              label={
                'Costo cemento ($antes de iva/ bulto 50kg): ' + costoCemento
              }
              onChangeText={value => setCostoCemento(value)}
              right={<TextInput.Icon name="pencil-outline" color="black" />}
            />
            <TextInput
              style={{...styles.textInput}}
              mode="outlined"
              label={
                'Precio de Venta Público ($antes de iva/ bulto 50kg): ' +
                precioVentaCemento
              }
              onChangeText={value => setPrecioVentaCemento(value)}
              right={<TextInput.Icon name="pencil-outline" color="black" />}
            />
            <Button
              style={{...styles.button, marginBottom: '15%'}}
              contentStyle={styles.buttonDirection}
              icon="check"
              mode="contained"
              onPress={() => createForm()}>
              Enviar Formulario
            </Button>
          </View>
        ) : null}
      </ScrollView>
      {activeSteps > 0 ? (
        <FAB
          style={styles.fabLeft}
          small
          icon="arrow-left-thick"
          onPress={() => setActiveSteps(activeSteps - 1)}
        />
      ) : null}
      {activeSteps < 4 ? (
        <FAB
          style={styles.fabRight}
          small
          icon="arrow-right-thick"
          onPress={() => setActiveSteps(activeSteps + 1)}
        />
      ) : null}
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