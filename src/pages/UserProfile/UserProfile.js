import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { FlatList } from "react-native-gesture-handler";
import {
  updateGalleryImage,
  uploadGalleryImage,
  deleteGalleryImage,
} from "~/store/ducks/gallery/gallery.actions";
import { notifyVacancy } from "~/store/ducks/vacancies/vacancies.actions";
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
  getAvailability,
} from "~/shared/services/freela.http";
import AsyncStorage from "@react-native-community/async-storage";
import dimensions, { calcWidth } from "~/assets/Dimensions/index";
import ModalComingSoon from "~/shared/components/ModalComingSoon";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";
import SignalR from "~/shared/services/signalr";

class UserProfile extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      selected: false,
      visible: false,
      spinner: false,
      emergencyAvailability: false,
    };
  }

  componentDidMount() {
    this.setState({ spinner: false }, async () => {
      const token = decodeToken(await AsyncStorage.getItem("API_TOKEN"));

      getAbout(token.id)
        .then(({ data }) => this.onGetAboutSuccess(data, token))
        .catch((error) => console.log(error.response.data));

      this.setState({ spinner: true }, () => {
        this._isMounted = true;
      });
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onGetAboutSuccess = (data, token) => {
    const { image, emergercyAvailabilityEnabled } = data.result.value;
    const avatar = token ? image : this.Suser.authenticateUser.avatar.url;

    this.setState(
      { avatar, emergencyAvailability: emergercyAvailabilityEnabled },
      () => {
        SignalR.connect().then((conn) => {
          if (emergercyAvailabilityEnabled) {
            conn.invoke("AddToGroup");
            conn.on(SignalR.channels.RECEIVE_VACANCY, this.onReceiveVacancy);
          }
        });
      }
    );
  };

  onReceiveVacancy = (vacancy, x) => {
    console.log(vacancy);
    if (!vacancy.eventId) return;
    this.props.notifyVacancy(vacancy);
    this.props.navigation.navigate("Modal");
    console.log(x);
  };

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

  aboutMe = () => {
    this.props.navigation.navigate("AboutMe");
  };

  PageLogin = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("HomePage");
  };

  openProfession = () => {
    this.props.navigation.navigate("Profession");
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
  closeModal = () => {
    this.setState({ visible: false });
  };

  openAgencies = () => {
    this.props.navigation.navigate("Agencies");
  };

  openPreviewProfile = () => {
    this.props.navigation.navigate("PreviewProfile");
  };

  openAvaliability = () => {
    this.props.navigation.navigate("Availability");
  };

  openChangePassword = () => {
    this.props.navigation.navigate("ChangePassword");
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
        {/* TODO: essas funções do onPress não precissa fazer um método pra cada!
          faz uma função que recebe a rota que precisa ir on onPress
           (ex: navegar('AboutMe'))
          daí pra cada onPress passa uma rota especifica para essa função
           (ex: navegar('batata'), navegar('abacaxi'))
        */}
        <FlatList
          contentContainerStyle={styles.list}
          data={[
            {
              key: "1",
              title: "Sobre mim",
              subtitle: "Sua foto de perfil, apresentação e mais",
              onPress: () => this.aboutMe(),
            },
            {
              key: "2",
              title: "Meu Job",
              subtitle: "Área de operação, disponibilidade e mais",
              onPress: () => this.openProfession(),
            },
            {
              key: "3",
              title: "Agências",
              subtitle: "Entre na equipe de sua agência",
              onPress: () => this.props.navigation.navigate("Agency"),
            },
            {
              key: "4",
              title: "Galeria",
              subtitle: "Fotos e videos de seu trabalho",
              onPress: () => this.openMidia(),
            },
            {
              key: "5",
              title: "Disponibilidade",
              subtitle: "Dias, horários e feriados",
              onPress: () => this.openAvaliability(),
            },
            {
              key: "6",
              title: "Histórico de trabalho",
              subtitle: "Trabalho, avaliações e recomendações",
              onPress: () => this.openModal(),
            },
          ]}
          renderItem={({ item }) => (
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
          keyExtractor={(item) => item.key}
        />
        <TouchableOpacity onPress={() => this.openModal()}>
          <Text style={styles.agency}>Sou uma Agência</Text>
        </TouchableOpacity>
        <FlatList
          contentContainerStyle={[styles.list, { borderRadius: 10 }]}
          data={[
            {
              key: "1",
              title: "Alterar Senha",
              onPress: () => this.openChangePassword(),
            },
          ]}
          renderItem={({ item }) => (
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
          keyExtractor={(item) => item.key}
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
          onTouchOutside={() => this.closeModal()}
          onClose={() => this.closeModal()}
          visible={visible}
          onSwipeOut={() => this.setState({ bottomModalAndTitle: false })}
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
    {
      updateGalleryImage,
      uploadGalleryImage,
      deleteGalleryImage,
      notifyVacancy,
    },
    dispatch
  );
export default connect(mapStateToProps, mapActionToProps)(UserProfile);
