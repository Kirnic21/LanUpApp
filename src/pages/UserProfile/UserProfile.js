import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  updateGalleryImage,
  uploadGalleryImage,
  deleteGalleryImage,
} from "~/store/ducks/gallery/gallery.actions";
import { notifyVacancy } from "~/store/ducks/vacancies/vacancies.actions";
import { setAbout } from "~/store/ducks/aboutMe/about.actions";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import Image from "react-native-fast-image";
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
import SignalR from "~/shared/services/signalr";
import { emergenciesVacancies } from "~/shared/services/events.http";

class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: false,
      visible: false,
      spinner: false,
      emergencyAvailability: false,
      data: [
        {
          title: "Sobre mim",
          subtitle: "Sua foto de perfil, apresentação e mais",
          onPress: () => this.navigateToScreen("AboutMe"),
        },
        {
          title: "Funções que atuo",
          subtitle: "Área de operação, e habilidades",
          onPress: () => this.navigateToScreen("Profession"),
        },
        {
          title: "Agências",
          subtitle: "Entre na equipe de sua agência",
          onPress: () => this.navigateToScreen("Agency"),
        },
        {
          title: "Fotos dos jobs",
          subtitle: "Fotos e videos de seu trabalho",
          onPress: () => this.openMidia(),
        },
        // {
        //   title: "Certificados",
        //   subtitle: "Fotos comprovando suas habilidades",
        //   onPress: () => this.navigateToScreen("Certificates"),
        // },
        {
          title: "Disponibilidade",
          subtitle: "Dias, horários e feriados",
          onPress: () => this.navigateToScreen("Availability"),
        },
        {
          title: "Jobs realizados",
          subtitle: "Trabalhos, avaliações e recomendações",
          onPress: () => this.openModal(),
        },
      ],
    };
  }

  componentDidMount() {
    this.setState({ spinner: false }, async () => {
      const token = decodeToken(await AsyncStorage.getItem("API_TOKEN"));

      getAbout(token.id)
        .then(({ data }) => this.onGetAboutSuccess(data, token))
        .catch((error) => console.log(error.response.data))
        .finally(() => this.setState({ spinner: true }));
    });
  }
  onGetAboutSuccess = (data, token) => {
    this.props.setAbout(data.result.value);
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

  onReceiveVacancy = async (vacancy, x) => {
    if (!vacancy.eventId) return;
    try {
      const {
        data: { result },
      } = await emergenciesVacancies({
        id: vacancy.eventId,
        service: vacancy.job,
        day: vacancy.day,
      });
      this.props.notifyVacancy([result, vacancy]);
      this.props.navigation.navigate("Modal");
    } catch (error) {
      console.log(error);
    }
  };

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
    const { visible, spinner, data } = this.state;
    return (
      <View style={styles.Container}>
        <ScrollView>
          <View style={{ alignItems: "center", marginTop: calcWidth(2) }}>
            <View style={{ flexDirection: "row" }}>
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
              </ShimmerPlaceHolder>
              <View style={styles.IconContainer}>
                <Icon name="circle" size={dimensions(24)} color="#86D7CA" />
              </View>
            </View>
            <TouchableOpacity
              onPress={() => this.navigateToScreen("ViewProfile")}
              style={[{ width: dimensions(250), alignItems: "center" }]}
            >
              <Text style={[styles.submitText, styles.backColorSteelGray]}>
                Visualizar o perfil na web
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.backColorSteelGray, styles.content]}>
            {data.map((x, i) => (
              <TouchableOpacity
                onPress={x.onPress}
                key={i}
                style={[
                  styles.buttonItens,
                  { borderBottomWidth: i === data.length - 1 ? 0 : 2 },
                ]}
              >
                <View style={{}}>
                  <Text style={styles.titleContent}>{x.title}</Text>
                  <Text style={styles.subtitleContent}>{x.subtitle}</Text>
                </View>
                <Icon
                  color={"#FFF"}
                  name={"angle-right"}
                  size={dimensions(30)}
                />
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            onPress={() => this.navigateToScreen("ChangePassword")}
            style={[
              styles.content,
              styles.backColorSteelGray,
              { marginTop: calcWidth(0) },
            ]}
          >
            <Text style={styles.titleContent}>Alterar Senha</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.PageLogin()}
            style={[
              styles.backColorSteelGray,
              {
                margin: calcWidth(5),
                alignItems: "center",
                paddingVertical: calcWidth(2),
                marginBottom: calcWidth(12),
                borderRadius: calcWidth(4),
                marginHorizontal: calcWidth(15),
              },
            ]}
          >
            <Text style={styles.titleContent}>Terminar sessão</Text>
          </TouchableOpacity>
          <ModalComingSoon
            onClose={() => this.setState({ visible: false })}
            visible={visible}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#18142F",
  },
  backColorSteelGray: {
    backgroundColor: "#24203B",
  },
  IconContainer: {
    margin: calcWidth(20),
    position: "absolute",
  },
  titleContent: {
    color: "#FFFFFF",
    fontSize: dimensions(14),
    fontFamily: "HelveticaNowMicro-Regular",
  },
  subtitleContent: {
    fontFamily: "HelveticaNowMicro-Light",
    color: "rgba(255,255,255,0.7)",
    fontSize: dimensions(11.5),
  },
  content: {
    margin: calcWidth(5),
    padding: calcWidth(6),
    borderRadius: calcWidth(4),
  },
  buttonItens: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "#18142F",
    paddingVertical: calcWidth(3.5),
  },
  submitText: {
    marginTop: calcWidth(5),
    paddingVertical: calcWidth(2.5),
    paddingHorizontal: calcWidth(12),
    color: "#46C5F3",
    textAlign: "center",
    borderRadius: 20,
    fontSize: dimensions(13),
    fontFamily: "HelveticaNowMicro-Regular",
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
      setAbout,
    },
    dispatch
  );
export default connect(mapStateToProps, mapActionToProps)(UserProfile);
