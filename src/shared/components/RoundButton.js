import React from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native'

export default RoundButton = ({ name, style, onPress }) => (
  <View style={styles.buttonContent}>
    <TouchableOpacity style={style} onPress={onPress}>
      <Text style={{ color: 'white', fontSize: 13 }}>{name}</Text>
    </TouchableOpacity>
  </View>
)

const styles = StyleSheet.create({
  buttonContent: {
    flexDirection: 'row',
    width: 250,
    margin: 20,
  }
});
