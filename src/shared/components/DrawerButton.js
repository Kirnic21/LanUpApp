import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import IconMenu from "~/assets/images/icon_menu.png";
import { DrawerActions } from "react-navigation-drawer";
import dimensions, { calcWidth } from "~/assets/Dimensions/index";

const DrawerButton = props => (
  <View style={{ marginHorizontal: calcWidth(2) }}>
    <TouchableOpacity
      onPress={() => {
        props.navigation.dispatch(DrawerActions.openDrawer());
      }}
    >
      <Image
        style={[{ height: dimensions(40), width: dimensions(40) }, props.style]}
        source={IconMenu}
      />
    </TouchableOpacity>
  </View>
);

export default DrawerButton;
