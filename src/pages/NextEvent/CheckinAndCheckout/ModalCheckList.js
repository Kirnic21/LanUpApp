import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import { CheckBox } from "react-native-elements";
import dimensions, { calcWidth, adjust } from "~/assets/Dimensions";
import Modal from "~/shared/components/ModalComponent";
import ButtonLoading from "~/shared/components/Button";
import Icon from "react-native-vector-icons/FontAwesome";

import debounceButton from "~/shared/helpers/debounce";

const Button = debounceButton(ButtonLoading);

const ModalCheckList = ({
  visible,
  onClose,
  loading,
  eventName,
  job,
  checkList,
  checked,
  onPressCheck,
  pressConfirm,
  titleCheck,
}) => {
  const list = checkList ? checkList.map((c, i) => ({ id: i, title: c })) : [];
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

  function Item({ title }) {
    return (
      <TouchableWithoutFeedback>
        <View style={styles.checkLists}>
          <Icon
            name={checked ? "circle" : "circle-thin"}
            size={calcWidth(4.3)}
            color={checked ? "#46C5F3" : "#6C757D"}
          />
          <Text style={[styles.titleCheckBox, { left: calcWidth(3) }]}>
            {title}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      heightModal={Platform.OS === "ios" ? "auto" : calcWidth(160)}
      swipe={[]}
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.header}>CheckList</Text>
        <View
          style={{
            width: "90%",
            minHeight: "20%",
            marginHorizontal: calcWidth(5),
            top: calcWidth(5),
          }}
        >
          <Text numberOfLines={1} style={styles.title}>
            {eventName || "event name"}
          </Text>
          <Text style={styles.subTitle}>{job || "job"}</Text>
        </View>
        <View style={[styles.containerCheckBox, { flexDirection: "row" }]}>
          <CheckBox
            title={titleCheck}
            textStyle={styles.titleCheckBox}
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
        <View
          style={[
            styles.containerCheckBox,
            { top: calcWidth(2), height: "45%" },
          ]}
        >
          <FlatList
            keyboardShouldPersistTaps="always"
            data={list}
            renderItem={({ item }) => <Item id={item.id} title={item.title} />}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={renderSeparator}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <View
          pointerEvents={loading ? "none" : "auto"}
          style={{ alignItems: "center", top: calcWidth(8) }}
        >
          <Button
            disabled={!checked}
            loading={!loading}
            color="#7541bf"
            cliclButtonColor="#EB4886"
            name="Confirmar"
            onPress={pressConfirm}
            size="small"
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  titleCheckBox: {
    fontFamily: "HelveticaNowDisplay-Regular",
    fontSize: adjust(15),
    color: "#FFF",
    width: "80%",
    fontWeight: "normal",
  },
  header: {
    textAlign: "center",
    fontFamily: "HelveticaNowMicro-Regular",
    fontSize: adjust(16),
    color: "#FFF",
  },
  title: {
    color: "#FFF",
    fontSize: adjust(25),
    fontFamily: "HelveticaNowMicro-Medium",
  },
  subTitle: {
    color: "#FFB72B",
    fontSize: adjust(15),
    fontFamily: "HelveticaNowMicro-Regular",
    top: dimensions(-5),
  },
  CheckBox: {
    backgroundColor: "transparent",
    borderWidth: 0,
    width: "95%",
  },
  checkLists: {
    flexDirection: "row",
    padding: calcWidth(5),
    alignItems: "center",
    marginLeft: calcWidth(0.6),
  },
  containerCheckBox: {
    backgroundColor: "#403A60",
    borderRadius: dimensions(12),
  },
  Btn: {
    width: "60%",
    height: "33%",
    borderRadius: dimensions(30),
    alignItems: "center",
    justifyContent: "center",
  },
  textBtn: {
    color: "#18142F",
    fontSize: adjust(10),
    fontFamily: "HelveticaNowMicro-Regular",
  },
});

export default ModalCheckList;
