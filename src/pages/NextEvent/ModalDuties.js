import React from "react";
import { View, Text, SectionList, StyleSheet } from "react-native";
import Modal from "~/shared/components/ModalComponent";
import dimensions, { calcHeight, calcWidth } from "~/assets/Dimensions/index";

const ModalDuties = ({ visible, onClose, responsabilities }) => {
  const DATA = [
    {
      data: responsabilities || []
    }
  ];

  renderSeparator = () => (
    <View
      style={{
        height: dimensions(3),
        backgroundColor: "#18142F"
      }}
    />
  );

  function Item({ title }) {
    return <Text style={styles.title}>{title};</Text>;
  }
  return (
    <Modal visible={visible} onClose={onClose} heightModal={calcWidth(130)}>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text style={[styles.title, { fontSize: calcWidth(8) }]}>Deveres:</Text>
        <View>
          <View style={styles.list}>
            {responsabilities ? (
              <SectionList
                sections={DATA}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => <Item title={item} />}
                ItemSeparatorComponent={renderSeparator}
              />
            ) : (
              <View style={styles.containerEmpty}>
                <Text style={[styles.title, { fontSize: calcWidth(7) }]}>
                  Sem deveres
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  title: {
    color: "#FFF",
    fontFamily: "HelveticaNowDisplay-Regular",
    fontSize: calcWidth(5),
    margin: calcWidth(1)
  },
  list: {
    backgroundColor: "#403A60",
    width: calcWidth(80),
    marginTop: calcWidth(5),
    padding: calcWidth(10),
    borderRadius: calcWidth(5),
    height: calcWidth(80)
  },
  containerEmpty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default ModalDuties;
