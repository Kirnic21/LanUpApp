import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { DrawerActions } from "react-navigation-drawer";
import { calcWidth } from "~/assets/Dimensions/index";
import Icon from "react-native-vector-icons/MaterialIcons";
import Circle from "react-native-vector-icons/FontAwesome";

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
      {props.type === "drawer" && (
        <View
          style={{
            position: "absolute",
            zIndex: 1,
            left: "85%",
            bottom: "75%",
          }}
        >
          <Circle name="circle" size={calcWidth(4.5)} color="#ec0043" />
        </View>
      )}
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
    position: "relative",
  },
});

const drawer = StyleSheet.compose(styles.button, {
  padding: calcWidth(1),
});

export default ButtonNavigation;
