import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  StyleSheet,
  Dimensions,
  Modal,
  TouchableOpacity,
  View,
  Text
} from "react-native";
import Gallery from "react-native-image-gallery";

const Carousel = ({ isOpen, galleryIndex, handleOpen, pictures, caption }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isOpen}
      onRequestClose={() => {}}
    >
      <View style={styles.closeContainer}>
        <TouchableOpacity
          onPress={() => handleOpen(!isOpen)}
          style={styles.closeButtonContainer}
        >
          <MaterialCommunityIcons name="close" size={38} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.caption}>{caption}</Text>
      </View>
      <Gallery
        initialPage={galleryIndex}
        style={styles.gallery}
        images={pictures.map(picture => ({
          source: { uri: picture.url },
          dimensions: { width: 150, height: 150 }
        }))}
      />
    </Modal>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  closeContainer: {
    width,
    backgroundColor: "rgba(114, 114, 114, 0.9)",
    flexDirection: "row",
    alignItems: "center"
  },
  closeButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 30
  },
  caption: {
    color: "#F7F7F7",
    fontSize: 18,
    fontFamily: "Montserrat-Medium",
    flex: 1
  },
  gallery: {
    flex: 1,
    backgroundColor: "rgba(114, 114, 114, 0.8)"
  }
});

export default Carousel;
