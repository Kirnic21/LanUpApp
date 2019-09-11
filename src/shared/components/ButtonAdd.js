import React from 'react'
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Text
} from 'react-native'
import ImageAdd from '../../assets/images/icon_add.png'

export default ButtonAdd = ({ value }) => (
  <TouchableOpacity>
    <View style={{ ...styles.Add, flexDirection: "row", marginTop: 10 }}>
      <Image source={ImageAdd} style={{ height: 20, width: 20, marginRight: 10, marginTop: 5 }} />
      <Text style={{ color: '#865FC0', fontSize: 13, marginBottom: 15, marginTop: 5 }}>
        {value}
      </Text>
    </View>
  </TouchableOpacity>
)

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  Add: {
    paddingTop: 10,
    paddingBottom: 10,
    color: '#46C5F3',
    padding: 20,
    backgroundColor: '#24203B',
    borderRadius: 10,
    fontSize: 15,
    width: width - 50
  }
});
