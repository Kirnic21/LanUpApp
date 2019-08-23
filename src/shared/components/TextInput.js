import React from 'react'
import {
  StyleSheet,
  View,
  Image
} from 'react-native'

export default TextInput = ({ icon, click }) => (
  <View style={styles.item}>
    <Text style={{ color: 'white', fontSize: 15, marginBottom: 20 }}>
      {item.title}
    </Text>
    <View>
      <TouchableOpacity style={this.state.selected == false ? styles.TextInput : styles.TextInputSelected} onPress={this.SelectedInput}>
        <TextInput
          style={styles.ValueInput}
        />
      </TouchableOpacity>
    </View>
  </View>
)

const styles = StyleSheet.create({
  item: {
    padding: 20,
    fontSize: 18
  },
  TextInput: {
    borderColor: "white",
    borderWidth: 1.5,
    borderRadius: 50
  },
  TextInputSelected: {
    borderColor: "#F13567",
    borderWidth: 1.8,
    borderRadius: 50,
    height: 60
  }
});