import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';

export default RoundButton = ({ name, style, disabled, onPress }) => (
  <View style={styles.buttonContent}>
    <TouchableOpacity disabled={disabled} style={disabled ? [...style, styles.disabled] : style} onPress={onPress}>
      <Text style={{ color: 'white', fontSize: 13 }}>{name}</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  buttonContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    // width: 250,
    margin: 20,
  },
  disabled: {
    backgroundColor: "#6C757D",
  }
});
