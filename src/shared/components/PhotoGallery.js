import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import PhotoGalleryEmptyState from "./emptyState/PhotoGalleryEmptyState";
import { ScrollView } from "react-native-gesture-handler";
import Carousel from "./Carousel";
import ImageSelector from "./ImageSelector";
import { connect } from "react-redux";
import Image from "react-native-fast-image";
import Spinner from "react-native-loading-spinner-overlay";
import { calcWidth } from "~/assets/Dimensions";
import { HeaderBackButton } from "react-navigation-stack";

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
    isGalleryOpen: false,
    indexGallery: null
  };

  componentDidMount() {
    setInterval(() => {
      this.hideLoader();
    }, 4500);
  }

  static navigationOptions = ({ navigation }) => {
    const isEditing = navigation.getParam("isEditing");
    const cancelEditing = navigation.getParam("cancelEditing");
    const finishDelete = navigation.getParam("finishDelete");
    const images = navigation.getParam("images", []);

    return {
      headerLeft: () =>
        isEditing ? (
          <TouchableOpacity
            onPress={() => cancelEditing()}
            style={{ paddingHorizontal: calcWidth(5) }}
          >
            <MaterialCommunityIcons
              name={"close"}
              size={calcWidth(8)}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        ) : (
          <HeaderBackButton
            tintColor="#FFFFFF"
            onPress={() => navigation.goBack()}
          />
        ),
      headerRight: () =>
        isEditing && (
          <TouchableOpacity
            onPress={finishDelete}
            style={{
              paddingHorizontal: calcWidth(5),
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text style={styles.counter}>{images.length}</Text>
            <MaterialCommunityIcons
              name="delete"
              size={calcWidth(8)}
              color="#707070"
            />
          </TouchableOpacity>
        )
    };
  };

  showLoader = () => {
    this.setState({ spinner: true });
  };
  hideLoader = () => {
    this.setState({ spinner: false });
  };

  handleGalleryOpen = visible => {
    this.setState({ isGalleryOpen: visible });
  };

  handleOnPictureAdd = () => {
    this.ImageSelector.ActionSheet.show();
  };

  onPictureAdd = async picture => {
    await this.props.navigation.getParam("handlePictureAdd")(picture);
    this.showLoader();
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

  galleryIndex = index => {
    this.setState({ indexGallery: index });
  };

  render() {
    const { isGalleryOpen, indexGallery } = this.state;
    const { pictures } = this.props;
    const isEditing = this.props.navigation.getParam("isEditing");
    const caption = this.props.navigation.getParam("caption", "");
    return (
      <View style={styles.container}>
        <Spinner
          visible={this.state.spinner}
          size="large"
          animation="fade"
          color="#7541BF"
          overlayColor="rgba(0, 0, 0, 0.9)"
        />
        {pictures.length ? (
          <ScrollView contentContainerStyle={styles.contentContainerStyle}>
            <React.Fragment>
              <TouchableOpacity
                onPress={this.handleOnPictureAdd}
                style={styles.addPictureContainer}
              >
                <MaterialCommunityIcons name="camera" size={38} color="#FFF" />
              </TouchableOpacity>
              {pictures.map((picture, index) => (
                <View key={index}>
                  <Picture
                    picture={picture}
                    isSelectedToDelete={this.isSelectedToDelete(picture)}
                    handleImageLongPress={picture =>
                      this.handleImageLongPress(picture)
                    }
                    handleOnPress={value => {
                      this.galleryIndex(index);
                      isEditing
                        ? this.addImageToDelete(picture)
                        : this.handleGalleryOpen(value);
                    }}
                  />
                </View>
              ))}
            </React.Fragment>
          </ScrollView>
        ) : (
          <PhotoGalleryEmptyState onPictureAdd={this.handleOnPictureAdd} />
        )}
        <Carousel
          indexGallery={indexGallery}
          caption={caption}
          isOpen={isGalleryOpen}
          handleOpen={this.handleGalleryOpen}
          pictures={pictures}
        />
        <ImageSelector
          onImageSelected={this.onPictureAdd}
          width={1500}
          height={2000}
          ref={o => (this.ImageSelector = o)}
        />
      </View>
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
    marginVertical: 5,
    width: 117,
    height: 81,
    marginLeft: 9,
    borderRadius: 4
  },
  addPictureContainer: {
    width: 117,
    height: 81,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7541BF",
    borderRadius: 4,
    marginVertical: 5,
    marginLeft: 9
  },
  selectedOverlayContainer: {
    backgroundColor: "rgba(27, 191, 191, 0.8)",
    width: 117,
    height: 81,
    marginVertical: 5,
    marginLeft: 9,
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
