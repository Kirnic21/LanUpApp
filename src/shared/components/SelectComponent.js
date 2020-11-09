import React from "react";
import { View, Text, TouchableHighlight, StyleSheet } from "react-native";
import ModalDropdown from "react-native-modal-dropdown";
import dimensions, { adjust } from "~/assets/Dimensions";
import Icon from "react-native-vector-icons/FontAwesome";

const SelectComponent = ({ value, options, onSelect, label }) => {
  const displayRow = data => {
    return (
      <TouchableHighlight>
        <View style={{ padding: "5%" }}>
          <Text
            style={[styles.title, { color: "#23203F" }]}
          >{`${data.description}`}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <View>
      <Text style={styles.title}>{label}</Text>
      <ModalDropdown
        options={options}
        onSelect={onSelect}
        renderRow={row => displayRow(row)}
        dropdownStyle={{ width: "60%" }}
        style={styles.modal}
      >
        <View style={styles.content}>
          <Text style={styles.title}>{value ? value : "Selecione..."}</Text>
          <Icon name={"sort-down"} size={dimensions(15)} color="#FFF" />
        </View>
      </ModalDropdown>
    </View>
  );
};

const styles = StyleSheet.create({
  TextInput: {
    borderWidth: 2,
    color: "#FFF",
    paddingHorizontal: "7%"
  },
  title: {
    color: "#FFF",
    fontSize: adjust(10),
    fontFamily: "HelveticaNowMicro-Regular"
  },
  modal: {
    borderColor: "#FFF",
    borderWidth: 2,
    height: dimensions(45),
    borderRadius: dimensions(50),
    justifyContent: "center"
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: "6%"
  }
});

export default SelectComponent;
