import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialIcons";
import { debounce } from "lodash";
import { adjust, calcWidth } from "~/assets/Dimensions";

const styles = StyleSheet.create({
  inputSearchContainer: {
    borderRadius: 15,
    width: "100%",
    height: 49,
    flexDirection: "row",
    position: "relative",
  },
  inputSearch: {
    width: "100%",
    fontSize: adjust(10),
    fontFamily: "HelveticaNowMicro-Regular",
    color: "#FFFFFF",
    borderColor: "#FFFFFF",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: "7%",
  },
  inputSearchIconContainer: {
    position: "absolute",
    right: calcWidth(5),
    top: calcWidth(3),
  },
});

const onSearch = (text, handleOnSearch, debounceTime) =>
  debounce(() => handleOnSearch(text), debounceTime)();

const InputSearch = ({
  handleOnSearch,
  debounceTime = 500,
  value,
  inputStyles,
  placeholder,
}) => {
  return (
    <View style={[styles.inputSearchContainer, inputStyles]}>
      <TextInput
        onChangeText={(text) => onSearch(text, handleOnSearch, debounceTime)}
        placeholderTextColor="#23203F"
        placeholder={placeholder}
        placeholderTextColor="rgba(255,255,255,0.6)"
        style={styles.inputSearch}
        value={value}
      />

      <View style={styles.inputSearchIconContainer}>
        <MaterialCommunityIcons color={"#FFFFFF"} name={"search"} size={25} />
      </View>
    </View>
  );
};

export default InputSearch;
