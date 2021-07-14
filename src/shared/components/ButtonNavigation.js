import React from "react";
import { View, TouchableOpacity } from "react-native";
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
      onPress={() => {
        props.type === "drawer"
          ? props.navigation.dispatch(DrawerActions.openDrawer())
          : props.type === "stack"
          ? props.navigation.goBack()
          : props.type === 'route'
          ? props.navigation.push(props.nameRoute)
          : props.onPress();
      }}
    >
      <Icon
        color={"#FFF"}
        name={props.type === "drawer" ? "short-text" : "chevron-left"}
        size={calcWidth(8.5)}
        style={{
          borderColor: "#FFFFFF",
          borderWidth: 1,
          borderRadius: calcWidth(10),
          padding: calcWidth(0.5),
        }}
      />
    </TouchableOpacity>
  </View>
);

export default ButtonNavigation;
