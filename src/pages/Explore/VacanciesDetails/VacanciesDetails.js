import React, { Component } from "react";
import { View, StatusBar, StyleSheet, ScrollView, Text } from "react-native";
import CardImageVacancies from "./CardImageVacancies";
import { SafeAreaView } from "react-native";
import CardDeitailsVacancies from "./CardDeitailsVacancies";
import dimensions, { calcWidth } from "~/assets/Dimensions";
import ShiftCard from "./ShiftCard";
import SelectComponent from "~/shared/components/SelectComponent";
import ButtonVacancies from "~/shared/components/Button";
import { deitailsVacancies } from "~/shared/services/events.http";
import {
  acceptInvite,
  deleteVacancies,
  deitailsVacanciesSchedules,
  acceptInvitations,
  vacanciesEmergencyAccept,
} from "~/shared/services/vacancy.http";
import { decodeToken } from "~/shared/services/freela.http";
import AsyncStorage from "@react-native-community/async-storage";
import HTML from "react-native-render-html";
import SpinnerComponent from "~/shared/components/SpinnerComponent";
import { AlertHelper } from "~/shared/helpers/AlertHelper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ButtonComponent from "~/shared/components/ButtonCompoent";

class VacanciesDetails extends Component {
  state = {
    spinner: false,
    status: this.props.navigation.state.params.status,
  };

  componentDidMount() {
    const { status } = this.state;
    const { job, getDeitails } = this.props.navigation.state.params;
    status === 1 ? this.setDeitails(getDeitails) : this.getDeitailVacancy(job);

    const route =
      status === 0 ? "ToExplore" : status === 1 ? "UserProfile" : "Schedule";
    this.props.navigation.setParams({
      route,
    });
  }

  static navigationOptions = ({ navigation }) => {
    const { route } = navigation.state.params;
    return {
      headerLeft: () => (
        <Icon
          name={"arrow-left"}
          size={calcWidth(6.5)}
          color="#FFFFFF"
          onPress={() => navigation.navigate(route)}
          style={{
            backgroundColor: "#00000060",
            left: calcWidth(4),
            borderRadius: calcWidth(4),
          }}
        />
      ),
    };
  };

  getDeitailVacancy = ({ id, job: service, jobDate, serviceId }) => {
    const { status } = this.state;
    this.setState({ spinner: true }, async () => {
      try {
        const {
          data: { result },
        } =
          status === 0
            ? await deitailsVacancies({
                id,
                service,
                day: jobDate.substr(0, 10),
              })
            : await deitailsVacanciesSchedules({
                id,
                serviceId,
                day: jobDate.substr(0, 10),
              });
        this.setDeitails(result);
      } catch (error) {
        AlertHelper.show("error", "Erro", error.response.data.errorMessage);
      } finally {
        this.setState({ spinner: false });
      }
    });
    return;
  };

  setDeitails = (getDeitails) => {
    const { status } = this.state;
    const {
      state: {
        params: {
          job: { eventName, jobDate, start, end, job: service, day },
        },
      },
    } = this.props.navigation;
    this.setState({
      eventName,
      workshiftsQuantity:
        status === 0 || status === 8
          ? `${getDeitails.workshiftsQuantity}turnos`
          : `${start} - ${end}`,
      location: getDeitails.location,
      jobDate: jobDate || day,
      image: getDeitails.image,
      service,
      payment: getDeitails.payment,
      vacancyQuantity: getDeitails.vacancyQuantity,
      serviceDetail: getDeitails.serviceDetail,
      eventDescription: getDeitails.eventDescription,
      previewResponsabilities: getDeitails.previewResponsabilities,
      responsabilities: getDeitails.responsabilities,
      checkListAtCheckin: getDeitails.checkListAtCheckin,
      checkListCheckinPreview: getDeitails.checkListCheckinPreview,
      checkListCheckoutPreview: getDeitails.checkListCheckoutPreview,
      checkListAtCheckout: getDeitails.checkListAtCheckout,
    });
  };

  selectShift = (value) => {
    this.setState({
      description: value.description,
      checkin: value.checkin,
      checkout: value.checkout,
    });
  };

  emergencyVacancyAccepted = () => {
    const {
      job: { eventId, job: jobToDo, start: checkin, end: checkout, day },
    } = this.props.navigation.state.params;
    this.setState({ spinner: true }, () => {
      vacanciesEmergencyAccept({
        eventId,
        jobToDo,
        checkout,
        checkin,
        day,
      })
        .then(() => {
          this.props.navigation.navigate("NextEvent");
        })
        .catch((error) => {
          console.log(error.response.data.errorMessage);
          AlertHelper.show("error", "Erro", error.response.data.errorMessage);
        })
        .finally(() => {
          this.setState({ spinner: false });
        });
    });
  };

  invite = async () => {
    const { checkin, checkout } = this.state;
    const { id: freelaId } = decodeToken(
      await AsyncStorage.getItem("API_TOKEN")
    );
    const {
      navigation: {
        state: {
          params: {
            job: { id: eventId, jobDate: day, job: jobToDo, serviceId },
          },
        },
      },
    } = this.props;
    const request = {
      freelaId,
      eventId,
      day,
      checkout,
      checkin,
      jobToDo,
      serviceId,
    };
    this.setState({ spinner: true }, () => {
      acceptInvite(request)
        .then(() => {
          this.props.navigation.navigate("Schedule");
        })
        .catch((error) => {
          AlertHelper.show("error", "Erro", error.response.data.errorMessage);
        })
        .finally(() => {
          this.setState({ spinner: false });
        });
    });
    return;
  };

