import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialIcons";
import {
  StyleSheet,
  Dimensions,
  Modal,
  TouchableOpacity,
  View,
  Text
} from "react-native";
import GallerySwiper from "react-native-gallery-swiper";

const Carousel = ({ isOpen, handleOpen, pictures, caption, indexGallery }) => {
  const { width } = Dimensions.get("screen");

  const images = pictures.map((picture) => ({
    source: { uri: picture.url },

    dimensions: { width: 1000, height: 1000 },
  }));

  const handleClose = () => {
    handleOpen(false); // Close the modal when the close button is pressed
  };

  const getItemLayout = (data, index) => {

    const itemLength = width; // Screen width
    const offset = itemLength * index;
    return { length: itemLength, offset, index };
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isOpen}
      onRequestClose={handleClose}
    >
      <View style={[styles.container, { width }]}>
        <TouchableOpacity onPress={handleClose} style={styles.closeButtonContainer}>
          <MaterialCommunityIcons name="close" size={38} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.caption}>{caption}</Text>
      </View>

      <GallerySwiper
        initialPage={indexGallery}
        style={styles.gallery}
        images={images}
        flatListProps={{
          initialScrollIndex: indexGallery,
          getItemLayout,
        }}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    flexDirection: "row",
    alignItems: "center",
    padding: "5%",
  },
  closeButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  caption: {
    color: "#F7F7F7",
    fontSize: 18,
    fontFamily: "Montserrat-Medium",
    flex: 1,
    textAlign: "center",
  },
  gallery: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    alignItems: "center",
  },
});

export default Carousel;
