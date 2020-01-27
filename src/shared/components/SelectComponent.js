import React from "react";
import { View, Text, TouchableHighlight } from "react-native";
import ModalDropdown from "react-native-modal-dropdown";
import dimensions from "~/assets/Dimensions";
import Icon from "react-native-vector-icons/FontAwesome";

const SelectComponent = ({ value, options, onSelect }) => {
  const displayRow = data => {
    return (
      <TouchableHighlight>
        <View style={{ padding: "5%" }}>
          <Text
            style={{
              color: "#23203F",
              fontSize: dimensions(12),
              fontFamily: "HelveticaNowMicro-Regular"
            }}
          >{`${data.description}`}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <ModalDropdown
      options={options}
      onSelect={onSelect}
      renderRow={row => displayRow(row)}
      dropdownStyle={{ width: "60%" }}
      style={{
        borderColor: "#FFF",
        borderWidth: 2,
        height: dimensions(45),
        borderRadius: dimensions(50),
        justifyContent: "center"
        // paddingLeft: "5%"
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: "6%"
        }}
      >
        <Text
          style={{
            color: "#FFF",
            fontSize: dimensions(12),
            fontFamily: "HelveticaNowMicro-Regular"
          }}
        >
          {value.length ? value : "Selecione..."}
        </Text>
        <Icon name={"sort-down"} size={dimensions(15)} color="#FFF" />
      </View>
    </ModalDropdown>
  );
};

export default SelectComponent;
