import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { adjust } from "~/assets/Dimensions";
import Icon from "react-native-vector-icons/MaterialIcons";

import PropTypes from "prop-types";

const SelectComponent = ({ onSelect, options }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  return (
    <View style={styles.container}>
      <DropDownPicker
        listMode="SCROLLVIEW"
        style={styles.container}
        dropDownContainerStyle={{
          backgroundColor: "#23203F",
          borderWidth: 1,
          borderColor: "#FFFFFF",
        }}
        ArrowDownIconComponent={() => {
          return (
            <Icon
              name="keyboard-arrow-down"
              size={adjust(20)}
              color="#FFFFFF"
            />
          );
        }}
        ArrowUpIconComponent={() => {
          return (
            <Icon name="keyboard-arrow-up" size={adjust(20)} color="#FFFFFF" />
          );
        }}
        TickIconComponent={() => {
          return <Icon name="check" size={adjust(20)} color="#FFFFFF" />;
        }}
        textStyle={styles.text}
        open={open}
        value={value}
        items={[{ label: "Selecione um Turno", value: null }, ...options]}
        itemKey={Math.random()}
        setValue={(e) => setValue(e)}
        setOpen={() => setOpen(!open)}
        placeholder="Selecione um Turno"
        placeholderStyle={styles.text}
        onChangeValue={(value) => onSelect(value)}
      />
    </View>
  );
};

SelectComponent.prototype = {
  label: PropTypes.string,
  options: PropTypes.array,
  onSelect: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    borderColor: "#cad4db",
    height: 50,
    backgroundColor: "transparent",
  },
  text: {
    color: "#FFFFFF",
    fontSize: adjust(12),
    fontFamily: "HelveticaNowMicro-Regular",
  },
});

export default SelectComponent;
