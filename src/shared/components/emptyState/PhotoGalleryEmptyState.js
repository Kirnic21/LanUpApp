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
      <View style={styles.containerTitle}>
        <Text style={{ color: "#FFF", fontSize: dimensions(22) }}>
          Não temos nenhuma
        </Text>
        <Text style={{ color: "#FFF", fontSize: dimensions(22) }}>
          mídia para mostrar
        </Text>
      </View>

      <View style={styles.containerImg}>
        <Image
          source={ImageOutline}
          style={{ width: dimensions(150), height: dimensions(150) }}
        />
      </View>
      <View style={styles.containerSubtitle}>
        <Text style={styles.emptyStateTitle}>Adicione as suas fotos</Text>
        <Text style={styles.emptyStateSubTitle}>e divulgue o seu trabalho</Text>
      </View>
      <View style={styles.containerBtn}>
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

  emptyStateTitle: {
    color: "#ffffffad",
    fontFamily: "Montserrat-Bold",
    fontSize: dimensions(17),
    letterSpacing: 0.5
  },
  emptyStateSubTitle: {
    color: "#ffffffad",
    fontFamily: "Montserrat-Regular",
    fontSize: dimensions(17),
    letterSpacing: 0.5
  },

  containerTitle: {
    flex: 0.2,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  containerImg: {
    flex: 0.2,
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  containerBtn: {
    flex: 0.2,
    width: "95%",
    alignItems: "flex-end",
    justifyContent: "center"
  },
  containerSubtitle: {
    flex: 0.2,
    width: "95%",
    alignItems: "flex-end",
    justifyContent: "center"
  }
});

export default PhotoGalleryEmptyState;
