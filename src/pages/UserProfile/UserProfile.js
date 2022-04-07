import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  updateGalleryImage,
  uploadGalleryImage,
  deleteGalleryImage,
} from "~/store/ducks/gallery/gallery.actions";
import { notifyVacancy } from "~/store/ducks/vacancies/vacancies.actions";
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
  galleryDelete,
  getAbout,
} from "~/shared/services/freela.http";
import AsyncStorage from "@react-native-community/async-storage";
import dimensions, { calcWidth, adjust } from "~/assets/Dimensions/index";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";
import SignalR from "~/shared/services/signalr";
import {
  emergenciesVacancies,
  getJobMembers,
} from "~/shared/services/events.http";
import { decodeToken } from "~/shared/services/decode";
import { AlertHelper } from "~/shared/helpers/AlertHelper";
import OneSignal from "react-native-onesignal";

class UserProfile extends Component {
  state = {
    selected: false,
    spinner: false,
    emergencyAvailability: false,
    data: [
      {
        title: "Sobre mim",
        subtitle: "Adicione a foto de perfil e suas informações pessoais.",
        onPress: () => this.navigateToScreen("AboutMe"),
      },
      {
        title: "Funções que atuo",
        subtitle: "Suas funções, habilidades e valores.",
        onPress: () => this.navigateToScreen("Profession"),
      },
      {
        title: "Empresas",
        subtitle: "Cadastre o código da empresa e receba vagas.",
        onPress: () => this.navigateToScreen("Agency"),
      },
      {
        title: "Fotos dos trabalhos",
        subtitle: "Adicionar fotos de trabalhos realizados.",
        onPress: () => this.openMidia(),
      },
      {
        title: "Certificados",
        subtitle: "Adicionar certificados das suas habilidades.",
        onPress: () => this.navigateToScreen("Certificates"),
      },
      {
        title: "Disponibilidade",
        subtitle: "Horários disponíveis para trabalhar.",
        onPress: () => this.navigateToScreen("Availability"),
      },
      {
        title: "Trabalhos realizados",
        subtitle: "Lista com os trabalhos concluídos.",
        onPress: () => this.navigateToScreen("WorkDone"),
      },
    ],
  };

  componentDidMount() {
    this.notificationOpenedHandler();
    this.getAboutMe();
  }

  notificationOpenedHandler = () => {
    OneSignal.setNotificationOpenedHandler(
      ({ notification: { additionalData } }) => {
        if (additionalData?.routeName) {
          this.props.navigation.navigate(additionalData.routeName);
        }
      }
    );
  };

  getAboutMe = () => {
    getAbout()
      .then(({ value }) => {
        this.onGetAboutSuccess(value.emergercyAvailabilityEnabled);
        this.props.aboutMe(value);
      })
      .catch((error) => {
        dispatch(aboutError(error.response.data.errorMessage));
      });
  };

  onGetAboutSuccess = (emergercyAvailabilityEnabled) => {
    SignalR.connect().then((conn) => {
      if (emergercyAvailabilityEnabled) {
        conn.invoke("AddToGroup");
        conn.on(
          SignalR.channels.RECEIVE_VACANCY,
          this.checkIfFreelaIsAlreadyVacancy
        );
      }
    });
  };

  checkIfFreelaIsAlreadyVacancy = (vacancy) => {
    if (!vacancy.eventId) return;
    getJobMembers({ eventId: vacancy.eventId, job: vacancy.job })
      .then(({ data }) => data)
      .then(async ({ result }) => {
        const { id } = decodeToken(await AsyncStorage.getItem("API_TOKEN"));
        const filter = result.some((x) => x.freelaId === id);
        if (!filter) {
          this.onReceiveVacancy(vacancy);
        }
      })
      .catch((error) => AlertHelper.show("error", "Erro", error));
  };

  onReceiveVacancy = async (vacancy) => {
    if (!vacancy.eventId) return;
    try {
      const {
        data: { result },
      } = await emergenciesVacancies({
        id: vacancy.eventId,
        service: vacancy.job,
        day: vacancy.day.split("T")[0],
      });
      this.props.notifyVacancy([result, vacancy]);
      this.props.navigation.navigate("Modal");
    } catch ({ response }) {
      AlertHelper.show("error", "Erro", response.data.errorMessage);
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
        .catch(({ response }) => {
          AlertHelper.show("error", "Erro", response.data.errorMessage);
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

      galleryDelete(token.id, queryParams).then(() => {
        this.props.deleteGalleryImage(pictures);
      });
    };

    this.props.navigation.navigate("PhotoGallery", {
      handlePictureAdd,
      handlePictureRemove,
    });
  };

  navigateToScreen = (route) => {
    this.props.navigation.navigate(route);
  };

  render() {
    const { data } = this.state;
    const {
      about: { image },
      loading,
    } = this.props;
    return (
      <View style={styles.Container}>
        <ScrollView>
          <View style={{ alignItems: "center", marginTop: calcWidth(2) }}>
            <View style={{ flexDirection: "row", position: "relative" }}>
              <ShimmerPlaceHolder
                style={[styles.avatar]}
                width={calcWidth(25)}
                height={calcWidth(25)}
                autoRun={true}
                visible={!loading}
                colorShimmer={["#ebebeb", "#c9c9c9", "#ebebeb"]}
              >
                <Image
                  source={{ uri: image }}
                  style={[styles.avatar, { borderColor: "#FFB72B" }]}
                />
              </ShimmerPlaceHolder>
              <View style={styles.IconContainer}>
                <Icon name="circle" size={calcWidth(5.5)} color="#86D7CA" />
              </View>
            </View>
            <TouchableOpacity
              onPress={() => this.navigateToScreen("ViewProfile")}
              style={[{ alignItems: "center" }]}
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
                <View style={{ width: "90%" }}>
                  <Text style={styles.titleContent}>{x.title}</Text>
                  <Text style={[styles.subtitleContent]}>{x.subtitle}</Text>
                </View>
                <Icon color={"#FFF"} name={"angle-right"} size={adjust(25)} />
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
            <Text style={styles.titleContent}>Sair do aplicativo</Text>
          </TouchableOpacity>
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
    position: "absolute",
    right: calcWidth(2),
    bottom: calcWidth(1),
  },
  titleContent: {
    color: "#FFFFFF",
    fontSize: adjust(12),
    fontFamily: "HelveticaNowMicro-Regular",
  },
  subtitleContent: {
    fontFamily: "HelveticaNowMicro-Light",
    color: "rgba(255,255,255,0.7)",
    fontSize: adjust(9),
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
    fontSize: adjust(10),
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
  const { about, loading } = state.aboutMe;
  return {
    user: state.user,
    about,
    loading,
  };
};

const mapActionToProps = (dispatch) =>
  bindActionCreators(
    {
      updateGalleryImage,
      uploadGalleryImage,
      deleteGalleryImage,
      notifyVacancy,
      aboutMe: (about) => dispatch({ type: "ABOUT_SUCCESS", about }),
    },
    dispatch
  );

export default connect(mapStateToProps, mapActionToProps)(UserProfile);
