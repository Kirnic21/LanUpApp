import React from "react";
import { StyleSheet, Dimensions, View, Text, Image } from "react-native";
import ImageOutline from "~/assets/images/outline.png";
import ActionButton from "~/shared/components/ActionButton";
import dimensions, { calcWidth, adjust } from "~/assets/Dimensions/index";

const EmptyState = ({
  onPress,
  title,
  subtitle,
  image,
  imageStyle,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerEmptyTitle}>
        <Text style={styles.emptyTitle}>{title || "Titulo"}</Text>
      </View>

      <View style={styles.containerEmptyImg}>
        <Image
          source={image || ImageOutline}
          style={[{ width: calcWidth(45), height: calcWidth(45) }, imageStyle]}
        />
      </View>
      <View style={styles.containerEmptySubtitle}>
        <Text style={styles.emptySubtitle}>{subtitle || "Subtitulo"}</Text>
      </View>
      <View style={styles.containerEmptyBtn}>
        <ActionButton onPress={onPress} />
      </View>
    </View>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  containerEmptyTitle: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    height: "25%",
  },
  containerEmptyImg: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: "28%",
  },
  containerEmptySubtitle: {
    width: "100%",
    alignItems: "center",
    height: "20%",
  },
  containerEmptyBtn: {
    width: "95%",
    alignItems: "flex-end",
    justifyContent: "center",
    height: "20%",
  },
  emptyTitle: {
    color: "#FFF",
    fontSize: adjust(18),
    fontFamily: "HelveticaNowDisplay-Regular",
    textAlign: "center",
    lineHeight: calcWidth(11),
  },
  emptyStateContainer: {
    borderColor: "#FFF",
    borderWidth: 2,
  },

  emptySubtitle: {
    color: "#ffffffad",
    fontFamily: "HelveticaNowMicro-ExtraLight",
    lineHeight: adjust(19),
    fontSize: adjust(12),
    textAlign: "center",
  },
});

export default EmptyState;
