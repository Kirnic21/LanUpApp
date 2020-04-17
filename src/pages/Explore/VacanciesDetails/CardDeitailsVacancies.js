import React from "react";
import { View, Text, StyleSheet, Dimensions, StatusBar } from "react-native";
import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import dimensions from "~/assets/Dimensions";
import Modal from "react-native-modal";
import { useState } from "react";
import RoundButton from "~/shared/components/RoundButton";
import Icon from "react-native-vector-icons/FontAwesome";

const CardDeitailsVacancies = ({
  TitleStyle,
  title,
  contentTextStyle,
  content,
  isModalOn,
  previewContent,
  children,
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
          {previewContent ? (
            <View>
              {previewContent.map((c, i) => (
                <View key={i}>
                  <Text
                    style={{
                      width: "100%",
                      color: "#FFF",
                      fontSize: dimensions(12),
                      fontFamily: "HelveticaNowMicro-Regular",
                    }}
                  >
                    {c};
                  </Text>
                </View>
              ))}
            </View>
          ) : (
            <View>{children}</View>
          )}
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              padding: "4%",
              opacity: isModalOn ? 1 : 0,
            }}
          >
            <Text
              style={{
                color: "#FFF",
                fontSize: dimensions(13),
                fontFamily: "HelveticaNowMicro-Regular",
              }}
            >
              Veja mais
            </Text>
            <Icon name={"chevron-down"} size={dimensions(20)} color="#FFF" />
          </View>
        </View>
        <Modal
          isVisible={visible}
          animationIn="zoomIn"
          animationOut="zoomOut"
          animationInTiming={500}
          animationOutTiming={500}
          backdropOpacity={0.6}
          deviceHeight={Dimensions.get("screen").height}
        >
          <View style={styles.containerModal}>
            <StatusBar backgroundColor="#00000098" />
            <View style={{ height: dimensions(44), padding: "5%" }}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[styles.title, TitleStyle]}
              >
                {title}
              </Text>
            </View>
            {content ? (
              <ScrollView style={{ flex: 1, padding: "5%" }}>
                {content.map((c, i) => (
                  <View key={i}>
                    <Text style={[styles.contentText, contentTextStyle]}>
                      {c}
                    </Text>
                  </View>
                ))}
              </ScrollView>
            ) : (
              <></>
            )}
            <View
              style={{ height: dimensions(90), justifyContent: "flex-start" }}
            >
              <RoundButton
                name="Okay"
                style={{ backgroundColor: "#865FC0" }}
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
    marginTop: "5%",
    width: "100%",
  },
  title: {
    fontFamily: "HelveticaNowDisplay-Regular",
    fontSize: dimensions(20),
    paddingBottom: "2%",
    color: "#FFFFFf",
  },
  contentText: {
    width: "100%",
    fontSize: dimensions(12),
    fontFamily: "HelveticaNowMicro-Regular",
    lineHeight: dimensions(18),
  },
  containerModal: {
    flex: 0.9,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#23203F",
    borderRadius: dimensions(15),
  },
});

export default CardDeitailsVacancies;
