import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  ScrollView,
  TouchableWithoutFeedback
} from "react-native-gesture-handler";
import dimensions from "~/assets/Dimensions";
import Modal from "react-native-modal";
import { useState } from "react";
import RoundButton from "~/shared/components/RoundButton";

const CardDeitailsVacancies = ({
  TitleStyle,
  title,
  contentTextStyle,
  content,
  isModalOn
}) => {
  const [visible, setVisible] = useState(false);
  return (
    <View style={[styles.container]}>
      <TouchableWithoutFeedback onPress={() => setVisible(isModalOn)}>
        <View style={{ width: "100%" }}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[styles.title, TitleStyle]}
          >
            {title}
          </Text>
        </View>
        <View style={{ width: "100%" }}>
          <Text
            style={[styles.contentText, contentTextStyle]}
            numberOfLines={5}
            ellipsizeMode="tail"
          >
            {content}
          </Text>
        </View>
        <Modal
          isVisible={visible}
          animationIn="zoomIn"
          animationOut="zoomOut"
          animationOutTiming={1000}
          backdropColor="transparent"
        >
          <View style={styles.containerModal}>
            <View style={{ height: dimensions(44), padding: "5%" }}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[styles.title, TitleStyle]}
              >
                {title}
              </Text>
            </View>
            <ScrollView style={{ flex: 1, padding: "5%" }}>
              <Text style={[styles.contentText, contentTextStyle]}>
                {content}
              </Text>
            </ScrollView>
            <View
              style={{ height: dimensions(90), justifyContent: "flex-start" }}
            >
              <RoundButton
                name="Okay"
                style={styles.containerBtn}
                onPress={() => setVisible(false)}
              />
            </View>
          </View>
        </Modal>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#23203F",
    padding: "5%",
    borderRadius: dimensions(10),
    // height: "45%",
    marginTop: "5%",
    width: "100%"
  },
  title: {
    fontFamily: "HelveticaNowDisplay-Regular",
    fontSize: dimensions(20),
    paddingBottom: "2%"
  },
  contentText: {
    width: "100%",
    fontSize: dimensions(12),
    fontFamily: "HelveticaNowMicro-Regular",
    lineHeight: dimensions(18)
  },
  containerModal: {
    flex: 0.9,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#23203F",
    borderRadius: dimensions(15)
  },
  containerBtn: {
    backgroundColor: "#865FC0",
    padding: "5%",
    paddingHorizontal: "30%",
    borderRadius: dimensions(25)
  }
});

export default CardDeitailsVacancies;
