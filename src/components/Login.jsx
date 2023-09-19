import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {React, useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {useNavigation} from '@react-navigation/native';
import appi from './ApiConfig';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigation();
  const toRegister = () => {
    navigate.navigate('Register');
  };

  const login = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        navigate.navigate('Home');
        setPassword('');
        setEmail('');
      })
      .catch(error => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.loginArea}>
        <TextInput
          value={email}
          onChangeText={text => setEmail(text)}
          placeholder="Email"
          style={styles.input}
        />
        <TextInput
          value={password}
          onChangeText={text => setPassword(text)}
          placeholder="Password"
          style={styles.input}
        />
        <TouchableOpacity onPress={login} style={styles.btnArea}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={toRegister}>
        <Text style={styles.registerText}>
          Tap here if you are not registered
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    width: '100%',
    marginBottom: 25,
    fontSize: 20,
  },
  loginArea: {
    alignItems: 'center',
    width: '80%',
  },
  btnArea: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
  },
  btnText: {
    color: '#fff',
    fontSize: 23,
  },
  registerText: {
    marginTop: 100,
    fontWeight: 'bold',
  },
});

export default Login;
