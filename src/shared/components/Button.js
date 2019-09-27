import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';

export default Button = ({ name, click }) => (
  <View style={{ alignItems: 'center' }}>
    <TouchableOpacity style={styles.button} onPress={e => click && click(e)}>
      <Text style={{ color: 'white', fontSize: 13 }}>{name}</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  button: {
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#483D8B',
    borderColor: '#483D8B',
    borderWidth: 1.5,
    borderRadius: 50,
    height: 55,
    width: 150,
  },
});
