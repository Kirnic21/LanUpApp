import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { CheckBox } from "react-native-elements";
import dimensions from "~/assets/Dimensions";
import Modal from "~/shared/components/ModalComponent";

const ModalCheckList = ({
  visible,
  onClose,
  onTouchOutside,
  onSwipeOut,
  eventName,
  job,
  checkList,
  checked,
  onPressCheck,
  pressConfirm,
  titleCheck
}) => {
  const list = checkList ? checkList.map((c, i) => ({ id: i, title: c })) : [];
  renderSeparator = () => (
    <View
      style={{
        height: dimensions(3),
        width: "90%",
        backgroundColor: "#18142F",
        marginLeft: "5%",
        marginRight: "10%"
      }}
    />
  );

  function Item({ title }) {
    return (
      <CheckBox
        title={<Text style={styles.titleCheckBox}>{title}</Text>}
        checkedIcon="circle"
        uncheckedIcon="circle-thin"
        checkedColor="#46C5F3"
        size={dimensions(15)}
        checked={checked}
        containerStyle={[styles.CheckBox, { paddingBottom: "5%" }]}
      />
    );
  }

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      onTouchOutside={onTouchOutside}
      onSwipeOut={onSwipeOut}
      style={{ height: dimensions(500) }}
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.header}>CheckList</Text>
        <View style={{ top: "3%", alignItems: "center" }}>
          <View style={{ width: "90%", minHeight: "18%" }}>
            <Text numberOfLines={1} style={styles.title}>
              {eventName || ""}
            </Text>
            <Text style={styles.subTitle}>{job}</Text>
          </View>
        </View>
        <View
          style={[
            styles.containerCheckBox,
            { top: "5%", flexDirection: "row" }
          ]}
        >
          <CheckBox
            title={<Text style={styles.titleCheckBox}>{titleCheck}</Text>}
            checkedIcon="circle"
            uncheckedIcon="circle-thin"
            checkedColor="#46C5F3"
            uncheckedColor="#46C5F3"
            size={dimensions(15)}
            checked={checked}
            containerStyle={styles.CheckBox}
            onPress={onPressCheck}
          />
        </View>
        <View style={[styles.containerCheckBox, { top: "7%", height: "38%" }]}>
          <FlatList
            data={list}
            renderItem={({ item }) => <Item id={item.id} title={item.title} />}
            keyExtractor={item => item.id.toString()}
            ItemSeparatorComponent={renderSeparator}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <View
          pointerEvents={checked ? "auto" : "none"}
          style={{ top: "14%", alignItems: "center" }}
        >
          <TouchableOpacity
            onPress={pressConfirm}
            style={[
              styles.Btn,
              checked
                ? { backgroundColor: "#7541BF" }
                : { backgroundColor: "#6C757D" }
            ]}
          >
            <Text style={styles.textBtn}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  titleCheckBox: {
    fontFamily: "HelveticaNowDisplay-Regular",
    fontSize: dimensions(18),
    left: "20%",
    color: "#FFF"
  },
  header: {
    textAlign: "center",
    fontFamily: "HelveticaNowMicro-Regular",
    fontSize: dimensions(18),
    color: "#FFF"
  },
  title: {
    color: "#FFF",
    fontSize: dimensions(28),
    fontFamily: "HelveticaNowMicro-Medium",
    left: "-0.5%"
  },
  subTitle: {
    color: "#FFB72B",
    fontSize: dimensions(18),
    fontFamily: "HelveticaNowMicro-Regular",
    top: dimensions(-5)
  },
  CheckBox: {
    backgroundColor: "transparent",
    borderWidth: 0,
    width: "95%"
  },
  containerCheckBox: {
    backgroundColor: "#403A60",
    borderRadius: dimensions(12)
  },
  Btn: {
    width: "60%",
    height: "33%",
    borderRadius: dimensions(30),
    alignItems: "center",
    justifyContent: "center"
  },
  textBtn: {
    color: "#18142F",
    fontSize: dimensions(12),
    fontFamily: "HelveticaNowMicro-Regular"
  }
});

export default ModalCheckList;
