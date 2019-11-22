import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { StyleSheet, TouchableOpacity, Image, View, Text } from "react-native";
import PhotoGalleryEmptyState from "./emptyState/PhotoGalleryEmptyState";
import { ScrollView } from "react-native-gesture-handler";
import Carousel from "./Carousel";
import ImageSelector from "./ImageSelector";
import { connect } from "react-redux";

const Picture = ({
  picture,
  handleOnPress,
  handleImageLongPress,
  isSelectedToDelete
}) => {
  return (
    <TouchableOpacity
      onLongPress={() => handleImageLongPress(picture)}
      onPress={() => handleOnPress(true)}
      style={styles.thumbContainer}
    >
      <Image
        borderRadius={4}
        style={styles.picture}
        source={{ uri: picture.url }}
      />
      {isSelectedToDelete && (
        <View style={styles.selectedOverlayContainer}></View>
      )}
    </TouchableOpacity>
  );
};

class PhotoGallery extends React.Component {
  state = {
    isGalleryOpen: false
  };

  static navigationOptions = ({ navigation }) => {
    const isEditing = navigation.getParam("isEditing");
    const cancelEditing = navigation.getParam("cancelEditing");
    const finishDelete = navigation.getParam("finishDelete");
    const images = navigation.getParam("images", []);

    return {
      title: "Galeria",
      headerStyle: {
        backgroundColor: "#18142F",
        height: 80,
        elevation: 0
      },
      headerTitleStyle: {
        textAlign: "center",
        alignSelf: "center",
        width: "80%",
        fontFamily: "Montserrat-Bold",
        color: "#FFFFFF",
        fontSize: 20
      },
      headerLeft: (
        <TouchableOpacity
          onPress={() => (isEditing ? cancelEditing() : navigation.goBack())}
          style={{ paddingHorizontal: 29 }}
        >
          <MaterialCommunityIcons
            name={isEditing ? "close" : "chevron-left"}
            size={38}
            color="#FFFFFF"
          />
        </TouchableOpacity>
      ),
      headerRight: isEditing && (
        <TouchableOpacity
          onPress={finishDelete}
          style={{
            paddingHorizontal: 29,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text style={styles.counter}>{images.length}</Text>
          <MaterialCommunityIcons name="delete" size={28} color="#707070" />
        </TouchableOpacity>
      )
    };
  };

  handleGalleryOpen = visible => {
    this.setState({ isGalleryOpen: visible });
  };

  handleOnPictureAdd = () => {
    this.ImageSelector.ActionSheet.show();
  };

  onPictureAdd = async picture => {
    await this.props.navigation.getParam("handlePictureAdd")(picture);
  };

  handleImageLongPress = picture => {
    const images = this.props.navigation.getParam("images", []);
    this.props.navigation.setParams({
      isEditing: true,
      finishDelete: this.finishDelete,
      cancelEditing: this.cancelEditing,
      images: [...images, picture.name]
    });
  };

  finishDelete = async () => {
    const { navigation } = this.props;
    const imagesToRemove = navigation.getParam("images", []);
    await navigation.getParam("handlePictureRemove")(imagesToRemove);
    this.cancelEditing();
  };

  cancelEditing = () => {
    this.props.navigation.setParams({
      isEditing: false,
      images: []
    });
  };

  isSelectedToDelete = picture => {
    const images = this.props.navigation.getParam("images", []);
    return images.some(x => x === picture.name);
  };

  addImageToDelete = picture => {
    let images = this.props.navigation.getParam("images", []);

    if (images.some(x => x === picture.name)) {
      images = images.filter(x => x !== picture.name);
      this.props.navigation.setParams({
        images: images,
        isEditing: images.length > 0
      });
      return;
    }

    this.props.navigation.setParams({
      images: [...images, picture.name]
    });
  };

  render() {
    const { isGalleryOpen } = this.state;
    const { pictures } = this.props;
    const isEditing = this.props.navigation.getParam("isEditing");
    const caption = this.props.navigation.getParam("caption", "");
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyle}
      >
        {pictures.length ? (
          <React.Fragment>
            <TouchableOpacity
              onPress={this.handleOnPictureAdd}
              style={styles.addPictureContainer}
            >
              <MaterialCommunityIcons name="camera" size={38} color="#FFF" />
            </TouchableOpacity>
            {pictures.map((picture, index) => (
              <Picture
                picture={picture}
                key={index}
                isSelectedToDelete={this.isSelectedToDelete(picture)}
                handleImageLongPress={picture =>
                  this.handleImageLongPress(picture)
                }
                handleOnPress={value =>
                  isEditing
                    ? this.addImageToDelete(picture)
                    : this.handleGalleryOpen(value)
                }
              />
            ))}
          </React.Fragment>
        ) : (
          <PhotoGalleryEmptyState onPictureAdd={this.handleOnPictureAdd} />
        )}
        <Carousel
          caption={caption}
          isOpen={isGalleryOpen}
          handleOpen={this.handleGalleryOpen}
          pictures={pictures}
        />
        <ImageSelector
          onImageSelected={this.onPictureAdd}
          width={1280}
          height={720}
          ref={o => (this.ImageSelector = o)}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#18142F"
  },
  contentContainerStyle: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  thumbContainer: {},
  picture: {
    marginVertical: 10,
    width: 108,
    height: 81,
    marginLeft: 10
  },
  addPictureContainer: {
    width: 108,
    height: 81,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7541BF",
    borderRadius: 4,
    marginVertical: 10,
    marginLeft: 10
  },
  selectedOverlayContainer: {
    backgroundColor: "rgba(27, 191, 191, 0.8)",
    width: 108,
    height: 81,
    marginVertical: 10,
    marginLeft: 10,
    position: "absolute",
    borderRadius: 4
  },
  counter: {
    color: "#707070",
    fontFamily: "Montserrat-Regular",
    fontSize: 20,
    marginRight: 4
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    pictures: state.gallery
  };
};

export default connect(mapStateToProps, () => ({}))(PhotoGallery);
