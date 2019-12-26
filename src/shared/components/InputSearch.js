import React from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { debounce } from 'lodash'

const styles = StyleSheet.create({
  inputSearchContainer: {
    borderColor: '#FFF',
    borderWidth: 2,
    borderRadius: 4,
    width: '100%',
    height: 50,
    flexDirection: 'row',
    paddingHorizontal: 11
  },
  inputSearch: {
    width: '90%',
    fontSize: 18,
    fontFamily: 'Montserrat',
    color: '#FFF' 
  },
  inputSearchIconContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
})

const onSearch = (text, handleOnSearch, debounceTime) => debounce(() => handleOnSearch(text), debounceTime)()

const InputSearch = ({ handleOnSearch, debounceTime = 500 }) => {
  return (
    <View style={styles.inputSearchContainer}>
      <TextInput onChangeText={text => onSearch(text, handleOnSearch, debounceTime)} placeholderTextColor="#BDBDBD" placeholder="Endereço" style={styles.inputSearch} />

      <View style={styles.inputSearchIconContainer}>
        <MaterialCommunityIcons color={'#BDBDBD'} name={'magnify'} size={25} />
      </View>
    </View>
  )
}

export default InputSearch