import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {getDatabase, ref, onValue, set, push} from 'firebase/database';
import React, {useEffect, useState} from 'react';
import List from './List';

const Home = () => {
  const [nome, setNome] = useState('');
  const [cargo, setCargo] = useState('');
  const [loading, setLoading] = useState(true);
  const [usuarios, setUsuarios] = useState([]);
  const db = getDatabase();

  const getNome = async () => {
    // SETAR UMA LISTA DE USUÁ RIOS
    setLoading(false);
    const usuariosRef = ref(db, 'employees');
    const usuariosArray = [];

    onValue(usuariosRef, snapshot => {
      snapshot.forEach(childSnapshot => {
        const data = {
          key: childSnapshot.key,
          nome: childSnapshot.val().nome,
          cargo: childSnapshot.val().cargo,
        };
        usuariosArray.push(data);
      });
      setUsuarios(usuariosArray.reverse());
      setLoading(true);
    });
  };

  useEffect(() => {
    getNome();
  }, []);

  const cadastrar = async () => {
    if (nome !== '' && cargo !== '') {
      const novoUsuarioRef = push(ref(db, 'employees'));
      const novoUsuarioKey = novoUsuarioRef.key;
      await set(ref(db, `employees/${novoUsuarioKey}`), {
        nome: nome,
        cargo: cargo,
      });
    }
    getNome();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Nome</Text>
      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        onChangeText={text => setNome(text)}
      />

      <Text style={styles.texto}>Cargo</Text>
      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        onChangeText={text => setCargo(text)}
      />

      <Button title="Novo Funcionario" onPress={cadastrar} />
      {loading ? (
        <FlatList
          data={usuarios}
          keyExtractor={item => item.key}
          renderItem={({item}) => <List data={item} />}
        />
      ) : (
        <ActivityIndicator size={45} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  texto: {
    fontSize: 20,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'grey',
    height: 40,
    fontSize: 17,
  },
});

export default Home;
