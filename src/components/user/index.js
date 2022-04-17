import React, {useState, Fragment} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  FlatList,
  ScrollView,
  Image,
} from 'react-native';
import {
  Text,
  Button,
  Portal,
  Dialog,
  Card,
  Avatar,
  TextInput,
  Switch,
  Snackbar,
  FAB,
  Title,
} from 'react-native-paper';
import {useSelector} from 'react-redux';
import moment from 'moment';
import SearchBar from 'react-native-dynamic-search-bar';

const UserForm = ({navigation}) => {
  const login = useSelector(state => state.reducer.user);
  const path = useSelector(state => state.reducer.baseUrl);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState([]);
  const [encuestador, setEncuestador] = useState('');
  const [showPortal, setShowPortal] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState(false);
  //refs

  let userIdRef = React.useRef(null);
  let passwordRef = React.useRef(null);
  let nameRef = React.useRef(null);
  let encuestadorRef = React.useRef(null);
  //location
  const saveUser = () => {
    if (userId === undefined || userId === '') {
      setShowMessage(true);
      setMessage('El id del usuario no puede estar vacio');
    } else if (password === undefined || password === '') {
      setShowMessage(true);
      setMessage('La contraseña no puede ser vacia');
    } else if (name === undefined || name === '') {
      setShowMessage(true);
      setMessage('El nombre no puede estar vacio');
    } else {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId.toString(),
          password: password.toString(),
          name: name.toString(),
          encuestador: encuestador.toString(),
          isActive: isActive,
          isAdmin: isAdmin,
        }),
      };
      fetch(path + '/user/save', requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log(JSON.stringify(data));
          if (data.success) {
            setUserId('');
            setPassword('');
            setName('');
            setIsActive(false);
            setIsAdmin(false);
            setUsers([]);
            setEncuestador('');
            setShowMessage(true);
            setMessage('Registro realizado');
          } else {
            setShowMessage(true);
            setMessage(data.message);
          }
        })
        .catch(error => {
          console.log(error);
          setShowMessage(true);
          setMessage('Error al registrar información');
        });
    }
  };

  const searchUser = value => {
    setShowSpinner(true);
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    console.log(path + '/user?name=' + value);
    if (value !== undefined && value !== '') {
      fetch(path + '/user?name=' + value, requestOptions)
        .then(response => response.json())
        .then(data => {
          setShowSpinner(false);
          setUsers(data);
        })
        .catch(error => {
          setShowSpinner(false);
          setUsers([]);
        });
    } else {
      setUsers([]);
    }
  };

  const renderUser = ({item}) => (
    <Card
      style={{borderWidth: 2, marginBottom: '5%'}}
      elevation={0.2}
      onPress={() => {
        setUserId(item.userId);
        setName(item.name);
        setEncuestador(item.encuestador);
        setPassword(item.password);
        setIsActive(item.isActive);
        setIsAdmin(item.isAdmin);
        setShowPortal(false);
      }}>
      <Card.Title
        title={item.userId.toString()}
        subtitle={item.name}
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
          <Text style={{fontWeight: 'bold'}}>Fecha Creación: </Text>
          {moment(item.createdAt).format('DD-MM-YYYY')}
        </Text>
        <Text style={{textAlign: 'justify', fontSize: 10, marginBottom: '2%'}}>
          <Text style={{fontWeight: 'bold'}}>Está Activo </Text>
          {item.isActive ? 'Sí' : 'No'}
        </Text>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView>
      <ScrollView>
        {login.user.isAdmin ? (
          <Fragment>
            <View
              style={{
                marginTop: '10%',
                marginRight: '5%',
                marginLeft: '5%',
                height: '100%',
              }}>
              <TextInput
                ref={userIdRef}
                value={userId}
                style={styles.textInput}
                mode="outlined"
                label={userId === '' ? 'Usuario ID' : userId}
                onChangeText={value => setUserId(value)}
                right={<TextInput.Icon name="pencil-outline" color="black" />}
              />
              <TextInput
                ref={passwordRef}
                value={password}
                style={styles.textInput}
                mode="outlined"
                label={password === '' ? 'Contraseña' : password}
                onChangeText={value => setPassword(value)}
                right={<TextInput.Icon name="pencil-outline" color="black" />}
              />
              <TextInput
                ref={nameRef}
                value={name}
                style={styles.textInput}
                mode="outlined"
                label={name === '' ? 'Nombre' : name}
                onChangeText={value => setName(value)}
                right={<TextInput.Icon name="pencil-outline" color="black" />}
              />
              <TextInput
                ref={encuestadorRef}
                value={encuestador}
                style={styles.textInput}
                mode="outlined"
                label={encuestador === '' ? 'Encuestador ID' : encuestador}
                onChangeText={value => setEncuestador(value)}
                right={<TextInput.Icon name="pencil-outline" color="black" />}
              />
              <View style={styles.viewHorizontal}>
                <Text>Está Activo</Text>
                <Switch
                  trackColor={{false: '#767577', true: 'green'}}
                  value={isActive}
                  onValueChange={() => {
                    setIsActive(!isActive);
                  }}
                />
              </View>
              <View style={styles.viewHorizontal}>
                <Text>Es Administrador</Text>
                <Switch
                  trackColor={{false: '#767577', true: 'green'}}
                  value={isAdmin}
                  onValueChange={() => {
                    setIsAdmin(!isAdmin);
                  }}
                />
              </View>
              <Button
                style={{
                  marginBottom: '5%',
                  marginTop: '5%',
                  paddingTop: '1%',
                  paddingBottom: '1%',
                }}
                mode="contained"
                onPress={() => {
                  saveUser();
                }}>
                <Text style={{color: 'white'}}>Guardar</Text>
              </Button>
            </View>
            <FAB
              style={styles.fab}
              small
              icon="magnify"
              onPress={() => setShowPortal(true)}
            />
            <Portal>
              <Dialog
                visible={showPortal}
                onDismiss={() => {
                  () => setShowPortal(false);
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
                          onChangeText={value => searchUser(value)}
                          onClearPress={() => setUsers([])}
                        />
                        <FlatList
                          showsVerticalScrollIndicator={false}
                          data={users}
                          renderItem={renderUser}
                          keyExtractor={(item, index) => '' + index}
                        />
                      </ScrollView>
                    </SafeAreaView>
                  </View>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button onPress={() => setShowPortal(false)}>OK</Button>
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
          </Fragment>
        ) : (
          <View style={{alignItems: 'center'}}>
            <Title
              style={{
                marginTop: '5%',
                textAlign: 'center',
                marginBottom: '5%',
              }}>
              Usuario no tiene permisos
            </Title>
            <Image
              style={styles.logo}
              source={require('../../assets/block.png')}
            />
          </View>
        )}
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
    width: 80,
    height: 80,
    resizeMode: 'center',
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    top: 0,
  },
});

export default UserForm;
