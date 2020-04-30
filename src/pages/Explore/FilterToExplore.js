import React from "react";
import { StyleSheet, Text, FlatList } from "react-native";
import dimensions from "~/assets/Dimensions/index";
import { TouchableOpacity } from "react-native-gesture-handler";

export default FilterToExplore = ({
  onSelectedColor,
  offSelectedColor,
  onTextSelectedColor,
  offTextSelectedColor,
  onPress,
  filterJob,
}) => {
  const DATA = [{ title: "----" }];

  function Item({ index, title, item, selected, onSelect }) {
    return (
      <TouchableOpacity
        onPress={() => {
          onSelect(index);
          onPress(item);
        }}
        style={[
          styles.item,
          {
            backgroundColor: selected
              ? onSelectedColor
              : offSelectedColor || "#24203B",
          },
        ]}
      >
        <Text
          style={[
            styles.title,
            {
              color: selected
                ? onTextSelectedColor
                : offTextSelectedColor || "#FFF",
            },
          ]}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  }
  const [selected, setSelected] = React.useState(0);
  const onSelect = (index) => {
    setSelected(index);
  };
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      initialScrollIndex={0.5}
      data={filterJob || DATA}
      renderItem={({ item, index }) => (
        <Item
          index={index}
          item={item}
          title={item.title}
          selected={selected === index}
          onSelect={onSelect}
        />
      )}
      keyExtractor={(item, index) => index.toString()}
      extraData={selected}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: "#24203B",
    padding: dimensions(15),
    paddingVertical: dimensions(11),
    marginVertical: dimensions(8),
    marginHorizontal: dimensions(5),
    borderRadius: dimensions(30),
  },
  title: {
    color: "#FFF",
    fontSize: dimensions(12),
    fontFamily: "HelveticaNowMicro-Bold",
  },
});
