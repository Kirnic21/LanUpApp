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
import dimensions from "~/assets/Dimensions/index";

const PhotoGalleryEmptyState = ({ onPictureAdd }) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerEmptyTitle}>
        <Text style={styles.emptyTitle}>Não temos nenhuma</Text>
        <Text style={styles.emptyTitle}>mídia para mostrar</Text>
      </View>

      <View style={styles.containerEmptyImg}>
        <Image
          source={ImageOutline}
          style={{ width: dimensions(145), height: dimensions(145) }}
        />
      </View>
      <View style={styles.containerEmptySubtitle}>
        <Text style={styles.emptySubtitle}>Adicione as suas fotos</Text>
        <Text style={styles.emptySubtitle}>e divulgue o seu trabalho</Text>
      </View>
      <View style={styles.containerEmptyBtn}>
        <ActionButton onPress={onPictureAdd} />
      </View>
    </View>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  containerEmptyTitle: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    height: "30%"
  },
  containerEmptyImg: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: "30%"
  },
  containerEmptySubtitle: {
    width: "100%",
    alignItems: "center",
    height: "20%"
  },
  containerEmptyBtn: {
    width: "95%",
    alignItems: "flex-end",
    justifyContent: "center",
    height: "20%"
  },
  emptyTitle: {
    color: "#FFF",
    fontSize: dimensions(25),
    fontFamily: "HelveticaNowDisplay-Regular"
  },
  emptyStateContainer: {
    borderColor: "#FFF",
    borderWidth: 2
  },

  emptySubtitle: {
    color: "#ffffffad",
    fontFamily: "HelveticaNowMicro-ExtraLight",
    lineHeight: dimensions(30),
    fontSize: dimensions(15)
  }
});

export default PhotoGalleryEmptyState;
