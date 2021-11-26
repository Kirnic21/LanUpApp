import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "~/shared/components/ModalComponent";
import dimensions, { calcWidth, calcHeight, adjust } from "~/assets/Dimensions/index";
import Icon from "react-native-vector-icons/MaterialIcons";
import debounceButton from "~/shared/helpers/debounce";

const Button = debounceButton(TouchableOpacity);

const ModalPause = ({ visible, onClose, onPress, loading }) => {
  const data = [
    {
      id: 1,
      name: "Comer",
      icon: "restaurant",
    },
    {
      id: 2,
      name: "Banheiro",
      icon: "wc",
    },
    {
      id: 3,
      name: "Fumar",
      icon: "smoking-rooms",
    },
    {
      id: 4,
      name: "Médica",
      icon: "local-hospital",
    },
  ];
  return (
    <Modal
      visible={visible}
      loading={loading}
      onClose={onClose}
      heightModal={Platform.OS === 'ios' ? calcHeight(95) : dimensions(490)}
    >
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text style={styles.title}>Pausa para:</Text>
        {data.map(({ icon, id, name }) => (
          <Button
            key={id}
            style={styles.btn}
            disabled={loading}
            onPress={() => onPress(id)}
          >
            <Icon name={icon} size={calcWidth(8)} color="#18142F" />
            <Text style={styles.btnText}>{name}</Text>
          </Button>
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
    paddingHorizontal: calcWidth(5),
  },
  btnText: {
    color: "#18142F",
    fontFamily: "HelveticaNowDisplay-Regular",
    marginLeft: calcWidth(3),
    fontSize: adjust(15),
  },
  title: {
    color: "#FFF",
    fontFamily: "HelveticaNowMicro-Medium",
    fontSize: adjust(25),
  },
});

export default ModalPause;
