import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialIcons";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import PhotoGalleryEmptyState from "./emptyState/EmptyState";
import { ScrollView } from "react-native-gesture-handler";
import Carousel from "./Carousel";
import ImageSelector from "./ImageSelector";
import { connect } from "react-redux";
import Image from "react-native-fast-image";
import { calcWidth, adjust } from "~/assets/Dimensions";
import SpinnerComponent from "./SpinnerComponent";
import ImageOutline from "~/assets/images/outline.png";
import ButtonNavigation from "~/shared/components/ButtonNavigation";

const Picture = ({
  picture,
  handleOnPress,
  handleImageLongPress,
  isSelectedToDelete,
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
    indexGallery: null,
  };
componentDidUpdate(prevProps) {
  if (prevProps.route.params?.isEditing !== this.props.route.params?.isEditing) {
    // Handle the change here, for example, update the header
    this.props.navigation.setOptions({
      headerLeft: () => {
        const isEditing = this.props.route.params?.isEditing;
        const cancelEditing = this.props.route.params?.cancelEditing;

        return isEditing ? (
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
          <ButtonNavigation type="stack" navigation={this.props.navigation} />
        );
      },
      headerRight: () => {
        const isEditing = this.props.route.params?.isEditing;
        const finishDelete = this.props.route.params?.finishDelete;
        const images = this.props.route.params?.images || [];

        return isEditing ? (
          <TouchableOpacity
            onPress={finishDelete}
            style={{
              paddingHorizontal: calcWidth(5),
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={styles.counter}>{images.length}</Text>
            <MaterialCommunityIcons
              name="delete"
              size={calcWidth(8)}
              color="#707070"
            />
          </TouchableOpacity>
        ) : null;
      },
    });
  }
}
  componentDidMount() {
    setInterval(() => {
      this.hideLoader();
    }, 4500);
     this.props.navigation.setOptions({
        headerLeft: () => {
          const isEditing = this.props.route.params?.isEditing;
          const cancelEditing = this.props.route.params?.cancelEditing;

          return isEditing ? (
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
            <ButtonNavigation type="stack" navigation={this.props.navigation} />
          );
        },

      });
  }



  showLoader = () => {
    this.setState({ spinner: true });
  };
  hideLoader = () => {
    this.setState({ spinner: false });
  };

  handleGalleryOpen = (visible) => {
    this.setState({ isGalleryOpen: visible });
  };

  handleOnPictureAdd = () => {
    this.ImageSelector.ActionSheet.show();
  };

onPictureAdd = async (picture) => {

  if (this.props.route.params?.handlePictureAdd) {
    await this.props.route.params.handlePictureAdd(picture);
  }

  this.showLoader();
};


  handleImageLongPress = (picture) => {
   const images = this.props.route.params.images || [];

    this.props.navigation.setParams({
      isEditing: true,
      finishDelete: this.finishDelete,
      cancelEditing: this.cancelEditing,
      images: [...images, picture.name],
    });
  };

  finishDelete = async () => {
    const { route, navigation } = this.props;
    const imagesToRemove = route.params?.images || [];

    if (route.params?.handlePictureRemove) {
      await route.params.handlePictureRemove(imagesToRemove);
    }

    this.cancelEditing();
  };


  cancelEditing = () => {
    this.props.navigation.setParams({
      isEditing: false,
      images: [],
    });
  };

  isSelectedToDelete = (picture) => {
    const images = this.props.route.params.images || [];

    return images.some((x) => x === picture.name);
  };

  addImageToDelete = (picture) => {
    let images = this.props.route.params?.images || [];

    if (images.includes(picture.name)) {
      images = images.filter((x) => x !== picture.name);
      this.props.navigation.setParams({
        images: images,
        isEditing: images.length > 0,
      });
      return;
    }

    this.props.navigation.setParams({
      images: [...images, picture.name],
    });
  };

  galleryIndex = (index) => {
    this.setState({ indexGallery: index });
  };

  render() {
    const { isGalleryOpen, indexGallery } = this.state;
    const { pictures } = this.props;

   const isEditing = this.props.route.params.isEditing;
   const caption = this.props.route.params.caption || "";

    const { spinner } = this.state;
    return (
      <View style={styles.container}>
        <SpinnerComponent loading={spinner} />
        {pictures.length ? (
          <ScrollView contentContainerStyle={styles.contentContainerStyle}>
            <React.Fragment>
              <TouchableOpacity
                onPress={this.handleOnPictureAdd}
                style={styles.addPictureContainer}
              >
                <MaterialCommunityIcons
                  name="photo-camera"
                  size={38}
                  color="#FFF"
                />
              </TouchableOpacity>
              {pictures.map((picture, index) => (
                <View key={index}>
                  <Picture
                    picture={picture}
                    isSelectedToDelete={this.isSelectedToDelete(picture)}
                    handleImageLongPress={(picture) =>
                      this.handleImageLongPress(picture)
                    }
                    handleOnPress={(value) => {
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
          <PhotoGalleryEmptyState
            title={
              <Text>
                Adicione as fotos dos trabalhos{"\n"} realizados para facilitar
                que {"\n"}o contratante escolha seu perfil.
              </Text>
            }
            subtitle={
              <Text>
                As fotos dos trabalhos realizados{"\n"} que comprovam suas
                experiências {"\n"}para receber mais vagas.
              </Text>
            }
            image={ImageOutline}
            onPress={this.handleOnPictureAdd}
          />
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
        ref={(o) => (this.ImageSelector = o)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#18142F",
  },
  contentContainerStyle: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  thumbContainer: {},
  picture: {
    marginVertical: 5,
    width: calcWidth(30),
    height: calcWidth(25),
    marginLeft: 9,
    borderRadius: 4,
  },
  addPictureContainer: {
    width: calcWidth(30),
    height: calcWidth(25),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7541BF",
    borderRadius: 4,
    marginVertical: 5,
    marginLeft: 9,
  },
  selectedOverlayContainer: {
    backgroundColor: "rgba(27, 191, 191, 0.8)",
    width: 117,
    height: 81,
    marginVertical: 5,
    marginLeft: 9,
    position: "absolute",
    borderRadius: 4,
  },
  counter: {
    color: "#707070",
    fontFamily: "Montserrat-Regular",
    fontSize: adjust(15),
    marginRight: 4,
  },
});

const mapStateToProps = (state, ownProps) => {
  return {
    pictures: state.gallery,
  };
};

export default connect(mapStateToProps, () => ({}))(PhotoGallery);
