import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "~/shared/components/ModalComponent";
import { calcWidth } from "~/assets/Dimensions/index";
import Icon from "react-native-vector-icons/MaterialIcons";
import Lottie from "lottie-react-native";
import loadingSpinner from "~/assets/loadingSpinner.json";

const ModalPause = ({
  visible,
  onClose,
  onSwipeOut,
  onTouchOutside,
  onPress,
  loading
}) => {
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
      style={{ height: calcWidth(165) }}
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
        {loading ? (
          <Lottie
            autoSize
            style={{
              height: calcWidth(15),
              width: calcWidth(15),
              top: calcWidth(2)
            }}
            resizeMode="cover"
            source={loadingSpinner}
            loop
            autoPlay
          />
        ) : (
          <></>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: calcWidth(75),
    marginTop: calcWidth(10),
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
