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
    const { job, vacancy } = this.props.navigation.state.params;
    status === 1
      ? this.getDeitailEmergenciesVacancies(vacancy)
      : this.getDeitailVacancy(job);

    const route = status === 0 ? "ToExplore" : "Schedule";
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

  getDeitailEmergenciesVacancies = async ({
    eventId: id,
    job: service,
    day,
  }) => {
    const {
      data: { result },
    } = await emergenciesVacancies({
      id,
      service,
      day: day.slice(0, 10),
    });
    this.setDeitails(result);
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
    const { job } = this.props.navigation.state.params;
    const { status } = this.state;
    this.setState({
      eventName: job.eventName,
      workshiftsQuantity:
        status === 0
          ? `${getDeitails.workshiftsQuantity} turnos`
          : `${job.start} - ${job.end}`,
      location: getDeitails.location,
      eventDate: job.jobDate,
      picture:
        job.picture !== null && job.picture !== undefined
          ? job.picture.url
          : job.image !== null && job.image !== undefined
          ? job.image.url
          : null,
      service: job.job,
      vacancyQuantity: getDeitails.vacancyQuantity,
      payment: getDeitails.payment,
      serviceDetail:
        status === 0 || status === 8 ? getDeitails.serviceDetail : null,
      previewResponsabilities: getDeitails.previewResponsabilities,
      responsabilities: getDeitails.responsabilities,
      checkListCheckinPreview: getDeitails.checkListCheckinPreview,
      checkListAtCheckin: getDeitails.checkListAtCheckin,
      checkListCheckoutPreview: getDeitails.checkListCheckoutPreview,
      checkListAtCheckout: getDeitails.checkListAtCheckout,
      eventDescription: getDeitails.eventDescription,
    });
  };

  selectShift = (value) => {
    this.setState({
      description: value.description,
      checkin: value.checkin,
      checkout: value.checkout,
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
      eventDate,
      picture,
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
              eventDate={eventDate}
              picture={picture}
            />
          </View>
          <View style={{ marginHorizontal: "5%" }}>
            <ShiftCard
              title={`${service}`}
              subTitle={`${vacancyQuantity} vagas`}
              value={`${payment}`}
              content={serviceDetail}
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
});

export default VacanciesDetails;
