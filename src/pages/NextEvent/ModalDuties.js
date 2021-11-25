import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import dimensions, { calcWidth, calcHeight, adjust } from "~/assets/Dimensions";
import Modal from "~/shared/components/ModalComponent";

const ModalDuties = ({ visible, onClose, responsabilities }) => {
  const renderSeparator = () => (
    <View
      style={{
        height: dimensions(3),
        width: "90%",
        backgroundColor: "#18142F",
        marginLeft: "5%",
        marginRight: "10%",
      }}
    />
  );

  function Item({ item }) {
    return (
      <TouchableWithoutFeedback>
        <View style={styles.lists}>
          <Text style={[styles.item, { left: calcWidth(3) }]}>{item}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      heightModal={Platform.OS === "ios" ? calcHeight(95) : calcWidth(160)}
      swipe={[]}
    >
      <View style={{ flex: 1, paddingHorizontal: calcWidth(4) }}>
        <Text style={styles.title}>Deveres:</Text>
        <View
          style={[
            styles.containerList,
            { top: calcWidth(4), height: "80%", padding: calcWidth(3) },
          ]}
        >
          <FlatList
            keyboardShouldPersistTaps="always"
            data={responsabilities || []}
            renderItem={({ item }) => <Item item={item} />}
            keyExtractor={() => Math.random()}
            ItemSeparatorComponent={renderSeparator}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  item: {
    fontFamily: "HelveticaNowDisplay-Regular",
    fontSize: adjust(15),
    color: "#FFF",
    width: "80%",
    fontWeight: "normal",
  },
  title: {
    color: "#FFF",
    fontSize: adjust(18),
    textAlign: "center",
    fontFamily: "HelveticaNowMicro-Medium",
    marginBottom: adjust(5),
  },
  lists: {
    flexDirection: "row",
    padding: calcWidth(3),
    alignItems: "center",
  },
  containerList: {
    backgroundColor: "#403A60",
    borderRadius: dimensions(12),
  },
});

export default ModalDuties;
