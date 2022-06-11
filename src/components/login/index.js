import React, {useState} from 'react';
import {StyleSheet, View, Image, SafeAreaView, Text} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useDispatch, useSelector} from 'react-redux';
import {changeUrl, postLogin} from '../../actions/login';
import {Dialog, Portal, Snackbar, Button, TextInput} from 'react-native-paper';

const Login = ({navigation}) => {
  //component variables
  const [username, setUsername] = useState('');
  const [basepath, setBasePath] = useState('http://181.48.13.178:3001');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [visible, setVisible] = React.useState(false);
  const [visibleChangePass, setVisibleChangePass] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [showFinalMessage, setShowFinalMessage] = React.useState(false);
  //reducer variables
  const path = useSelector(state => state.reducer.baseUrl);
  //reducer functions
  const dispatch = useDispatch();

  //component functions
  const requestLogin = () => {
    dispatch(changeUrl(path));
    console.log(basepath);
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({AppUserID: username, AppUserPassword: password}),
    };
    fetch(basepath + '/user/login', requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data.status === 200) {
          dispatch(postLogin(data.payload.User));
          navigation.navigate('Ordenes');
        } else {
          setMessage(data.message);
          setVisible(true);
        }
      })
      .catch(error => {
        setMessage(error.message);
        setVisible(true);
      });
  };

  const requestToken = () => {
    dispatch(changeUrl(path));
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({AppUserID: username}),
    };
    if (username !== undefined && username !== '') {
      fetch(basepath + '/user/pass/code', requestOptions)
        .then(response => response.json())
        .then(data => {
          if (data.status === 200) {
            setMessage(data.message);
            setVisibleChangePass(false);
            setShowFinalMessage(true);
          } else {
            setMessage(data.message);
            setVisibleChangePass(false);
            setShowFinalMessage(true);
          }
        })
        .catch(error => {
          setMessage('error no se pudo envíar el token');
          setVisibleChangePass(false);
          setShowFinalMessage(true);
        });
    } else {
      setMessage('Debe ingresar el usuario');
      setVisibleChangePass(false);
      setShowFinalMessage(true);
    }
  };

  const requestChangePassword = () => {
    dispatch(changeUrl(path));
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        AppUserID: username,
        Code: token,
        AppUserPassword: password,
      }),
    };
    if (username !== undefined && username !== '') {
      fetch(basepath + '/user/pass/reset', requestOptions)
        .then(response => response.json())
        .then(data => {
          if (data.status === 200) {
            setMessage(data.message);
            setVisibleChangePass(false);
            setShowFinalMessage(true);
          } else {
            setMessage(data.message);
            setVisibleChangePass(false);
            setShowFinalMessage(true);
          }
        })
        .catch(error => {
          setMessage('error no se pudo envíar el token');
          setVisibleChangePass(false);
          setShowFinalMessage(true);
        });
    } else {
      setMessage('Debe ingresar el usuario');
      setVisibleChangePass(false);
      setShowFinalMessage(true);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.rootContainer}>
        <Image style={styles.logo} source={require('../../assets/logo.png')} />
        <Picker
          style={{
            height: 40,
            marginLeft: '5%',
            marginRight: '5%',
            width: '90%',
            color: '#074a74',
          }}
          selectedValue={basepath}
          onValueChange={(itemValue, itemIndex) => {
            setBasePath(itemValue);
          }}>
          <Picker.Item label="Red Pública" value="http://181.48.13.178:3001" />
          <Picker.Item label="Red Privada" value="http://192.168.1.42:3001" />
        </Picker>
        <TextInput
          style={styles.textInput}
          mode="outlined"
          label="Usuario"
          onChangeText={value => setUsername(value)}
          right={<TextInput.Icon name="face" color="black" />}
        />
        <TextInput
          style={styles.textInput}
          mode="outlined"
          label="Contraseña"
          secureTextEntry={hidePassword}
          onChangeText={value => setPassword(value)}
          right={
            <TextInput.Icon
              name="eye"
              color="black"
              onPress={() => setHidePassword(!hidePassword)}
            />
          }
        />

        <Button
          style={styles.button}
          contentStyle={styles.buttonDirection}
          icon="check"
          mode="contained"
          onPress={() => requestLogin()}>
          Ingresar
        </Button>
        <Button
          style={styles.button}
          contentStyle={styles.buttonDirection}
          mode="text"
          onPress={() => setVisibleChangePass(true)}>
          Recuperar Contraseña
        </Button>

        {/* <Button style={styles.button} mode='text' onPress={() => setShowEntorno(true)}>
                    Cambiar Entorno
                </Button> */}
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

      <Portal>
        <Dialog
          visible={showFinalMessage}
          onDismiss={() => {
            () => setShowFinalMessage(false);
          }}>
          {/* eslint-disable-next-line react-native/no-inline-styles */}
          <Dialog.Title style={{textAlign: 'center', color: 'green'}}>
            Información
          </Dialog.Title>
          <Dialog.Content>
            <Text>{message}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowFinalMessage(false)}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Portal>
        <Dialog
          visible={visibleChangePass}
          onDismiss={() => {
            setVisibleChangePass(false);
          }}>
          <Dialog.Title>Cambiar Contraseña</Dialog.Title>
          <Dialog.Content>
            <TextInput
              style={styles.textInput}
              mode="outlined"
              onChangeText={value => setUsername(value)}
              label="Usuario"
              right={<TextInput.Icon name="account-outline" color="black" />}
            />
            <Button
              style={styles.button}
              contentStyle={styles.buttonDirection}
              icon="shield-account-outline"
              mode="contained"
              onPress={() => requestToken()}>
              Enviar Token
            </Button>
            <TextInput
              style={styles.textInput}
              mode="outlined"
              onChangeText={value => setToken(value)}
              label="Token"
              right={<TextInput.Icon name="lock-open-outline" color="black" />}
            />
            <TextInput
              style={styles.textInput}
              mode="outlined"
              onChangeText={value => setPassword(value)}
              label="Nueva Contraseña"
              right={<TextInput.Icon name="check" color="black" />}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisibleChangePass(false)}>
              Cancelar
            </Button>
            <Button onPress={() => requestChangePassword()} mode="contained">
              OK
            </Button>
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
  textInput: {
    marginTop: '5%',
    marginLeft: '5%',
    marginRight: '5%',
    backgroundColor: 'white',
  },
  logo: {
    marginLeft: '2%',
    marginRight: '5%',
    marginTop: '10%',
    width: '100%',
    height: '30%',
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

export default Login;
