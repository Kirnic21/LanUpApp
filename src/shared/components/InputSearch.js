import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { debounce } from "lodash";

const styles = StyleSheet.create({
  inputSearchContainer: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    width: "100%",
    height: 50,
    flexDirection: "row",
    paddingHorizontal: 11
  },
  inputSearch: {
    width: "90%",
    fontSize: 18,
    fontFamily: "Montserrat",
    color: "#23203F"
  },
  inputSearchIconContainer: {
    justifyContent: "center",
    alignItems: "flex-start"
  }
});

const onSearch = (text, handleOnSearch, debounceTime) =>
  debounce(() => handleOnSearch(text), debounceTime)();

const InputSearch = ({ handleOnSearch, debounceTime = 500, value }) => {
  return (
    <View style={styles.inputSearchContainer}>
      <TextInput
        onChangeText={text => onSearch(text, handleOnSearch, debounceTime)}
        placeholderTextColor="#23203F"
        placeholder="Endereço"
        style={styles.inputSearch}
        value={value}
      />

      <View style={styles.inputSearchIconContainer}>
        <MaterialCommunityIcons color={"#23203F"} name={"magnify"} size={25} />
      </View>
    </View>
  );
};

export default InputSearch;
