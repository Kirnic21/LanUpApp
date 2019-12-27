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

const Carousel = ({ isOpen, handleOpen, pictures, caption, indexGallery }) => {
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
        initialPage={indexGallery}
        style={styles.gallery}
        images={pictures.map(picture => ({
          source: { uri: picture.url },
          dimensions: { width: 1000, height: 1000 }
        }))}
        flatListProps={{
          initialScrollIndex: indexGallery,
          getItemLayout: (data, index) => ({
            length: Dimensions.get("screen").width,
            offset: Dimensions.get("screen").width * index,
            index
          })
        }}
      />
    </Modal>
  );
};

const { width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  closeContainer: {
    width,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    flexDirection: "row",
    alignItems: "center"
  },
  closeButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: "5%"
  },
  caption: {
    color: "#F7F7F7",
    fontSize: 18,
    fontFamily: "Montserrat-Medium",
    flex: 1
  },
  gallery: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    alignItems: "center"
  }
});

export default Carousel;
