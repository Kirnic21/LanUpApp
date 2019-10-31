import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

export default FieldButton = ({ title, style, onPress }) => (
  <View>
    <TouchableOpacity style={style} onPress={onPress}>
      <Text style={{ color: "white", fontSize: 13 }}>{title}</Text>
    </TouchableOpacity>
  </View>
);
