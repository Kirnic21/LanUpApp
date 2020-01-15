import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  SafeAreaView,
  FlatList
} from "react-native";
import dimensions from "~/assets/Dimensions/index";
import { TouchableOpacity } from "react-native-gesture-handler";

export default FilterToExplore = ({
  value,
  onSelectedColor,
  offSelectedColor,
  onTextSelectedColor,
  offTextSelectedColor,
  onPress,
  filterJob
}) => {
  const DATA = [
    {
      id: "1",
      title: "one"
    },
    {
      id: "2",
      title: "two"
    },
    {
      id: "3",
      title: "three"
    }
  ];

  function Item({ id, title, selected, onSelect }) {
    return (
      <TouchableOpacity
        onPress={() => {
          onSelect(id);
        }}
        style={[
          styles.item,
          {
            backgroundColor: selected
              ? onSelectedColor
              : offSelectedColor || "#24203B"
          }
        ]}
      >
        <Text
          style={[
            styles.title,
            {
              color: selected
                ? onTextSelectedColor
                : offTextSelectedColor || "#FFF"
            }
          ]}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  }
  const [selected, setSelected] = React.useState(DATA[0].id);

  const onSelect = id => {
    setSelected(id);
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        horizontal={true}
        data={filterJob || DATA}
        renderItem={({ item }) => (
          <Item
            id={item.id}
            title={item.title}
            selected={selected === item.id ? true : false}
            onSelect={onSelect}
          />
        )}
        keyExtractor={item => item.id}
        extraData={selected}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    backgroundColor: "#24203B",
    padding: dimensions(15),
    paddingVertical: dimensions(11),
    marginVertical: dimensions(8),
    marginHorizontal: dimensions(5),
    borderRadius: dimensions(30)
  },
  title: {
    color: "#FFF",
    fontSize: dimensions(12),
    fontFamily: "HelveticaNowMicro-Bold"
  }
});
