import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { CheckBox } from "react-native-elements";
import dimensions, { calcWidth } from "~/assets/Dimensions";
import Modal from "~/shared/components/ModalComponent";
import RoundButton from "~/shared/components/RoundButton";

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
      <View pointerEvents="none">
        <CheckBox
          title={<Text style={styles.titleCheckBox}>{title}</Text>}
          checkedIcon="circle"
          uncheckedIcon="circle-thin"
          checkedColor="#46C5F3"
          size={dimensions(15)}
          checked={checked}
          containerStyle={[styles.CheckBox, { paddingBottom: "5%" }]}
        />
      </View>
    );
  }

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      loading={loading}
      heightModal={calcWidth(175)}
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.header}>CheckList</Text>
        <View
          style={{
            width: "90%",
            minHeight: "20%",
            marginHorizontal: calcWidth(5),
            top: calcWidth(5)
          }}
        >
          <Text numberOfLines={1} style={styles.title}>
            {eventName || "event name"}
          </Text>
          <Text style={styles.subTitle}>{job || "job"}</Text>
        </View>
        <View style={[styles.containerCheckBox, { flexDirection: "row" }]}>
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
        <View
          style={[
            styles.containerCheckBox,
            { top: calcWidth(2), height: "38%" }
          ]}
        >
          <FlatList
            data={list}
            renderItem={({ item }) => <Item id={item.id} title={item.title} />}
            keyExtractor={item => item.id.toString()}
            ItemSeparatorComponent={renderSeparator}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <View
          pointerEvents={loading ? "none" : "auto"}
          style={{ alignItems: "center", top: calcWidth(5) }}
        >
          <RoundButton
            width={calcWidth(60)}
            disabled={!checked}
            name="Confirmar"
            onPress={pressConfirm}
            style={[styles.Btn, { backgroundColor: "#7541BF" }]}
          />
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
    fontFamily: "HelveticaNowMicro-Medium"
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
    height: calcWidth(10),
    justifyContent: "center",
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
