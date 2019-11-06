import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  Image,
  TouchableOpacity
} from "react-native";
import ImageOutline from "~/assets/images/outline.png";
import FastImage from "react-native-fast-image";
import ActionButton from "~/shared/components/ActionButton";

const PhotoGalleryEmptyState = ({ onPictureAdd }) => {
  return (
    <View styles={styles.container}>
      <View style={styles.emptyStateContainer}>
        <View style={{ alignItems: "center", top: "20%" }}>
          <Text style={{ color: "#FFF", fontSize: 26 }}>Não temos nenhuma</Text>
          <Text style={{ color: "#FFF", fontSize: 26 }}>
            mídia para mostrar
          </Text>
        </View>
        <View style={styles.emptyStateBird}>
          <Image source={ImageOutline} style={{ width: 200, height: 200 }} />
        </View>
        <View style={styles.emptyStateContainerMessage}>
          <Text style={styles.emptyStateTitle}>Adicione as suas fotos</Text>
          <Text style={styles.emptyStateSubTitle}>
            e divulgue o seu trabalho
          </Text>
        </View>
      </View>
      <View style={styles.emptyStateCameraContainer}>
        <ActionButton onPress={onPictureAdd} />
      </View>
    </View>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  emptyStateContainer: {
    alignItems: "center",
    width,
    flex: 1
  },
  emptyStateBird: {
    top: "-10%",
    marginTop: "80%",
    justifyContent: "center",
    alignItems: "center"
  },
  emptyStateContainerMessage: {
    top: "-16%",
    justifyContent: "center",
    alignItems: "center"
  },
  emptyStateTitle: {
    color: "#ffffffad",
    fontFamily: "Montserrat-Bold",
    fontSize: 18,
    letterSpacing: 0.5
  },
  emptyStateSubTitle: {
    color: "#ffffffad",
    fontFamily: "Montserrat-Regular",
    fontSize: 18,
    letterSpacing: 0.5
  },
  emptyStateCameraContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    left: "-5%"
  }
});

export default PhotoGalleryEmptyState;
