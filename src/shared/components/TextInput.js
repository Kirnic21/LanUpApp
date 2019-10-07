import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import { progressPercentage } from 'style-value-types';


export default Input = ({
  name, style, onPress, props,
}) => (
  <View style={styles.buttonContent}>
    <TouchableOpacity style={style} onPress={onPress} />
  </View>
);

const styles = StyleSheet.create({
  buttonContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    // width: 250,
    margin: 20,
  },
});
