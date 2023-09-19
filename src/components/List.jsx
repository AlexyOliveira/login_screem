import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const List = ({data}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{data.nome}</Text>
      <Text style={styles.text}>{data.cargo}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginBottom: 5,
    padding: 10,
    backgroundColor: 'black',
  },
  text: {
    color: 'white',
    fontSize: 17,
  },
});

export default List;
