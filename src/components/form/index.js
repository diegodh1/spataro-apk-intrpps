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
  Checkbox,
} from 'react-native-paper';
import Geolocation from '@react-native-community/geolocation';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {Picker} from '@react-native-community/picker';
import DatePicker from 'react-native-date-picker';
import SearchBar from 'react-native-dynamic-search-bar';

const Formulario = ({navigation}) => {
  //CLIENTE
  let now = new Date();
  const [visible, setVisible] = React.useState(false);
  const [message, setMessage] = React.useState(false);
  const [showFecha, setShowFecha] = React.useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [fecha, setFecha] = React.useState(new Date());
  const [fechaAux, setFechaAux] = React.useState(
    moment(now).format('YYYY-MM-DD'),
  );
  const [codigo, setCodigo] = React.useState('');
  const [nit, setNit] = React.useState('');
  const [noVendeAcero, setNoVendeAcero] = React.useState('');
  const [noVendeCemento, setNoVendeCemento] = React.useState('');
  const [proveedorOfreceCupo, setProveedorOfreceCupo] = React.useState('');
  const [nombre, setNombre] = React.useState('');
  const [direccion, setDireccion] = React.useState('');
  const [departamento, setDepartamento] = React.useState('');
  const [ciudad, setCiudad] = React.useState('');
  const [barrio, setBarrio] = React.useState('');
  const [comuna, setComuna] = React.useState('');
  const [contacto, setContacto] = React.useState('');
  const [cargo, setCargo] = React.useState('');
  const [telefono, setTelefono] = React.useState('');
  const [capacidadFlota, setCapacidadFlota] = React.useState(0);
  const [tieneVehiculoTurbo, setTieneVehiculoTurbo] = React.useState(false);
  const [tieneVehiculoSencillo, setTieneVehiculoSencillo] =
    React.useState(false);
  const [tieneVehiculoDobleTroque, setTieneVehiculoDobleTroque] =
    React.useState(false);
  const [tieneVehiculoMinimula, setTieneVehiculoMinimula] =
    React.useState(false);
  const [tieneVehiculoMula, setTieneVehiculoMula] = React.useState(false);
  const [otroTipoVehiculo, setOtroTipoVehiculo] = React.useState('');
  const [zonaCoberturaLogistica, setZonaCoberturaLogistica] =
    React.useState('');
  const [zonaCoberturaLogisticaSi, setZonaCoberturaLogisticaSi] =
    React.useState('');
  const [zonaCoberturaLogisticaNo, setZonaCoberturaLogisticaNo] =
    React.useState('');
  const [montoCreditoCliente, setMontoCreditoCliente] = React.useState('');

  //OTROS PRODUCTOS
  const [ferreteria, setFerreteria] = React.useState('');
  const [capturingUbication, setCapturingUbication] = React.useState(false);
  const [areaEstablecimiento, setAreaEstablecimiento] = React.useState('');
  const [rangoFacturacion, setRangoFacturacion] = React.useState('');
  const [porcentajeAcero, setPorcentajeAcero] = React.useState('');
  const [vehiculosPropios, setVehiculosPropios] = React.useState('');
  const [ofreceCreditosCliente, setOfreceCreditosCliente] = React.useState('');
  const [medio, setMedio] = React.useState('');
  const [medioCreditoCliente, setMedioCreditoCliente] = React.useState('');
  const [clientes, setClientes] = React.useState([]);
  const [showClientes, setShowClientes] = React.useState(false);
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
  const [proveedorOfreceCupoMonto, setProveedorOfreceCupoMonto] =
    React.useState('');
  //STEPS
  const [activeSteps, setActiveSteps] = React.useState(-1);
  const [location, setLocation] = React.useState({});
  const [steps, setSteps] = React.useState([0, 1]);

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
  const [isAceroSelected, setIsAceroSelected] = React.useState(false);
  const [isCementoSelected, setIsCementoSelected] = React.useState(false);
  const [isNotSidocSelected, setIsNotSidocSelected] = React.useState(false);
  //acero
  const [categoriaProductoId, setCategoriaProductoId] = React.useState('');
  const [subCategoriaProductoId, setSubCategoriaProductoId] =
    React.useState('');
  const staticCategoriasProducto = [
    {categoria: 'ESTUCO Y COMPLEMENTOS', subcategoria: 'ADHESIVOS DE ENCHAPE'},
    {
      categoria: 'ESTUCO Y COMPLEMENTOS',
      subcategoria: 'ADITIVOS DE CONSTRUCCION',
    },
    {categoria: 'ESTUCO Y COMPLEMENTOS', subcategoria: 'ESTUCOS Y RELLENOS'},
    {categoria: 'CONSTRUCCION LIVIANA', subcategoria: 'PERFILES DRYWALL'},
    {categoria: 'CONSTRUCCION LIVIANA', subcategoria: 'PLACAS FIBROCEMENTO'},
    {categoria: 'CUBIERTAS Y FACHADAS', subcategoria: 'ARQUITECTONICA'},
    {categoria: 'CUBIERTAS Y FACHADAS', subcategoria: 'TEJA THERMOACUSTICA'},
    {categoria: 'CUBIERTAS Y FACHADAS', subcategoria: 'TEJAS FIBROCEMENTO'},
    {categoria: 'CUBIERTAS Y FACHADAS', subcategoria: 'TEJAS METALICAS'},
    {categoria: 'CUBIERTAS Y FACHADAS', subcategoria: 'TEJAS POLICARBONATO'},
    {
      categoria: 'LAMINAS Y SISTEMA ENTREPISO',
      subcategoria: 'LAMINA COLABORANTE DECK',
    },
    {
      categoria: 'LAMINAS Y SISTEMA ENTREPISO',
      subcategoria: 'LAMINA GALVANIZADA',
    },
    {categoria: 'MALLAS, ALAMBRES Y CERRAMIENTOS', subcategoria: 'ALAMBRE'},
    {
      categoria: 'MALLAS, ALAMBRES Y CERRAMIENTOS',
      subcategoria: 'ALAMBRE NEGRO',
    },
    {
      categoria: 'MALLAS, ALAMBRES Y CERRAMIENTOS',
      subcategoria: 'MALLA ELECTROSOLDADA',
    },
    {
      categoria: 'MALLAS, ALAMBRES Y CERRAMIENTOS',
      subcategoria: 'MALLA ESLABONADA',
    },
    {categoria: 'PERFILES METALICOS', subcategoria: 'ANGULOS'},
    {categoria: 'PERFILES METALICOS', subcategoria: 'PERFIL EN C'},
    {categoria: 'PERFILES METALICOS', subcategoria: 'PERFIL PLACA FACIL'},
    {categoria: 'PERFILES METALICOS', subcategoria: 'PLATINAS'},
    {categoria: 'PERFILES METALICOS', subcategoria: 'TUBERIA CERRAMIENTO'},
    {categoria: 'PERFILES METALICOS', subcategoria: 'TUBERIA ESTRUCTURAL'},
    {categoria: 'PERFILES METALICOS', subcategoria: 'TUBERIA MUEBLE'},
    {categoria: 'PERFILES METALICOS', subcategoria: 'VARILLA CUADRADA'},
    {categoria: 'PERFILES METALICOS', subcategoria: 'VARILLA REDONDA LISA'},
    {categoria: 'PERFILES METALICOS', subcategoria: 'VIGAS IPE'},
    {categoria: 'PINTURAS', subcategoria: 'ANTICORROSIVO'},
    {categoria: 'PINTURAS', subcategoria: 'VINILO'},
    {categoria: 'OTROS', subcategoria: 'BLOQUELON'},
    {categoria: 'OTROS', subcategoria: 'SOLDADURA'},
    {categoria: 'OTROS', subcategoria: 'DISCOS DE CORTE'},
  ];

  const [categoriasProducto, setCategoriasProducto] = React.useState([
    {categoria: 'ESTUCO Y COMPLEMENTOS'},
    {categoria: 'CONSTRUCCION LIVIANA'},
    {categoria: 'CUBIERTAS Y FACHADAS'},
    {categoria: 'LAMINAS Y SISTEMA ENTREPISO'},
    {categoria: 'MALLAS, ALAMBRES Y CERRAMIENTOS'},
    {categoria: 'PERFILES METALICOS'},
    {categoria: 'PINTURAS'},
    {categoria: 'OTROS'},
  ]);
  const [subCategoriasProducto, setSubCategoriasProducto] = React.useState([]);
  const [volumenCompraNoSidoc, setVolumenCompraNoSidoc] = React.useState(0);
  const [precioUnitarioNoSidoc, setPrecioUnitarioNoSidoc] = React.useState(0);

  //methods
  const hideDate = () => {
    let fechaTemp = moment(fecha).format('DD-MM-YYYY');
    setFechaAux(fechaTemp);
    setShowFecha(false);
  };

  const filterSubCategoria = value => {
    const categoriaFilter = staticCategoriasProducto.filter(
      element => element.categoria == value,
    );
    setSubCategoriasProducto(categoriaFilter);
  };

  const searchClientById = value => {
    setShowSpinner(true);
    const requestOptions = {
      method: 'GET',
    };
    if (value !== undefined && value !== '') {
      fetch(path + '/client/search/' + value, requestOptions)
        .then(response => response.json())
        .then(data => {
          setShowSpinner(false);
          setClientes(data);
        })
        .catch(error => {
          setShowSpinner(false);
          setClientes([]);
        });
    }
  };

  const renderClient = ({item, index}) => (
    <Card
      elevation={0.2}
      onPress={() => {
        setShowClientes(false);
        setNombre(item.NombreTercero);
        setContacto(item.Contacto);
        setDireccion(item.Direccion);
        setDepartamento(item.Dpto);
        setCiudad(item.Ciudad);
        setNit(item.Nit);
      }}>
      <Card.Title
        title={item.Nit}
        subtitle={item.NombreTercero}
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
          <Text style={{color: '#efb810'}}>CONTACTO: </Text>
          <Text style={{color: 'black'}}>{item.Contacto}</Text>
        </Text>
        <Text style={{textAlign: 'justify', fontSize: 10, marginBottom: '2%'}}>
          <Text style={{color: '#efb810'}}>DEPARTAMENTO: </Text>
          <Text style={{color: 'black'}}>{item.Dpto}</Text>
        </Text>
        <Text style={{textAlign: 'justify', fontSize: 10, marginBottom: '2%'}}>
          <Text style={{color: '#efb810'}}>CIUDAD: </Text>
          <Text style={{color: 'black'}}>{item.Ciudad}</Text>
        </Text>
        <Text style={{textAlign: 'justify', fontSize: 10, marginBottom: '2%'}}>
          <Text style={{color: '#efb810'}}>DIRECCIÓN: </Text>
          <Text style={{color: 'black'}}>{item.Direccion.trim()}</Text>
        </Text>
      </Card.Content>
    </Card>
  );

  const createForm = () => {
    if (nombre !== '') {
      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
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
            setNoVendeAcero('');
            setNoVendeCemento('');
            setMedioCreditoCliente('');
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
            setActiveSteps(-1);
            setSteps([0, 1]);
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
      MedioCreditoCliente: String(medioCreditoCliente),
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
      NoVendeAcero: String(noVendeAcero),
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
      NoVendeCemento: String(noVendeCemento),
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
        <Portal>
          <Dialog
            visible={capturingUbication}
            onDismiss={() => setCapturingUbication(false)}>
            <Dialog.Title>
              <Text style={{color: 'red'}}>Information</Text>
            </Dialog.Title>
            <Dialog.ScrollArea>
              <Text style={{marginTop: '3%', marginBottom: '3%'}}>
                Al comenzar esta encuesta su ubicación sera registrada en el
                sistema, y será comprobada por un asesor más adelante. Esta
                seguro de comenzar la encuesta?
              </Text>
            </Dialog.ScrollArea>
            <Dialog.Actions style={{flexGrow: 1}}>
              <Button
                style={{marginRight: '5%'}}
                onPress={() => setCapturingUbication(false)}
                mode="outlined">
                CANCELAR
              </Button>
              <Button
                onPress={() => {
                  setActiveSteps(0);
                  Geolocation.getCurrentPosition(info => setLocation(info));
                  setCapturingUbication(false);
                }}
                mode="contained">
                REALIZAR
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        {activeSteps === -1 ? (
          <View
            style={{
              marginLeft: '15%',
              marginRight: '15%',
              marginTop: '5%',
            }}>
            <Text
              style={{
                textAlign: 'center',
                marginBottom: '15%',
                fontSize: 18,
                backgroundColor: 'red',
                color: 'white',
                padding: 5,
              }}>
              Seleccione la Encuesta a Aplicar
            </Text>
            <Checkbox.Item
              label="Acero"
              status={isAceroSelected ? 'checked' : 'unchecked'}
              onPress={() => {
                let newValue = !isAceroSelected;
                let newItems = steps;
                if (newValue && !newItems.includes(2)) {
                  newItems.push(2);
                  newItems.push(3);
                } else if (!newValue) {
                  newItems = newItems.filter(el => el !== 2 && el !== 3);
                }
                setIsAceroSelected(newValue);
                setSteps(newItems.sort());
              }}
            />
            <Checkbox.Item
              label="Cemento"
              status={isCementoSelected ? 'checked' : 'unchecked'}
              onPress={() => {
                let newValue = !isCementoSelected;
                let newItems = steps;
                if (newValue && !newItems.includes(4)) {
                  newItems.push(4);
                } else if (!newValue) {
                  newItems = newItems.filter(el => el !== 4);
                }
                setIsCementoSelected(!isCementoSelected);
                setSteps(newItems.sort());
              }}
            />
            <Checkbox.Item
              label="No Sidoc"
              status={isNotSidocSelected ? 'checked' : 'unchecked'}
              onPress={() => {
                let newValue = !isNotSidocSelected;
                let newItems = steps;
                if (newValue && !newItems.includes(5)) {
                  newItems.push(5);
                } else if (!newValue) {
                  newItems = newItems.filter(el => el !== 5);
                }
                setIsNotSidocSelected(!isNotSidocSelected);
                setSteps(newItems.sort());
              }}
            />
            <Button
              style={{marginRight: '5%', marginLeft: '5%', marginTop: '5%'}}
              icon="check"
              mode="contained"
              onPress={() => {
                console.log(steps);
                if (steps.length > 1) {
                  setCapturingUbication(true);
                } else {
                  setMessage(
                    'Debe seleccionar al menos una encuesta a realizar',
                  );
                  setVisible(true);
                }
              }}>
              Realizar Encuesta
            </Button>
          </View>
        ) : null}
        {steps[activeSteps] === 0 ? (
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
            <Button
              style={{marginRight: '5%', marginLeft: '5%', marginTop: '5%'}}
              icon="camera"
              mode="contained"
              onPress={() => setShowFecha(true)}>
              Seleccionar Fecha: {fechaAux}
            </Button>
            <Button
              style={{marginRight: '5%', marginLeft: '5%', marginTop: '5%'}}
              icon="magnify"
              mode="contained"
              onPress={() => setShowClientes(true)}>
              {nombre === '' ? 'Buscar por Nombre' : nombre}
            </Button>
            <Button
              style={{marginRight: '5%', marginLeft: '5%', marginTop: '5%'}}
              icon="magnify"
              mode="contained"
              onPress={() => setShowClientes(true)}>
              {nit === '' ? 'Buscar por N.I.T' : nit}
            </Button>
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
              label={'Contacto'}
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
              Información Adicional del Cliente
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
                <Picker.Item
                  color={'red'}
                  label="Especialidad Ferretería"
                  value=""
                />
                <Picker.Item
                  color={'red'}
                  label="Ferrelectricos"
                  value="Ferrelectricos"
                />
                <Picker.Item
                  color={'red'}
                  label="Linea Blanca / Ceramica"
                  value="Linea Blanca / Ceramica"
                />
                <Picker.Item
                  color={'red'}
                  label="Patio de Acopio"
                  value="Patio de Acopio"
                />
                <Picker.Item
                  color={'red'}
                  label="Ferretería miscelanea"
                  value="Ferretería miscelanea"
                />
                <Picker.Item
                  color={'red'}
                  label="Obra Negra"
                  value="Obra Negra"
                />
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
                  color={'red'}
                  label="Área del establecimiento bodega M2"
                  value=""
                />
                <Picker.Item color={'red'} label="0 a 20" value="0 a 20" />
                <Picker.Item color={'red'} label="21 a 50" value="21 a 50" />
                <Picker.Item color={'red'} label="51 a 80" value="51 a 80" />
                <Picker.Item color={'red'} label="81 a 120" value="81 a 120" />
                <Picker.Item
                  color={'red'}
                  label="121 a 300"
                  value="121 a 300"
                />
                <Picker.Item
                  color={'red'}
                  label="más de 300"
                  value="más de 300"
                />
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
                  color={'red'}
                  label={'Rango de facturación Mensual de la Ferretería'}
                  value=""
                />
                <Picker.Item color={'red'} label="0-50" value="0-50" />
                <Picker.Item color={'red'} label="50-100" value="50-100" />
                <Picker.Item color={'red'} label="100-200" value="100-200" />
                <Picker.Item color={'red'} label="200-400" value="200-400" />
                <Picker.Item color={'red'} label="400-600" value="400-600" />
                <Picker.Item
                  color={'red'}
                  label="Más 600 Millones"
                  value="Más 600 Millones"
                />
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

            {vehiculosPropios === 'Sí' ? (
              <View>
                <TextInput
                  style={styles.textInput}
                  mode="outlined"
                  keyboardType="numeric"
                  label={
                    <Text style={{fontSize: 14}}>
                      ¿Capacidad de carga de la flota en Toneladas?
                    </Text>
                  }
                  onChangeText={value => setCapacidadFlota(value)}
                  right={<TextInput.Icon name="pencil-outline" color="black" />}
                />
                <View
                  style={{
                    marginLeft: '5%',
                    marginRight: '5%',
                    marginTop: '5%',
                  }}>
                  <Text style={{fontSize: 16, color: 'red'}}>
                    ¿Con qué tipo de vehículos cuenta?
                  </Text>
                  <Checkbox.Item
                    label="Vehiculo Turbo"
                    status={tieneVehiculoTurbo ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setTieneVehiculoTurbo(!tieneVehiculoTurbo);
                    }}
                  />
                  <Checkbox.Item
                    label="Vehiculo Sencillo"
                    status={tieneVehiculoSencillo ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setTieneVehiculoSencillo(!tieneVehiculoSencillo);
                    }}
                  />
                  <Checkbox.Item
                    label="Vehiculo Doble Troque"
                    status={tieneVehiculoDobleTroque ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setTieneVehiculoDobleTroque(!tieneVehiculoDobleTroque);
                    }}
                  />
                  <Checkbox.Item
                    label="Vehiculo Mini Mula"
                    status={tieneVehiculoMinimula ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setTieneVehiculoMinimula(!tieneVehiculoMinimula);
                    }}
                  />
                  <Checkbox.Item
                    label="Vehiculo Mula"
                    status={tieneVehiculoMula ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setTieneVehiculoMula(!tieneVehiculoMula);
                    }}
                  />
                  <TextInput
                    style={styles.textInput}
                    label={<Text style={{fontSize: 16}}>¿Otro?</Text>}
                    onChangeText={value => setOtroTipoVehiculo(value)}
                    right={
                      <TextInput.Icon name="pencil-outline" color="black" />
                    }
                  />
                </View>
              </View>
            ) : null}

            <RadioButton.Group
              onValueChange={newValue => setZonaCoberturaLogistica(newValue)}
              value={zonaCoberturaLogistica}>
              <View
                style={{
                  ...styles.picker,
                  flex: 1,
                  flexDirection: 'row',
                }}>
                <View style={{width: '50%'}}>
                  <Text style={{textAlign: 'center', marginTop: '3%'}}>
                    ¿Zona de cobertura logística?
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
            {zonaCoberturaLogistica === 'Sí' ? (
              <View>
                <TextInput
                  style={styles.textInput}
                  label={
                    <Text style={{fontSize: 12}}>
                      ¿Más Información sobre la Zona Cobertura Logística?
                    </Text>
                  }
                  onChangeText={value => setZonaCoberturaLogisticaSi(value)}
                  right={<TextInput.Icon name="pencil-outline" color="black" />}
                />
              </View>
            ) : zonaCoberturaLogistica === 'No' ? (
              <View>
                <TextInput
                  style={styles.textInput}
                  label={
                    <Text style={{fontSize: 14}}>
                      ¿Cómo soluciona la operación logística?
                    </Text>
                  }
                  onChangeText={value => setZonaCoberturaLogisticaNo(value)}
                  right={<TextInput.Icon name="pencil-outline" color="black" />}
                />
              </View>
            ) : null}

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
            {ofreceCreditosCliente === 'Sí' ? (
              <Picker
                selectedValue={medioCreditoCliente}
                style={{
                  height: 50,
                  width: '90%',
                  marginLeft: '5%',
                }}
                onValueChange={(itemValue, itemIndex) =>
                  setMedioCreditoCliente(itemValue)
                }>
                <Picker.Item color={'red'} label="¿Por qué medio?" value="" />
                <Picker.Item color={'red'} label="Directo" value="Directo" />
                <Picker.Item
                  color={'red'}
                  label="A través de int financiero"
                  value="A través de int financiero"
                />
                <Picker.Item color={'red'} label="Otro" value="Otro" />
              </Picker>
            ) : null}
            {ofreceCreditosCliente === 'Sí' &&
            !['', 'Directo', 'A través de int financiero'].includes(
              medioCreditoCliente,
            ) ? (
              <TextInput
                style={styles.textInput}
                mode="outlined"
                label={'Cuál?'}
                onChangeText={value => setMedioCreditoCliente(value)}
                right={<TextInput.Icon name="pencil-outline" color="black" />}
              />
            ) : null}
            {ofreceCreditosCliente === 'Sí' ? (
              <Picker
                selectedValue={montoCreditoCliente}
                style={{
                  height: 50,
                  width: '90%',
                  marginLeft: '5%',
                }}
                onValueChange={(itemValue, itemIndex) =>
                  setMontoCreditoCliente(itemValue)
                }>
                <Picker.Item
                  color={'red'}
                  label="¿Cuál es el monto en millones?"
                  value=""
                />
                <Picker.Item color={'red'} label="0-10" value="0-10" />
                <Picker.Item color={'red'} label="10-30" value="10-30" />
                <Picker.Item color={'red'} label="30-60" value="30-60" />
                <Picker.Item color={'red'} label="60-100" value="60-100" />
                <Picker.Item color={'red'} label="100-200" value="100-200" />
                <Picker.Item color={'red'} label="200-400" value="200-400" />
                <Picker.Item color={'red'} label="400-600" value="400-600" />
                <Picker.Item color={'red'} label="600-1000" value="600-1000" />
                <Picker.Item
                  color={'red'}
                  label="Más de 1000 Millones"
                  value="Más de 1000 Millones"
                />
              </Picker>
            ) : null}
            <Text style={{marginBottom: '15%'}} />
          </View>
        ) : null}

        {steps[activeSteps] === 2 ? (
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
                selectedValue={marcaProveedor1}
                style={{
                  height: 50,
                  width: '100%',
                }}
                onValueChange={(itemValue, itemIndex) =>
                  setMarcaProveedor1(itemValue)
                }>
                <Picker.Item color={'red'} label="Marca Proveedor 1" value="" />
                <Picker.Item color={'red'} label="Sidoc" value="Sidoc" />
                <Picker.Item
                  color={'red'}
                  label="GyJ Ferreterías"
                  value="GyJ Ferreterías"
                />
                <Picker.Item
                  color={'red'}
                  label="Tubolaminas"
                  value="Tubolaminas"
                />
                <Picker.Item
                  color={'red'}
                  label="Armetales"
                  value="Armetales"
                />
                <Picker.Item color={'red'} label="Cyrgo" value="Cyrgo" />
                <Picker.Item color={'red'} label="Diaco" value="Diaco" />
                <Picker.Item
                  color={'red'}
                  label="Multialambres"
                  value="Multialambres"
                />
                <Picker.Item
                  color={'red'}
                  label="Ternium- Ferrasa"
                  value="Ternium- Ferrasa"
                />
                <Picker.Item color={'red'} label="Agofer" value="Agofer" />
                <Picker.Item color={'red'} label="sidenal" value="sidenal" />
                <Picker.Item
                  color={'red'}
                  label="Aceros america/ Arequipa"
                  value="Aceros america/ Arequipa"
                />
                <Picker.Item
                  color={'red'}
                  label="Ecuatoriano / Novacero"
                  value="Ecuatoriano / Novacero"
                />
                <Picker.Item
                  color={'red'}
                  label="Ecuatoriano / Adelca"
                  value="Ecuatoriano / Adelca"
                />
                <Picker.Item
                  color={'red'}
                  label="Ecuatoriano / Andec"
                  value="Ecuatoriano / Andec"
                />
                <Picker.Item
                  color={'red'}
                  label="Ecuatoriano / Xenglon"
                  value="Ecuatoriano / Xenglon"
                />
                <Picker.Item
                  color={'red'}
                  label="importado"
                  value="importado"
                />
                <Picker.Item color={'red'} label="steckerl" value="steckerl" />
                <Picker.Item
                  color={'red'}
                  label="paz del rio"
                  value="paz del rio"
                />
                <Picker.Item color={'red'} label="Tul" value="Tul" />
              </Picker>
            </View>

            <RadioButton.Group
              onValueChange={newValue => setProveedorOfreceCupo(newValue)}
              value={proveedorOfreceCupo}>
              <View
                style={{
                  ...styles.picker,
                  flex: 1,
                  flexDirection: 'row',
                }}>
                <View style={{width: '50%'}}>
                  <Text style={{textAlign: 'center', marginTop: '3%'}}>
                    El proveedor ofrece cupo?
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

            {proveedorOfreceCupo === 'Sí' ? (
              <Picker
                selectedValue={proveedorOfreceCupoMonto}
                style={{
                  height: 50,
                  width: '90%',
                  marginLeft: '5%',
                }}
                onValueChange={(itemValue, itemIndex) =>
                  setProveedorOfreceCupoMonto(itemValue)
                }>
                <Picker.Item
                  color={'red'}
                  label="¿Cuál es el monto en millones?"
                  value=""
                />
                <Picker.Item color={'red'} label="0-10" value="0-10" />
                <Picker.Item color={'red'} label="10-30" value="10-30" />
                <Picker.Item color={'red'} label="30-60" value="30-60" />
                <Picker.Item color={'red'} label="60-100" value="60-100" />
                <Picker.Item color={'red'} label="100-200" value="100-200" />
                <Picker.Item color={'red'} label="200-400" value="200-400" />
                <Picker.Item color={'red'} label="400-600" value="400-600" />
                <Picker.Item
                  color={'red'}
                  label="Más de 1000 millones"
                  value="Más de 1000 millones"
                />
              </Picker>
            ) : null}

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

            {vendeAcero === 'No' ? (
              <Picker
                selectedValue={noVendeAcero}
                style={{
                  height: 50,
                  width: '90%',
                  marginLeft: '5%',
                }}
                onValueChange={(itemValue, itemIndex) =>
                  setNoVendeAcero(itemValue)
                }>
                <Picker.Item color={'red'} label="¿Razón?" value="" />
                <Picker.Item
                  color={'red'}
                  label="capacidad de almacenamiento"
                  value="capacidad de almacenamiento"
                />
                <Picker.Item color={'red'} label="costo" value="costo" />
                <Picker.Item
                  color={'red'}
                  label="capacidad logística"
                  value="capacidad logística"
                />
                <Picker.Item
                  color={'red'}
                  label="mercado objetivo"
                  value="mercado objetivo"
                />
                <Picker.Item color={'red'} label="otro" value="otro" />
              </Picker>
            ) : null}
            {vendeAcero === 'No' &&
            ![
              '',
              'capacidad de almacenamiento',
              'capacidad logística',
              'costo',
              'mercado objetivo',
            ].includes(noVendeAcero) ? (
              <TextInput
                style={styles.textInput}
                mode="outlined"
                label={'Cuál? ' + noVendeAcero}
                onChangeText={value => setNoVendeAcero(value)}
                right={<TextInput.Icon name="pencil-outline" color="black" />}
              />
            ) : null}

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
                <Picker.Item
                  color={'red'}
                  label="Tiempo de entrega (días)"
                  value=""
                />
                <Picker.Item color={'red'} label="<=1" value="<=1" />
                <Picker.Item color={'red'} label="2" value="2" />
                <Picker.Item color={'red'} label="3" value="3" />
                <Picker.Item color={'red'} label="4" value="4" />
                <Picker.Item color={'red'} label="5" value="5" />
                <Picker.Item color={'red'} label="6" value="6" />
                <Picker.Item color={'red'} label=">6" value=">6" />
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
                  label="Plazo de pago en días Proveedor (días)"
                  value=""
                  color={'red'}
                />
                <Picker.Item color={'red'} label="0" value="0" />
                <Picker.Item color={'red'} label="30" value="30" />
                <Picker.Item color={'red'} label="45" value="45" />
                <Picker.Item color={'red'} label="60" value="60" />
                <Picker.Item color={'red'} label=">90" value=">90" />
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
                  color={'red'}
                />
                <Picker.Item color={'red'} label="<=1" value="<=1" />
                <Picker.Item color={'red'} label="3" value="3" />
                <Picker.Item color={'red'} label="6" value="6" />
                <Picker.Item color={'red'} label="9" value="9" />
                <Picker.Item color={'red'} label="12" value="12" />
                <Picker.Item color={'red'} label="15" value="15" />
                <Picker.Item color={'red'} label="18" value="18" />
                <Picker.Item color={'red'} label="21" value="21" />
                <Picker.Item color={'red'} label="24" value="24" />
                <Picker.Item color={'red'} label="27" value="27" />
                <Picker.Item color={'red'} label="30" value="30" />
                <Picker.Item color={'red'} label="33" value="33" />
                <Picker.Item color={'red'} label="35" value="35" />
                <Picker.Item color={'red'} label="70" value="70" />
                <Picker.Item color={'red'} label="105" value="105" />
                <Picker.Item color={'red'} label="140" value="140" />
                <Picker.Item color={'red'} label=">175" value=">175" />
              </Picker>
            </View>

            <TextInput
              style={{...styles.textInput}}
              mode="outlined"
              label={
                'Costo barras delgadas antes de iva ($/kg): ' +
                costoBarraDelgada
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
                <Picker.Item color={'red'} label="<=1" value="<=1" />
                <Picker.Item color={'red'} label="3" value="3" />
                <Picker.Item color={'red'} label="6" value="6" />
                <Picker.Item color={'red'} label="9" value="9" />
                <Picker.Item color={'red'} label="12" value="12" />
                <Picker.Item color={'red'} label="15" value="15" />
                <Picker.Item color={'red'} label="18" value="18" />
                <Picker.Item color={'red'} label="21" value="21" />
                <Picker.Item color={'red'} label="24" value="24" />
                <Picker.Item color={'red'} label="27" value="27" />
                <Picker.Item color={'red'} label="30" value="30" />
                <Picker.Item color={'red'} label="33" value="33" />
                <Picker.Item color={'red'} label="35" value="35" />
                <Picker.Item color={'red'} label="70" value="70" />
                <Picker.Item color={'red'} label="105" value="105" />
                <Picker.Item color={'red'} label="140" value="140" />
                <Picker.Item color={'red'} label=">175" value=">175" />
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
        {steps[activeSteps] === 3 ? (
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
            <View>
              <Picker
                selectedValue={marcaProveedor2}
                style={{
                  height: 50,
                  width: '90%',
                  marginLeft: '5%',
                }}
                onValueChange={(itemValue, itemIndex) =>
                  setMarcaProveedor2(itemValue)
                }>
                <Picker.Item label="Marca Proveedor 2" value="" />
                <Picker.Item
                  label="hierros de occidente"
                  value="hierros de occidente"
                  color={'red'}
                />
                <Picker.Item
                  color={'red'}
                  label="hierros hb"
                  value="hierros hb"
                />
                <Picker.Item color={'red'} label="Sidoc" value="Sidoc" />
                <Picker.Item
                  color={'red'}
                  label="GyJ Ferreterías"
                  value="GyJ Ferreterías"
                />
                <Picker.Item
                  color={'red'}
                  label="Tubolaminas"
                  value="Tubolaminas"
                />
                <Picker.Item
                  color={'red'}
                  label="Armetales"
                  value="Armetales"
                />
                <Picker.Item color={'red'} label="Cyrgo" value="Cyrgo" />
                <Picker.Item color={'red'} label="Diaco" value="Diaco" />
                <Picker.Item
                  color={'red'}
                  label="Multialambres"
                  value="Multialambres"
                />
                <Picker.Item
                  color={'red'}
                  label="Ternium- Ferrasa"
                  value="Ternium- Ferrasa"
                />
                <Picker.Item color={'red'} label="Agofer" value="Agofer" />
                <Picker.Item color={'red'} label="sidenal" value="sidenal" />
                <Picker.Item
                  color={'red'}
                  label="Aceros america/ Arequipa"
                  value="Aceros america/ Arequipa"
                />
                <Picker.Item
                  color={'red'}
                  label="Ecuatoriano / Novacero"
                  value="Ecuatoriano / Novacero"
                />
                <Picker.Item
                  color={'red'}
                  label="Ecuatoriano / Adelca"
                  value="Ecuatoriano / Adelca"
                />
                <Picker.Item
                  color={'red'}
                  label="Ecuatoriano / Andec"
                  value="Ecuatoriano / Andec"
                />
                <Picker.Item
                  color={'red'}
                  label="Ecuatoriano / Xenglon"
                  value="Ecuatoriano / Xenglon"
                />
                <Picker.Item
                  color={'red'}
                  label="importado"
                  value="importado"
                />
                <Picker.Item color={'red'} label="steckerl" value="steckerl" />
                <Picker.Item
                  color={'red'}
                  label="paz del rio"
                  value="paz del rio"
                />
                <Picker.Item color={'red'} label="Tul" value="Tul" />
              </Picker>
            </View>
            <View>
              <Picker
                selectedValue={tiempoEntrega2}
                style={{
                  height: 50,
                  width: '90%',
                  marginLeft: '5%',
                }}
                onValueChange={(itemValue, itemIndex) =>
                  setTiempoEntrega2(itemValue)
                }>
                <Picker.Item
                  color={'red'}
                  label="Tiempo de entrega (días)"
                  value=""
                />
                <Picker.Item color={'red'} label="<=1" value="<=1" />
                <Picker.Item color={'red'} label="2" value="2" />
                <Picker.Item color={'red'} label="3" value="3" />
                <Picker.Item color={'red'} label="4" value="4" />
                <Picker.Item color={'red'} label="5" value="5" />
                <Picker.Item color={'red'} label="6" value="6" />
                <Picker.Item color={'red'} label=">6" value=">6" />
              </Picker>
            </View>

            <View>
              <Picker
                selectedValue={plazoPagoDias2}
                style={{
                  height: 50,
                  width: '90%',
                  marginLeft: '5%',
                }}
                onValueChange={(itemValue, itemIndex) =>
                  setPlazoPagoDias2(itemValue)
                }>
                <Picker.Item
                  label="Plazo de pago en días Proveedor (días)"
                  value=""
                />
                <Picker.Item color={'red'} label="0" value="0" />
                <Picker.Item color={'red'} label="30" value="30" />
                <Picker.Item color={'red'} label="45" value="45" />
                <Picker.Item color={'red'} label="60" value="60" />
                <Picker.Item color={'red'} label=">90" value=">90" />
              </Picker>
            </View>

            <View>
              <Picker
                selectedValue={volumenCompraBarraDelgada2}
                style={{
                  height: 50,
                  width: '90%',
                  marginLeft: '5%',
                }}
                onValueChange={(itemValue, itemIndex) =>
                  setVolumenCompraBarraDelgada2(itemValue)
                }>
                <Picker.Item
                  label="Volumen de compra Barras Delgadas (Toneladas)"
                  value=""
                />
                <Picker.Item color={'red'} label="<=1" value="<=1" />
                <Picker.Item color={'red'} label="3" value="3" />
                <Picker.Item color={'red'} label="6" value="6" />
                <Picker.Item color={'red'} label="9" value="9" />
                <Picker.Item color={'red'} label="12" value="12" />
                <Picker.Item color={'red'} label="15" value="15" />
                <Picker.Item color={'red'} label="18" value="18" />
                <Picker.Item color={'red'} label="21" value="21" />
                <Picker.Item color={'red'} label="24" value="24" />
                <Picker.Item color={'red'} label="27" value="27" />
                <Picker.Item color={'red'} label="30" value="30" />
                <Picker.Item color={'red'} label="33" value="33" />
                <Picker.Item color={'red'} label="35" value="35" />
                <Picker.Item color={'red'} label="70" value="70" />
                <Picker.Item color={'red'} label="105" value="105" />
                <Picker.Item color={'red'} label="140" value="140" />
                <Picker.Item color={'red'} label=">175" value=">175" />
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

            <View>
              <Picker
                selectedValue={volumenCompraBarraGruesa2}
                style={{
                  height: 50,
                  width: '90%',
                  marginLeft: '5%',
                }}
                onValueChange={(itemValue, itemIndex) =>
                  setVolumenCompraBarraGruesa2(itemValue)
                }>
                <Picker.Item
                  label="Volumen de compra Barras Gruesas (Toneladas)"
                  value=""
                />
                <Picker.Item color={'red'} label="<=1" value="<=1" />
                <Picker.Item color={'red'} label="3" value="3" />
                <Picker.Item color={'red'} label="6" value="6" />
                <Picker.Item color={'red'} label="9" value="9" />
                <Picker.Item color={'red'} label="12" value="12" />
                <Picker.Item color={'red'} label="15" value="15" />
                <Picker.Item color={'red'} label="18" value="18" />
                <Picker.Item color={'red'} label="21" value="21" />
                <Picker.Item color={'red'} label="24" value="24" />
                <Picker.Item color={'red'} label="27" value="27" />
                <Picker.Item color={'red'} label="30" value="30" />
                <Picker.Item color={'red'} label="33" value="33" />
                <Picker.Item color={'red'} label="35" value="35" />
                <Picker.Item color={'red'} label="70" value="70" />
                <Picker.Item color={'red'} label="105" value="105" />
                <Picker.Item color={'red'} label="140" value="140" />
                <Picker.Item color={'red'} label=">175" value=">175" />
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
              style={{...styles.textInput, marginBottom: '10%'}}
              mode="outlined"
              label={
                'Precio de Venta barras gruesas antes de iva ($/kg): ' +
                precioVentaBarraGruesa2
              }
              onChangeText={value => setPrecioVentaBarraGruesa2(value)}
              right={<TextInput.Icon name="pencil-outline" color="black" />}
            />
            {activeSteps == steps.length - 1 ? (
              <View style={{marginLeft: '5%', marginRight: '5%'}}>
                <Text style={{color: 'red'}}>
                  Usted está por terminar el formulario en la siguiente
                  ubicación
                </Text>
                <Text>
                  Latitud:
                  {location.coords !== undefined
                    ? location.coords.latitude
                    : 'ubicación no habilitada'}
                </Text>
                <Text>
                  Longitud:{' '}
                  {location.coords !== undefined
                    ? location.coords.longitude
                    : 'ubicación no habilitada'}
                </Text>
                <Button
                  style={{...styles.buttonfinalizar, marginBottom: '8%'}}
                  contentStyle={styles.buttonDirection}
                  icon="check"
                  mode="contained"
                  onPress={() => createForm()}>
                  Enviar Formulario
                </Button>
              </View>
            ) : null}
          </View>
        ) : null}
        {steps[activeSteps] === 4 ? (
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
            {vendeCemento === 'No' ? (
              <TextInput
                style={{...styles.textInput}}
                mode="outlined"
                label={'Razón? ' + noVendeCemento}
                onChangeText={value => setNoVendeCemento(value)}
                right={<TextInput.Icon name="pencil-outline" color="black" />}
              />
            ) : null}

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
                <Picker.Item color={'red'} label="Marca Proveedor" value="" />
                <Picker.Item color={'red'} label="Cemex" value="Cemex" />
                <Picker.Item color={'red'} label="Argos" value="Argos" />
                <Picker.Item color={'red'} label="CSM" value="CSM" />
                <Picker.Item color={'red'} label="Holcim" value="Holcim" />
                <Picker.Item color={'red'} label="Alion" value="Alion" />
                <Picker.Item
                  color={'red'}
                  label="Tequendama"
                  value="Tequendama"
                />
                <Picker.Item color={'red'} label="Ultracem" value="Ultracem" />
                <Picker.Item color={'red'} label="Fortecem" value="Fortecem" />
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
                <Picker.Item
                  color={'red'}
                  label="Tiempo de entrega proveedor"
                  value=""
                />
                <Picker.Item color={'red'} label="<=1" value="<=1" />
                <Picker.Item color={'red'} label="2" value="2" />
                <Picker.Item color={'red'} label="3" value="3" />
                <Picker.Item color={'red'} label="4" value="4" />
                <Picker.Item color={'red'} label="5" value="5" />
                <Picker.Item color={'red'} label="6" value="6" />
                <Picker.Item color={'red'} label=">6" value=">6" />
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
                <Picker.Item
                  label="Plazo de pago en días Proveedor (días)"
                  value=""
                />
                <Picker.Item color={'red'} label="0" value="0" />
                <Picker.Item color={'red'} label="15" value="15" />
                <Picker.Item color={'red'} label="30" value="30" />
                <Picker.Item color={'red'} label="60" value="60" />
                <Picker.Item color={'red'} label=">90" value=">90" />
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
                <Picker.Item color={'red'} label="<=1" value="<=1" />
                <Picker.Item color={'red'} label="3" value="3" />
                <Picker.Item color={'red'} label="6" value="6" />
                <Picker.Item color={'red'} label="9" value="9" />
                <Picker.Item color={'red'} label="12" value="12" />
                <Picker.Item color={'red'} label="15" value="15" />
                <Picker.Item color={'red'} label="18" value="18" />
                <Picker.Item color={'red'} label="21" value="21" />
                <Picker.Item color={'red'} label="24" value="24" />
                <Picker.Item color={'red'} label="27" value="27" />
                <Picker.Item color={'red'} label="30" value="30" />
                <Picker.Item color={'red'} label="33" value="33" />
                <Picker.Item color={'red'} label="35" value="35" />
                <Picker.Item color={'red'} label="70" value="70" />
                <Picker.Item color={'red'} label="105" value="105" />
                <Picker.Item color={'red'} label="140" value="140" />
                <Picker.Item color={'red'} label=">=175" value=">=175" />
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
                <Picker.Item color={'red'} label="<=1" value="<=1" />
                <Picker.Item color={'red'} label="3" value="3" />
                <Picker.Item color={'red'} label="6" value="6" />
                <Picker.Item color={'red'} label="9" value="9" />
                <Picker.Item color={'red'} label="12" value="12" />
                <Picker.Item color={'red'} label="15" value="15" />
                <Picker.Item color={'red'} label="18" value="18" />
                <Picker.Item color={'red'} label="21" value="21" />
                <Picker.Item color={'red'} label="24" value="24" />
                <Picker.Item color={'red'} label="27" value="27" />
                <Picker.Item color={'red'} label="30" value="30" />
                <Picker.Item color={'red'} label="33" value="33" />
                <Picker.Item color={'red'} label="35" value="35" />
                <Picker.Item color={'red'} label="70" value="70" />
                <Picker.Item color={'red'} label="105" value="105" />
                <Picker.Item color={'red'} label="140" value="140" />
                <Picker.Item color={'red'} label=">=175" value=">=175" />
              </Picker>
            </View>

            <TextInput
              style={{...styles.textInput}}
              mode="outlined"
              label={'Costo cemento ($ con iva incluido): ' + costoCemento}
              onChangeText={value => setCostoCemento(value)}
              right={<TextInput.Icon name="pencil-outline" color="black" />}
            />
            <TextInput
              style={{...styles.textInput, marginBottom: '8%'}}
              mode="outlined"
              label={
                'Precio de Venta Público ($antes de iva/ bulto 50kg): ' +
                precioVentaCemento
              }
              onChangeText={value => setPrecioVentaCemento(value)}
              right={<TextInput.Icon name="pencil-outline" color="black" />}
            />
            {activeSteps == steps.length - 1 ? (
              <View style={{marginRight: '5%', marginLeft: '5%'}}>
                <Text style={{color: 'red'}}>
                  Usted está por terminar el formulario en la siguiente
                  ubicación
                </Text>
                <Text>
                  Latitud:{' '}
                  {location.coords == undefined
                    ? 'no hay ubicacion disponible'
                    : location.coords.latitude}
                </Text>
                <Text>
                  Longitud:{' '}
                  {location.coords == undefined
                    ? 'no hay ubicacion disponible'
                    : location.coords.longitude}
                </Text>
                <Button
                  style={{...styles.buttonfinalizar, marginBottom: '8%'}}
                  contentStyle={styles.buttonDirection}
                  icon="check"
                  mode="contained"
                  onPress={() => createForm()}>
                  Enviar Formulario
                </Button>
              </View>
            ) : null}
          </View>
        ) : null}
        {steps[activeSteps] === 5 ? (
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
                selectedValue={categoria}
                style={{
                  height: 50,
                  width: '100%',
                }}
                onValueChange={(itemValue, itemIndex) =>
                  setCategoria(itemValue)
                }>
                <Picker.Item color={'red'} label="Categoría" value="" />
                <Picker.Item color={'red'} label="Acero" value="Acero" />
                <Picker.Item color={'red'} label="Cemento" value="Cemento" />
                <Picker.Item color={'red'} label="No sidoc" value="No sidoc" />
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
                <Picker.Item color={'red'} label="Marca" value="" />
                <Picker.Item color={'red'} label="Acesco" value="Acesco" />
                <Picker.Item
                  color={'red'}
                  label="Corpacero"
                  value="Corpacero"
                />
                <Picker.Item color={'red'} label="Colmena" value="Colmena" />
                <Picker.Item color={'red'} label="Fanalca" value="Fanalca" />
                <Picker.Item color={'red'} label="Arme" value="Arme" />
                <Picker.Item
                  color={'red'}
                  label="Trefilados"
                  value="Trefilados"
                />
                <Picker.Item
                  color={'red'}
                  label="Corpacero"
                  value="Corpacero"
                />
                <Picker.Item color={'red'} label="Ipac" value="Ipac" />
                <Picker.Item
                  color={'red'}
                  label="Icoperfiles"
                  value="Icoperfiles"
                />
                <Picker.Item color={'red'} label="La Campana" value="Campana" />
                <Picker.Item color={'red'} label="Eternit" value="Eternit" />
                <Picker.Item
                  color={'red'}
                  label="Etex-Colombia"
                  value="Etex-Colombia"
                />
                <Picker.Item color={'red'} label="Toptec" value="Toptec" />
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
              label={
                facturacionMensual === ''
                  ? 'Facturación mensual promedio antes de iva/ (kilos si aplica)'
                  : 'Facturación mensual promedio: ' + facturacionMensual
              }
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
              style={{...styles.textInput}}
              mode="outlined"
              label={'precio venta (antes de iva): ' + precioVenta}
              onChangeText={value => setPrecioVenta(value)}
              right={<TextInput.Icon name="pencil-outline" color="black" />}
            />
            <View style={styles.picker}>
              <Picker
                selectedValue={categoriaProductoId}
                style={{
                  height: 50,
                  width: '100%',
                }}
                onValueChange={(itemValue, itemIndex) => {
                  setCategoriaProductoId(itemValue);
                  filterSubCategoria(itemValue);
                }}>
                <Picker.Item
                  color={'red'}
                  label="Categoría de Producto"
                  value=""
                />
                {categoriasProducto.map(element => (
                  <Picker.Item
                    key={element.categoria}
                    label={element.categoria}
                    value={element.categoria}
                  />
                ))}
              </Picker>
            </View>
            <View style={styles.picker}>
              <Picker
                selectedValue={subCategoriaProductoId}
                style={{
                  height: 50,
                  width: '100%',
                }}
                onValueChange={(itemValue, itemIndex) => {
                  setSubCategoriaProductoId(itemValue);
                }}>
                <Picker.Item
                  color={'red'}
                  label="Subcategoria de Producto"
                  value=""
                />
                {subCategoriasProducto.map(element => (
                  <Picker.Item
                    key={element.subcategoria}
                    label={element.subcategoria}
                    value={element.subcategoria}
                  />
                ))}
              </Picker>
            </View>
            <TextInput
              style={{...styles.textInput}}
              mode="outlined"
              keyboardType="numeric"
              label={'Volumen de compra en dinero: ' + volumenCompraNoSidoc}
              onChangeText={value => setVolumenCompraNoSidoc(value)}
              right={<TextInput.Icon name="pencil-outline" color="black" />}
            />
            <TextInput
              style={{...styles.textInput}}
              mode="outlined"
              keyboardType="numeric"
              label={'Precio unitario: ' + precioUnitarioNoSidoc}
              onChangeText={value => setPrecioUnitarioNoSidoc(value)}
              right={<TextInput.Icon name="pencil-outline" color="black" />}
            />
            {activeSteps == steps.length - 1 ? (
              <View style={{marginRight: '5%', marginLeft: '5%', marginTop:'2%'}}>
                <Text style={{color: 'red', fontSize: 16}}>
                  Usted está por terminar el formulario en la siguiente ubicación
                </Text>
                <Text style={{marginTop: '2%'}}>
                  Latitud:
                  {location.coords === undefined
                    ? 'no hay latitud disponible'
                    : ' ' + location.coords.latitude}
                </Text>
                <Text>
                  Longitud:
                  {location.coords === undefined
                    ? 'no hay longitud disponible'
                    : ' ' + location.coords.longitude}
                </Text>
                <Button
                  style={{...styles.buttonfinalizar, marginBottom: '8%'}}
                  contentStyle={styles.buttonDirection}
                  icon="check"
                  mode="contained"
                  onPress={() => createForm()}>
                  Enviar Formulario
                </Button>
              </View>
            ) : null}
          </View>
        ) : null}
        <Portal>
          <Dialog
            visible={showClientes}
            onDismiss={() => {
              () => setShowClientes(false);
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
                      onChangeText={value => searchClientById(value)}
                      onClearPress={() => setClientes([])}
                    />
                    <FlatList
                      data={clientes}
                      renderItem={renderClient}
                      keyExtractor={(item, index) => '' + index}
                    />
                  </ScrollView>
                </SafeAreaView>
              </View>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setShowClientes(false)}>OK</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <Portal>
          <Dialog
            visible={showFecha}
            onDismiss={() => {
              hideDate();
            }}>
            <Dialog.Title>Seleccionar Fecha Final</Dialog.Title>
            <Dialog.Content>
              <DatePicker open={true} date={fecha} onDateChange={setFecha} />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => hideDate()}>OK</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </ScrollView>
      {activeSteps > -1 ? (
        <FAB
          style={styles.fabLeft}
          small
          icon="arrow-left-thick"
          onPress={() => setActiveSteps(activeSteps - 1)}
        />
      ) : null}
      {activeSteps < steps.length - 1 && activeSteps !== -1 ? (
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
  buttonfinalizar: {
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
