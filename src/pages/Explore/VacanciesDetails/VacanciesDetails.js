import React, { Component } from "react";
import { View, StatusBar, StyleSheet, ScrollView } from "react-native";
import CardImageVacancies from "./CardImageVacancies";
import { SafeAreaView } from "react-native";
import CardDeitailsVacancies from "./CardDeitailsVacancies";
import dimensions, { calcWidth } from "~/assets/Dimensions";
import ShiftCard from "./ShiftCard";
import SelectComponent from "~/shared/components/SelectComponent";
import ButtonVacancies from "~/shared/components/Button";
import { deitailsVacancies } from "~/shared/services/events.http";
import { acceptInvite, deleteVacancies } from "~/shared/services/vacancy.http";
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
    status: this.props.navigation.state.params.status
  };

  componentDidMount() {
    const { job } = this.props.navigation.state.params;
    const { status } = this.state;
    const route = status === 2 ? "ToExplore" : "Schedule";
    const request = {
      id: status === 2 ? job.id : job.eventId,
      service: job.job,
      day: job.jobDate.substr(0, 10)
    };
    this.setState({ spinner: true });
    deitailsVacancies(request)
      .then(({ data }) => {
        const getDeitails = data.result;
        this.setState({
          eventName: job.eventName,
          workshiftsQuantity:
            status === 2
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
          serviceDetail: status === 2 ? getDeitails.serviceDetail : null,
          previewResponsabilities: getDeitails.previewResponsabilities,
          responsabilities: getDeitails.responsabilities,
          checkListCheckinPreview: getDeitails.checkListCheckinPreview,
          checkListAtCheckin: getDeitails.checkListAtCheckin,
          checkListCheckoutPreview: getDeitails.checkListCheckoutPreview,
          checkListAtCheckout: getDeitails.checkListAtCheckout,
          eventDescription: getDeitails.eventDescription
        });
      })
      .finally(() => {
        this.setState({ spinner: false });
      });
    this.props.navigation.setParams({
      route
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
            borderRadius: calcWidth(4)
          }}
        />
      )
    };
  };

  selectShift = value => {
    this.setState({
      description: value.description,
      checkin: value.checkin,
      checkout: value.checkout
    });
  };

  invite = async () => {
    const { job } = this.props.navigation.state.params;
    const { checkin, checkout } = this.state;
    const token = decodeToken(await AsyncStorage.getItem("API_TOKEN"));
    this.setState({ spinner: true });
    const request = {
      freelaId: token.id,
      eventId: job.id,
      day: job.jobDate,
      checkout: checkout,
      checkin: checkin,
      jobToDo: job.job
    };
    if (checkin === undefined) {
      AlertHelper.show("error", "Erro", "Selecione um turno.");
      this.setState({ spinner: false });
    } else {
      acceptInvite(request)
        .then(() => {
          this.props.navigation.navigate("Schedule");
        })
        .catch(error => {
          AlertHelper.show("error", "Erro", error.response.data.errorMessage);
        })
        .finally(() => {
          this.setState({ spinner: false });
        });
    }
  };

  deleteVacancy = () => {
    const { job } = this.props.navigation.state.params;
    this.setState({ spinner: true });
    const request = {
      id: job.id,
      checkin: job.start,
      checkout: job.end
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
  };

  statusVacancy = () => {
    const { status, checkin } = this.state;
    return {
      2: (
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
      6: (
        <ButtonVacancies
          name="Desitir da vaga"
          onPress={() => {
            this.deleteVacancy();
          }}
        />
      )
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
      status
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
            />
            <CardDeitailsVacancies
              title="Briefing"
              TitleStyle={{ color: "#FFF", fontSize: dimensions(20) }}
              contentTextStyle={{ color: "#FFF" }}
              isModalOn={false}
            >
              <HTML
                baseFontStyle={{ color: "#FFF" }}
                html={`<Div>${eventDescription}</Div>`}
              />
            </CardDeitailsVacancies>
            <View>
              <CardDeitailsVacancies
                title="Minhas Responsabilidades"
                TitleStyle={{ color: "#FFF", fontSize: dimensions(20) }}
                contentTextStyle={{ color: "#FFF" }}
                isModalOn={true}
                previewContent={previewResponsabilities}
                content={responsabilities}
              />
              <CardDeitailsVacancies
                title="Check In"
                TitleStyle={{ color: "#FFF", fontSize: dimensions(20) }}
                contentTextStyle={{ color: "#FFF" }}
                isModalOn={true}
                previewContent={checkListCheckinPreview}
                content={checkListAtCheckin}
              />
              <CardDeitailsVacancies
                title="Check Out"
                TitleStyle={{ color: "#FFF", fontSize: dimensions(20) }}
                contentTextStyle={{ color: "#FFF" }}
                isModalOn={true}
                previewContent={checkListCheckoutPreview}
                content={checkListAtCheckout}
              />
            </View>
          </View>
          <View style={{ marginHorizontal: "5%", paddingVertical: "5%" }}>
            {status === 2 ? (
              <SelectComponent
                label="Turnos"
                onSelect={(id, value) => {
                  this.selectShift(value);
                }}
                options={serviceDetail}
                value={description}
              />
            ) : (
              <></>
            )}
          </View>
          <View
            style={{
              marginHorizontal: calcWidth(25),
              paddingBottom: calcWidth(6)
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
    flexDirection: "column"
  }
});

export default VacanciesDetails;
