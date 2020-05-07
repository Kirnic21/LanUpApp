import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { FlatList } from "react-native-gesture-handler";
import {
  updateGalleryImage,
  uploadGalleryImage,
  deleteGalleryImage,
} from "~/store/ducks/gallery/gallery.actions";
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  galery,
  galeries,
  decodeToken,
  galleryDelete,
  getAbout,
} from "~/shared/services/freela.http";
import AsyncStorage from "@react-native-community/async-storage";
import dimensions, { calcWidth } from "~/assets/Dimensions/index";
import ModalComingSoon from "~/shared/components/ModalComingSoon";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";

class UserProfile extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      selected: false,
      visible: false,
      spinner: false,
    };
  }

  async componentDidMount() {
    const token = decodeToken(await AsyncStorage.getItem("API_TOKEN"));
    this.setState({ spinner: false });
    getAbout(token.id)
      .then(({ data }) => {
        const { image } = data.result.value;
        const avatar = token ? image : user.authenticateUser.avatar.url;
        this.setState({ avatar });
      })
      .catch((error) => {
        console.log(error.response.data);
      })
      .finally(() => {
        this.setState({ spinner: true });
      });
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  renderSeparator = () => (
    <View
      style={{
        height: 2,
        width: "90%",
        backgroundColor: "#18142F",
        marginLeft: "5%",
        marginRight: "10%",
      }}
    />
  );

  PageLogin = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("HomePage");
    return;
  };

  handlePictureUpdate = async () => {
    const token = decodeToken(await AsyncStorage.getItem("API_TOKEN"));
    galeries(token.id).then(({ data }) => {
      this.props.updateGalleryImage(data.result);
    });
  };

  openMidia = async () => {
    const token = decodeToken(await AsyncStorage.getItem("API_TOKEN"));
    this.handlePictureUpdate();
    const handlePictureAdd = async (picture) => {
      const form = new FormData();
      form.append("formFile", {
        uri: picture.uri,
        type: picture.type,
        name: picture.name,
      });
      galery({
        id: token.id,
        url: form,
      })
        .then(async ({ data }) => {
          if (data.isSuccess) {
            this.handlePictureUpdate();
          }
        })
        .catch((error) => {
          console.log(error.response.data);
        });
      return;
    };

    const handlePictureRemove = (pictures) => {
      let queryParams;
      queryParams = pictures.reduce((accumulator, currentValue, index) => {
        if (index === 0) {
          return `names=${currentValue}`;
        } else {
          return `${accumulator}&names=${currentValue}`;
        }
      }, "");

      galleryDelete(token.id, queryParams).then(({ data }) => {
        this.props.deleteGalleryImage(pictures);
      });
    };

    this.props.navigation.navigate("PhotoGallery", {
      handlePictureAdd,
      handlePictureRemove,
    });
  };

  openModal = () => {
    this.setState({ visible: true });
  };

  navigateToScreen = (route) => {
    return this.props.navigation.navigate(route);
  };

  render() {
    const { visible, spinner } = this.state;
    return (
      <ScrollView contentContainerStyle={styles.Container}>
        <StatusBar backgroundColor="#18142F" barStyle="light-content" />
        <View style={{ alignItems: "center", marginTop: "5%" }}>
          <View style={{ marginVertical: calcWidth(-5) }}>
            <ShimmerPlaceHolder
              style={[styles.avatar]}
              width={calcWidth(25)}
              height={calcWidth(25)}
              autoRun={true}
              visible={spinner}
              colorShimmer={["#ebebeb", "#c9c9c9", "#ebebeb"]}
            >
              <Image
                source={{ uri: this.state.avatar }}
                style={[styles.avatar, { borderColor: "#FFB72B" }]}
              />
              <Icon
                name="circle"
                size={dimensions(24)}
                color="#86D7CA"
                style={{
                  left: dimensions(70),
                  top: dimensions(-25),
                }}
              />
            </ShimmerPlaceHolder>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => this.openModal()}
          style={{ width: dimensions(250), alignItems: "center" }}
        >
          <Text style={styles.submitText}>Pré-visualizar o perfil</Text>
        </TouchableOpacity>
        <FlatList
          contentContainerStyle={styles.list}
          data={[
            {
              title: "Sobre mim",
              subtitle: "Sua foto de perfil, apresentação e mais",
              onPress: () => this.navigateToScreen("AboutMe"),
            },
            {
              title: "Meu Job",
              subtitle: "Área de operação, disponibilidade e mais",
              onPress: () => this.navigateToScreen("Profession"),
            },
            {
              title: "Agências",
              subtitle: "Entre na equipe de sua agência",
              onPress: () => this.navigateToScreen("Agency"),
            },
            {
              title: "Galeria",
              subtitle: "Fotos e videos de seu trabalho",
              onPress: () => this.openMidia(),
            },
            {
              title: "Certificados",
              subtitle: "Fotos comprovando suas habilidades",
              onPress: () => this.navigateToScreen("Certificates"),
            },
            {
              title: "Disponibilidade",
              subtitle: "Dias, horários e feriados",
              onPress: () => this.navigateToScreen("Availability"),
            },
            {
              title: "Histórico de trabalho",
              subtitle: "Trabalho, avaliações e recomendações",
              onPress: () => this.openModal(),
            },
          ]}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={item.onPress}
              style={{
                ...styles.item,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View>
                <Text
                  style={{
                    color: "#FFF",
                    fontSize: dimensions(13),
                    marginBottom: dimensions(5),
                    fontFamily: "HelveticaNowMicro-Regular",
                  }}
                >
                  {item.title}
                </Text>
                <Text
                  style={{
                    color: "gray",
                    fontSize: dimensions(11),
                    borderBottomWidth: 0,
                    borderTopWidth: 0,
                    fontFamily: "HelveticaNowMicro-Light",
                  }}
                >
                  {item.subtitle}
                </Text>
              </View>
              <Icon color={"#FFF"} name={"angle-right"} size={dimensions(30)} />
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={this.renderSeparator}
          keyExtractor={(item, index) => index.toString()}
        />
        <TouchableOpacity onPress={() => this.openModal()}>
          <Text style={styles.agency}>Sou uma Agência</Text>
        </TouchableOpacity>
        <FlatList
          contentContainerStyle={[styles.list, { borderRadius: 10 }]}
          data={[
            {
              title: "Alterar Senha",
              onPress: () => this.navigateToScreen("ChangePassword"),
            },
          ]}
          renderItem={({ item, index }) => (
            <View style={[styles.changePassword]}>
              <TouchableOpacity onPress={item.onPress}>
                <Text
                  style={{
                    color: "#FFF",
                    fontSize: dimensions(13),
                    fontFamily: "HelveticaNowMicro-Regular",
                  }}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          ItemSeparatorComponent={this.renderSeparator}
          keyExtractor={(item, index) => index.toString()}
        />

        <Text
          onPress={() => this.PageLogin()}
          style={{
            ...styles.submitText,
            color: "white",
            marginBottom: dimensions(30),
          }}
        >
          Terminar sessão
        </Text>
        <ModalComingSoon
          onClose={() => this.setState({ visible: false })}
          visible={visible}
        />
      </ScrollView>
    );
  }
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  Container: {
    alignItems: "center",
    width: "100%",
    backgroundColor: "#18142F",
  },

  submitText: {
    marginTop: dimensions(20),
    paddingVertical: dimensions(10),
    color: "#46C5F3",
    textAlign: "center",
    backgroundColor: "#24203B",
    borderRadius: 20,
    fontSize: dimensions(13),
    width: "80%",
    fontFamily: "HelveticaNowMicro-Regular",
  },
  agency: {
    marginTop: dimensions(17),
    paddingVertical: dimensions(17),
    color: "#46C5F3",
    padding: 20,
    backgroundColor: "#24203B",
    borderRadius: 10,
    fontSize: dimensions(13),
    fontFamily: "HelveticaNowMicro-Regular",
    width: width - dimensions(50),
  },
  changePassword: {
    paddingVertical: dimensions(17),
    padding: 20,
    backgroundColor: "#24203B",
    borderRadius: 10,
    width: width - dimensions(50),
  },
  list: {
    marginTop: dimensions(17),
    backgroundColor: "#24203B",
    width: width - dimensions(50),
    borderRadius: 20,
  },
  item: {
    padding: dimensions(17),
  },
  avatar: {
    width: dimensions(90),
    height: dimensions(90),
    borderRadius: dimensions(50),
    borderWidth: 2,
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapActionToProps = (dispatch) =>
  bindActionCreators(
    { updateGalleryImage, uploadGalleryImage, deleteGalleryImage },
    dispatch
  );
export default connect(mapStateToProps, mapActionToProps)(UserProfile);
