import React from "react";
import { View, Text, FlatList, TouchableWithoutFeedback } from "react-native";
import { calcWidth } from "~/assets/Dimensions";
import Modal from "~/shared/components/ModalComponent";
import { styles } from "./styles";

const WarningModal = ({
  visible,
  onClose,
  list,
  next = () => {},
  cancel = () => {},
}) => {
  function Item({ item }) {
    return (
      <TouchableWithoutFeedback>
        <View style={styles.lists}>
          <Text style={[styles.item]}>- {item}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  return (
    <Modal visible={visible} onClose={onClose} heightModal={"auto"} swipe={[]}>
      <View style={{ paddingHorizontal: calcWidth(4) }}>
        <Text style={[styles.titleModal, { marginBottom: calcWidth(8) }]}>
          {" "}
          Identificamos que você tem {"\n"}pagamentos para receber.
        </Text>
        <Text
          style={[styles.textBody, { fontFamily: "HelveticaNowMicro-Light" }]}
        >
          Entre em contato com as agências abaixo para receber pagamentos
          pendentes. Em caso de duvídas entre em contato com o suporte da Lanup.
        </Text>
        <View style={[styles.containerList, { marginVertical: calcWidth(5) }]}>
          <FlatList
            keyboardShouldPersistTaps="always"
            data={list || []}
            renderItem={({ item }) => <Item item={item} />}
            keyExtractor={() => Math.random()}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <View style={styles.wrapper}>
          <RoundButton
            onPress={() => cancel()}
            width="100%"
            style={styles.buttonCancel}
            name="Cancelar"
          />
          <RoundButton
            onPress={() => next()}
            width="100%"
            style={styles.buttonNext}
            name="Próximo"
          />
        </View>
      </View>
    </Modal>
  );
};

export default WarningModal;
