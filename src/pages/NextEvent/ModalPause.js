import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "~/shared/components/ModalComponent";
import dimensions, { calcWidth } from "~/assets/Dimensions/index";
import Icon from "react-native-vector-icons/MaterialIcons";

const ModalPause = ({ visible, onClose, onPress, loading }) => {
  const data = [
    {
      id: 1,
      name: "Comer",
      icon: "restaurant"
    },
    {
      id: 2,
      name: "Banheiro",
      icon: "wc"
    },
    {
      id: 3,
      name: "Fumar",
      icon: "smoking-rooms"
    },
    {
      id: 4,
      name: "Médica",
      icon: "local-hospital"
    }
  ];
  return (
    <Modal
      visible={visible}
      loading={loading}
      onClose={onClose}
      heightModal={dimensions(490)}
    >
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text style={styles.title}>Pausa para:</Text>
        {data.map(({ icon, id, name }) => (
          <TouchableOpacity
            key={id}
            style={styles.btn}
            disabled={loading}
            onPress={() => onPress(id)}
          >
            <Icon name={icon} size={calcWidth(8)} color="#18142F" />
            <Text style={styles.btnText}>{name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: dimensions(220),
    marginTop: calcWidth(7),
    height: dimensions(55),
    backgroundColor: "#B6AED1",
    borderRadius: calcWidth(3),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: calcWidth(5)
  },
  btnText: {
    color: "#18142F",
    fontFamily: "HelveticaNowDisplay-Regular",
    marginLeft: calcWidth(3),
    fontSize: dimensions(18)
  },
  title: {
    color: "#FFF",
    fontFamily: "HelveticaNowMicro-Medium",
    fontSize: dimensions(28)
  }
});

export default ModalPause;
