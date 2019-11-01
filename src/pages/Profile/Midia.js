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
import GallerySwiper from "react-native-gallery-swiper";
import AsyncStorage from "@react-native-community/async-storage";
import {
  registerAgencies,
  decodeToken
} from "../../shared/services/freela.http";

import { galery, galeries } from "../../shared/services/freela.http";

export default class Midia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageuri: "",
      galleryIndex: 0,
      ModalVisibleStatus: false,
      filePath: [],
      imageURL: []
    };
  }

  async componentDidMount() {
    const token = decodeToken(await AsyncStorage.getItem("API_TOKEN"));
    galeries(token.id).then(({ data }) => {
      this.setState({
        filePath: data.result
      });
    });
  }

  chooseFile = async () => {
    const token = decodeToken(await AsyncStorage.getItem("API_TOKEN"));
    var options = {
      title: "Select Image",
      storageOptions: {
        skipBackup: true,
        path: "images"
      }
    };
    const imageData = new FormData();

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
        imageData.append("formFile", {
          uri: response.uri,
          type: response.type,
          name: response.fileName,
          data: response.data
        });
        let source = { uri: response.uri };
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          filePath: [source]
        });
      }

      galery({
        id: token.id,
        url: imageData
      })
        .then(async ({ data }) => {
          if (data.isSuccess) {
            galeries(token.id).then(({ data }) => {
              this.setState({
                filePath: data.result
              });
            });
          }
        })
        .catch(error => {
          debugger;
          console.log(error.response.data);
        });
      debugger;
    });
  };

  ShowModalFunction(visible) {
    //handler to handle the click on image of Grid
    //and close button on modal
    this.setState({
      ModalVisibleStatus: visible
      // imageuri: imageURL
    });
  }

  render() {
    const { galleryIndex, ModalVisibleStatus } = this.state;

    if (ModalVisibleStatus) {
      return (
        <Modal
          transparent={false}
          animationType={"fade"}
          visible={ModalVisibleStatus}
          onRequestClose={() => {
            this.ShowModalFunction(!ModalVisibleStatus, "");
          }}
        >
          <View style={styles.modelStyle}>
            <GallerySwiper
              initialPage={galleryIndex}
              images={this.state.filePath}
              onPageSelected={index => {
                debugger;
                this.setState({ galleryIndex: index });
              }}
            />
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.closeButtonStyle}
              onPress={() => {
                this.ShowModalFunction(!this.state.ModalVisibleStatus, "");
              }}
            >
              <Icon
                name="close"
                size={20}
                color="#fff"
                style={{ width: 35, height: 35, marginTop: 16 }}
              />
            </TouchableOpacity>
          </View>
        </Modal>
      );
    } else {
      return (
        <ScrollView>
          {this.state.filePath.length != 0 ? (
            <View style={styles.Container}>
              <FlatList
                data={this.state.filePath}
                renderItem={({ item }) => (
                  <View style={{ flex: 1, flexDirection: "column", margin: 1 }}>
                    <TouchableOpacity
                      key={item}
                      style={{ flex: 1 }}
                      onPress={() => {
                        this.ShowModalFunction(true, item);
                      }}
                    >
                      <FastImage
                        style={styles.image}
                        source={{
                          uri: item.url
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                )}
                //Setting the number of column
                numColumns={3}
                keyExtractor={(item, index) => index.toString()}
              />
              {/* <View
                style={{
                  alignItems: "flex-end",
                  height: 50,
                  width: Dimensions.get("window").width - 100,
                  flex: 0.5,
                  top: "-16%",
                  left: "15%"
                }}
              >
                
              </View> */}
              <ActionButton onPress={this.chooseFile.bind(this)} />
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
}
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30
  },
  image: {
    height: 120,
    width: 120
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
