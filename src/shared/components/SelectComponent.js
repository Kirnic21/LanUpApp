import React, { useState, useCallback, useEffect, Fragment } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { adjust, calcWidth } from "~/assets/Dimensions";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Modal from "react-native-modal";

import PropTypes from "prop-types";

const SelectComponent = ({ onSelect = () => {}, options = [] }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [label, setLabel] = useState("");

  const onPressItems = useCallback(
    (item) => {
      setLabel(item.label);
      setValue(item.value);
      setOpen(false);
    },
    [setValue, setOpen]
  );

  useEffect(() => {
    onSelect(value);
  }, [value]);

  const placeholder = useCallback(() => {
    const [getLabel] = options.filter((x) => [x.label].includes(label));
    return getLabel === undefined ? "Selecione o turno" : getLabel?.label;
  }, [setLabel, label]);

  const RenderList = useCallback(
    ({ item }) => {
      return (
        <TouchableOpacity
          onPress={() => onPressItems(item)}
          style={styles.list}
        >
          <Icon
            name={item.value === value ? "check-circle" : "circle-thin"}
            size={adjust(20)}
            color={"#46C5F3"}
          />
          <Text style={styles.textRender}>{item.label}</Text>
        </TouchableOpacity>
      );
    },
    [onPressItems, value]
  );

  return (
    <Fragment>
      <TouchableOpacity onPress={() => setOpen(!open)} style={styles.container}>
        <MaterialIcons
          name="keyboard-arrow-down"
          size={adjust(20)}
          color="#FFFFFF"
          style={styles.iconArrow}
        />
        <Text style={[styles.text, { width: "85%" }]}>{placeholder()}</Text>
      </TouchableOpacity>
      <Modal
        isVisible={open}
        backdropOpacity={0.5}
        onBackButtonPress={() => setOpen(!open)}
        onBackdropPress={() => setOpen(!open)}
        onSwipeComplete={() => setOpen(!open)}
        hideModalContentWhileAnimating={true}
        style={styles.modal}
        animationIn="slideInUp"
      >
        <View style={[styles.modalContent]}>
          <View style={{ alignItems: "flex-end", marginBottom: calcWidth(5) }}>
            <MaterialIcons
              onPress={() => setOpen(!open)}
              color={"#FFF"}
              name={"close"}
              size={calcWidth(9)}
            />
          </View>
          <FlatList
            data={[{ label: "Selecione o turno", value: null }, ...options]}
            renderItem={({ item, index }) => (
              <RenderList item={item} index={index} />
            )}
            keyExtractor={() => Math.random().toString()}
          />
        </View>
      </Modal>
    </Fragment>
  );
};

SelectComponent.prototype = {
  label: PropTypes.string,
  options: PropTypes.array,
  onSelect: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderColor: "#FFFFFF",
    height: 50,
    borderWidth: 2,
    justifyContent: "center",
    paddingLeft: calcWidth(4),
    position: "relative",
  },
  text: {
    color: "#FFFFFF",
    fontSize: adjust(12),
    fontFamily: "HelveticaNowMicro-Regular",
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "#23203F",
    borderTopLeftRadius: calcWidth(13),
    borderTopRightRadius: calcWidth(13),
    height: "auto",
    padding: calcWidth(10),
    paddingBottom: calcWidth(5),
    maxHeight: "50%",
  },
  textRender: {
    color: "#FFFFFF",
    fontSize: adjust(13),
    fontFamily: "HelveticaNowMicro-Regular",
    paddingLeft: calcWidth(4),
  },
  list: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: calcWidth(5),
    width: "95%",
  },
  iconArrow: {
    position: "absolute",
    right: calcWidth(3),
  },
});

export default SelectComponent;
