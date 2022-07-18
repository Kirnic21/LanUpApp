import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { adjust, calcWidth } from "~/assets/Dimensions";
import Icon from "react-native-vector-icons/FontAwesome";

const Menu = ({ ...props }) => {
  return (
    <View style={styles.container}>
      {props.data.map((x, i) => (
        <TouchableOpacity
          onPress={x.onPress}
          key={i}
          style={[
            styles.buttonItens,
            { borderBottomWidth: i === props.data.length - 1 ? 0 : 2 },
          ]}
        >
          <View
            style={{
              width: "90%",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Text style={styles.title}>{x.title}</Text>
            {x?.subtitle && <Text style={[styles.subtitle]}>{x.subtitle}</Text>}
          </View>
          <Icon color={"#FFF"} name={"angle-right"} size={adjust(25)} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#24203B",
    margin: calcWidth(5),
    paddingHorizontal: calcWidth(6),
    borderRadius: calcWidth(3),
  },
  title: {
    color: "#FFFFFF",
    fontSize: adjust(12),
    fontFamily: "HelveticaNowMicro-Regular",
  },
  subtitle: {
    fontFamily: "HelveticaNowMicro-Light",
    color: "rgba(255,255,255,0.7)",
    fontSize: adjust(9),
  },
  buttonItens: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "#18142F",
    paddingVertical: calcWidth(5),
  },
});

export default Menu;
