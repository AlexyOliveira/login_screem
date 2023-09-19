import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {React, useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth';
import {getDatabase, ref, set} from 'firebase/database';
import appi from './ApiConfig';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const db = getDatabase();

  const navigate = useNavigation();
  const toLogin = () => {
    navigate.navigate('Login');
  };

  const register = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const userId = userCredential.user.uid;
        set(ref(db, `users/${userId}`), {
          nome: name,
        });
        alert(`Usuario: ${userId}, cadastrado com sucesso!`);
        navigate.navigate('Login');
      })
      .catch(error => {
        const errorCode = error.code;
        console.log(errorCode);
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.loginArea}>
        <Text style={styles.registerTitle}>Create your account</Text>

        <TextInput
          value={name}
          onChangeText={text => setName(text)}
          placeholder="Name"
          style={styles.input}
        />
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
        <TouchableOpacity style={styles.btnArea}>
          <Text onPress={register} style={styles.btnText}>
            Register
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={toLogin}>
        <Text style={styles.registerText}>Already have an account?</Text>
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
  registerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 50,
  },
});

export default Register;
