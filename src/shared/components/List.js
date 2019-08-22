import React, { Component } from "react";
import ArrowRight from "./../../assets/images/arrowRight.png";

import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Text
} from "react-native";
import { FlatList } from "react-native-gesture-handler";

renderSeparator = () => {
  return (
    <View
      style={{
        height: 2,
        width: "90%",
        backgroundColor: "#18142F",
        marginLeft: "5%",
        marginRight: "10%"
      }}
    />
  );
};

export default CoreTemplate = () => (
  <FlatList
    contentContainerStyle={styles.list}
    ItemSeparatorComponent={this.renderSeparator}
  />
)

const styles = StyleSheet.create({
  list: {
    marginTop: 20,
    backgroundColor: '#24203B',
    width: 340,
    borderRadius: 20
  }
});

export default LoginPerfil;
