import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';

export default InputLabel = ({ title }) => (
  <View>
    <View>
      <Text style={{ color: 'white', fontSize: 13 }}>{title}</Text>
    </View>
    <View>
      <TouchableOpacity style={styles.TextInput} onPress={event => this.SelectedInput(event)}>
        <TextInput
          style={{ height: 45, width: 250 }}
        />
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  TextInput: {
    borderColor: 'white',
    borderWidth: 1.5,
    borderRadius: 50,
  },
});
