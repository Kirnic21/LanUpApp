import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { DrawerActions } from "react-navigation-drawer";
import { calcWidth } from "~/assets/Dimensions/index";
import Icon from "react-native-vector-icons/MaterialIcons";

const ButtonNavigation = (props) => (
  <View
    style={[
      {
        marginLeft: calcWidth(4),
      },
      props.style,
    ]}
  >
    <TouchableOpacity
      style={props.type === "drawer" ? drawer : styles.button}
      onPress={() => {
        props.type === "drawer"
          ? props.navigation.dispatch(DrawerActions.openDrawer())
          : props.type === "stack"
          ? props.navigation.goBack()
          : props.type === "route"
          ? props.navigation.push(props.nameRoute)
          : props.onPress();
      }}
    >
      <Icon
        color={"#FFF"}
        name={props.type === "drawer" ? "menu" : "chevron-left"}
        size={calcWidth(8.5)}
      />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  button: {
    borderColor: "#FFFFFF",
    borderWidth: 1,
    borderRadius: calcWidth(10),
    padding: calcWidth(0.5),
  },
});

const drawer = StyleSheet.compose(styles.button, {
  backgroundColor: "#483D8B",
  padding: calcWidth(1),
});

export default ButtonNavigation;