  acceptVacancyInvite = () => {
    const {
      job: { id: vacancyId },
    } = this.props.navigation.state.params;
    this.setState({ spinner: true }, () => {
      acceptInvitations(vacancyId)
        .then(() => {
          this.props.navigation.replace("Schedule");
        })
        .catch((error) => {
          AlertHelper.show("error", "Erro", error.response.data.errorMessage);
        })
        .finally(() => {
          this.setState({ spinner: false });
        });
    });
    return;
  };

  deleteVacancy = () => {
    const { job } = this.props.navigation.state.params;
    this.setState({ spinner: true });
    const request = {
      id: job.id,
      checkin: job.start,
      checkout: job.end,
    };
    deleteVacancies(request)
      .then(() => {
        this.props.navigation.replace("Schedule");
      })
      .catch(() => {
        AlertHelper.show(
          "error",
          "Erro",
          "Você não pode desistir de uma vaga em operação."
        );
      })
      .finally(() => {
        this.setState({ spinner: false });
      });
    return;
  };

  statusVacancy = () => {
    const { status, checkin } = this.state;
    return {
      0: (
        <ButtonComponent
          title="Aceitar"
          isSelected={!!checkin}
          onPress={() => {
            this.invite();
          }}
          unSelectedColor="#A893F229"
          selectedColor="#865FC0"
        />
      ),
      1: (
        <ButtonComponent
          title="Estou a caminho"
          isSelected={true}
          selectedColor="#EB4886"
          onPress={() => this.emergencyVacancyAccepted()}
        />
      ),
      2: (
        <ButtonVacancies
          name="Desitir da vaga"
          onPress={() => {
            this.deleteVacancy();
          }}
        />
      ),
      3: (
        <ButtonVacancies
          name="Desitir da vaga"
          onPress={() => {
            this.deleteVacancy();
          }}
        />
      ),
      8: (
        <ButtonComponent
          title="Aceitar"
          isSelected={true}
          onPress={() => {
            this.acceptVacancyInvite();
          }}
          selectedColor="#865FC0"
        />
      ),
    }[status];
  };

  render() {
    const {
      eventName,
      workshiftsQuantity,
      location,
      jobDate,
      image,
      service,
      vacancyQuantity,
      payment,
      serviceDetail,
      previewResponsabilities,
      responsabilities,
      checkListCheckinPreview,
      checkListAtCheckin,
      checkListCheckoutPreview,
      checkListAtCheckout,
      description,
      eventDescription,
      spinner,
      status,
    } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          backgroundColor="#00000060"
          translucent={true}
          barStyle="light-content"
        />

        <SpinnerComponent loading={spinner} />
        <ScrollView style={{ flex: 1 }}>
          <View>
            <CardImageVacancies
              title={`${eventName}`}
              shift={`${workshiftsQuantity}`}
              location={`${location}`}
              eventDate={jobDate}
              picture={image}
            />
          </View>
          <View style={{ marginHorizontal: "5%" }}>
            <ShiftCard
              title={`${service}`}
              subTitle={
                status === 1 ? (
                  <Text style={styles.textVacancy}>vaga urgente</Text>
                ) : (
                  `${vacancyQuantity} vagas`
                )
              }
              value={`${payment}`}
              content={status === 0 || status === 8 ? serviceDetail : null}
              status={status === 5}
            />
            <CardDeitailsVacancies
              title="Briefing"
              contentTextStyle={styles.colorWhite}
              isModalOn={false}
            >
              <HTML
                baseFontStyle={styles.colorWhite}
                html={`<Div>${eventDescription}</Div>`}
              />
            </CardDeitailsVacancies>
            <View>
              <CardDeitailsVacancies
                title="Minhas Responsabilidades"
                contentTextStyle={styles.colorWhite}
                isModalOn={true}
                previewContent={previewResponsabilities}
                content={responsabilities}
              />
              {status === 5 ? (
                <CardDeitailsVacancies
                  title="Benefícios"
                  contentTextStyle={styles.colorWhite}
                  isModalOn={false}
                >
                  <Text
                    style={[
                      styles.colorWhite,
                      {
                        fontSize: dimensions(12),
                        fontFamily: "HelveticaNowMicro-Regular",
                      },
                    ]}
                  >
                    (VR 40,00 c/ desconto de 20% +VT + AM s/ desconto e não
                    extensiva)
                  </Text>
                </CardDeitailsVacancies>
              ) : (
                <View>
                  <CardDeitailsVacancies
                    title="Check In"
                    contentTextStyle={styles.colorWhite}
                    isModalOn={true}
                    previewContent={checkListCheckinPreview}
                    content={checkListAtCheckin}
                  />
                  <CardDeitailsVacancies
                    title="Check Out"
                    contentTextStyle={styles.colorWhite}
                    isModalOn={true}
                    previewContent={checkListCheckoutPreview}
                    content={checkListAtCheckout}
                  />
                </View>
              )}
            </View>
          </View>
          <View style={{ marginHorizontal: "5%", paddingVertical: "5%" }}>
            {status === 0 && (
              <SelectComponent
                label="Turnos"
                onSelect={(id, value) => {
                  this.selectShift(value);
                }}
                options={serviceDetail}
                value={description}
              />
            )}
          </View>
          <View
            style={{
              marginHorizontal: calcWidth(25),
              paddingBottom: calcWidth(6),
            }}
          >
            {this.statusVacancy()}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#18142F",
    flexDirection: "column",
  },
  colorWhite: {
    color: "#FFFFFF",
  },
  textVacancy: {
    color: "#EB4886",
    fontFamily: "HelveticaNowMicro-Regular",
    fontSize: dimensions(20),
  },
});

export default VacanciesDetails;
