import React from 'react'
import {
  StyleSheet,
  View,
  Image
} from 'react-native'

export default Box = ({icon, click}) => (
  <View
    style={styles.BoxPhoto}
    onClick={e => click && click(e)}
  >
    <Image  
      style={styles.IconBox}
      source={icon}/>
  </View>
)

const styles = StyleSheet.create({
  IconBox: {
    borderRadius: 10,
    width: 58,
    height: 58,
  },
  BoxPhoto: {
    borderColor: "white",
    borderWidth: 1.5,
    borderRadius: 10,
    width: 60,
    height: 60
  }
});