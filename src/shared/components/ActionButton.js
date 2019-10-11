import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default ActionButton = ({ name, style, onPress }) => (
  <View style={styles.buttonContent}>
    <TouchableOpacity
      style={[style, {
        alignItems: 'center',
        width: 80,
        height: 80,
        justifyContent: 'center',

      }]}
      onPress={onPress}
    >
      <Icon
        name="add"
        size={35}
        color="#FFF"
        style={{ }}
      />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  buttonContent: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: '#7541BF',
  },
});
