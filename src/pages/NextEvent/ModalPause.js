import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "~/shared/components/ModalComponent";
import dimensions, { calcHeight, calcWidth } from "~/assets/Dimensions/index";
import Icon from "react-native-vector-icons/MaterialIcons";

const ModalPause = ({ visible, onClose, onSwipeOut, onTouchOutside }) => {
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
      onClose={onClose}
      onTouchOutside={onTouchOutside}
      onSwipeOut={onSwipeOut}
      style={{ height: calcHeight(85) }}
    >
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text style={styles.title}>Pausa para:</Text>
        {data.map(({ icon, id, name }) => (
          <TouchableOpacity key={id} style={styles.btn}>
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
    width: calcWidth(75),
    marginTop: calcHeight(5),
    height: calcWidth(18),
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
    fontSize: calcWidth(5)
  },
  title: {
    color: "#FFF",
    fontFamily: "HelveticaNowMicro-Medium",
    fontSize: calcWidth(8)
  }
});

export default ModalPause;
