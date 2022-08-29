import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Platform,
  FlatList,
  TouchableOpacity,
} from "react-native";

import dimensions, { calcWidth, adjust } from "~/assets/Dimensions/index";
import ModalComponent from "./ModalComponent";
import Icon from "react-native-vector-icons/FontAwesome";

const DropDown = ({
  style,
  title,
  containerStyle,
  heightModal,
  getValue = () => {},
  items = [],
  input: { value, onChange },
  meta: { touched, error },
}) => {
  const [visible, setVisible] = useState(false);
  const renderSeparator = () => (
    <View
      style={{
        height: dimensions(2),
        marginHorizontal: "5%",
        backgroundColor: "#18142F",
      }}
    />
  );

  useEffect(() => {
    getValue(value);
  }, [value]);

  const getLabel = () => {
    const { label } = items.filter((x) => x.value === value)[0];
    return label;
  };
  return (
    <View style={[containerStyle, { marginBottom: "5%" }]}>
      <Text style={[styles.textInput, { bottom: "1%" }]}>{title}</Text>

      <TouchableOpacity
        style={styles.buttonArrow}
        onPress={() => setVisible(true)}
      >
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[
            styles.textInput,
            styles.input,
            {
              width: "100%",
              paddingRight: "10%",
            },
            touched && error && { borderColor: "#F13567" },
            style,
          ]}
        >
          {value ? getLabel() : "Selecione..."}
        </Text>
        <Icon
          name="chevron-down"
          style={styles.arrow}
          size={adjust(14)}
          color="#FFFFFF"
        />
      </TouchableOpacity>
      {touched && error && (
        <Text
          style={{
            color: "#F13567",
            fontSize: adjust(9),
            fontFamily: "HelveticaNowMicro-Regular",
          }}
        >
          {error}
        </Text>
      )}
      <ModalComponent
        visible={visible}
        onClose={() => setVisible(false)}
        heightModal={heightModal}
      >
        <View style={{ marginVertical: "5%" }}>
          <TouchableOpacity
            onPress={() => {
              onChange(null);
              setVisible(false);
            }}
            style={styles.containerModal}
          >
            <Icon
              name={!value ? "check-circle" : "circle-thin"}
              size={adjust(16)}
              color={!value ? "#46C5F3" : "#00000029"}
            />
            <Text
              style={[
                styles.textSelected,
                {
                  color: "#FFFFFF95",
                },
              ]}
            >
              Selecione...
            </Text>
          </TouchableOpacity>
          <FlatList
            data={items}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  onChange(item.value);
                  setVisible(false);
                }}
                style={styles.containerModal}
              >
                <Icon
                  name={value === item.value ? "check-circle" : "circle-thin"}
                  size={adjust(16)}
                  color={value === item.value ? "#46C5F3" : "#00000029"}
                />
                <Text style={[styles.textSelected, { color: "#FFFFFF" }]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={() => Math.random().toString()}
            ItemSeparatorComponent={renderSeparator}
          />
        </View>
      </ModalComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  containerModal: {
    flexDirection: "row",
    paddingHorizontal: "3%",
    alignItems: "center",
    paddingTop: "1%",
  },
  textSelected: {
    fontSize: adjust(12),
    padding: "3%",
    marginLeft: "3%",
    fontFamily: "HelveticaNowMicro-Regular",
  },
  textInput: {
    fontSize: adjust(10),
    fontFamily: "HelveticaNowMicro-Regular",
    color: "#FFFFFF",
  },
  input: {
    height: 50,
    borderRadius: Platform.OS === "ios" ? 25 : 50,
    borderWidth: 2,
    paddingHorizontal: "7%",
    ...Platform.select({
      ios: {
        lineHeight: 45,
      },
      android: {
        textAlignVertical: "center",
      },
    }),
    borderColor: "#FFFFFF",
  },
  buttonArrow: {
    position: "relative",
  },
  arrow: {
    position: "absolute",
    right: 15,
    top: 15,
  },
});

export default DropDown;
