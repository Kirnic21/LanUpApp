import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
  PixelRatio,
  AppRegistry,
  Dimensions,
  Image,
  ScrollView
} from "react-native";
import FastImage from "react-native-fast-image";
import ImageOutline from "../../assets/images/outline.png";
import ActionButton from "../../shared/components/ActionButton";
import ImagePicker from "react-native-image-picker";
import Icon from "react-native-vector-icons/FontAwesome";
import Carousel from "../../shared/components/Carousel";
// import GallerySwiper from "react-native-gallery-swiper";

export default class Midia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageuri: "",
      images: [],
      isGalleryOpen: false,
      ModalVisibleStatus: false,
      imageURL: []
    };
  }

  chooseFile = () => {
    var options = {
      title: "Select Image",
      storageOptions: {
        skipBackup: true,
        path: "images"
      }
    };
    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
        alert(response.customButton);
      } else {
        let source = { uri: response.uri };
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          images: [...this.state.images, source]
        });
      }
    });
  };

  handleGalleryOpen = (isGalleryOpen, galleryIndex) => {
    this.setState({ isGalleryOpen, galleryIndex });
  }

  // componentDidMount() {
  //   var that = this;
  //   let items = Array.apply(null, Array(120)).map((v, i) => {
  //     return { id: i, src: "https://unsplash.it/400/400?image=" + (i + 1) };
  //   });
  //   that.setState({
  //     dataSource: items
  //   });
  // }

  render() {
    const { images, isGalleryOpen, galleryIndex } = this.state;

    return (
      <ScrollView>
        {images.length != 0 ? (
          <View style={styles.Container}>
            <FlatList
              data={images}
              renderItem={({ item, index }) => (
                <View style={{ flex: 1, flexDirection: "column", margin: 1 }}>
                  <TouchableOpacity
                    key={item}
                    style={{ flex: 1 }}
                    onPress={() => {
                      this.handleGalleryOpen(true, index);
                    }}
                  >
                    <FastImage style={styles.image} source={item} />
                  </TouchableOpacity>
                </View>
              )}
              //Setting the number of column
              numColumns={3}
              keyExtractor={(item, index) => index.toString()}
            />
            <ActionButton onPress={this.chooseFile.bind(this)} />
            <Carousel
              galleryIndex={galleryIndex}
              handleOpen={this.handleGalleryOpen}
              pictures={images}
              isOpen={isGalleryOpen}
            />
          </View>
        ) : (
            <View
              style={[
                styles.Container,
                {
                  alignItems: "center",
                  height: Dimensions.get("window").height + 48
                }
              ]}
            >
              <View style={styles.ContainerTitle}>
                <Text style={styles.title}>Não temos nenhuma</Text>
                <Text style={styles.title}>midia para mostrar</Text>
              </View>
              <View style={styles.ContainerImg}>
                <Image
                  source={ImageOutline}
                  style={{ height: "70%", width: "70%" }}
                />
              </View>
              <View style={styles.ContainerSubtitle}>
                <Text style={styles.subtitle}>Adicione as suas fotos</Text>
                <Text style={styles.subtitle}>e divulgue o seu trabalho</Text>
              </View>
              <View
                style={{
                  alignItems: "flex-end",
                  height: 50,
                  width: Dimensions.get("window").width - 100,
                  flex: 0.5
                }}
              >
                <ActionButton onPress={this.chooseFile.bind(this)} />
              </View>
            </View>
          )}
      </ScrollView>
    );
  }
}
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30
  },
  image: {
    height: 120,
    width: "100%"
  },
  fullImageStyle: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "98%",
    resizeMode: "contain"
  },
  modelStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)"
  },
  closeButtonStyle: {
    width: 35,
    height: 35,
    top: 9,
    right: 9,
    position: "absolute"
  },
  Container: {
    flexDirection: "column",

    justifyContent: "center",
    width,
    backgroundColor: "#18142F",
    height: 820
  },
  ContainerTitle: {
    height: 50,
    width: Dimensions.get("window").width - 100,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  ContainerImg: {
    height: 50,
    width: Dimensions.get("window").width - 100,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  ContainerSubtitle: {
    height: 50,
    width: Dimensions.get("window").width - 100,
    flex: 1,
    alignItems: "center"
  },
  title: {
    color: "#FFF",
    fontSize: 25,
    letterSpacing: 1,
    lineHeight: 40
  },
  subtitle: {
    color: "#FFFFFF",
    fontSize: 18,
    lineHeight: 30
  }
});

AppRegistry.registerComponent("Midia", () => Midia);
