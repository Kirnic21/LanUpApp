import React, { Component } from "react";
import { View, StatusBar, StyleSheet, ScrollView } from "react-native";
import CardImageVacancies from "./CardImageVacancies";
import { SafeAreaView } from "react-native";
import CardDeitailsVacancies from "./CardDeitailsVacancies";
import dimensions from "~/assets/Dimensions";
import ShiftCard from "./ShiftCard";
import SelectComponent from "~/shared/components/SelectComponent";
import ButtonVacancies from "./ButtonVacancies";
import { deitailsVacancies } from "~/shared/services/events.http";
import { acceptInvite, deleteVacancies } from "~/shared/services/vacancy.http";
import { decodeToken } from "~/shared/services/freela.http";
import AsyncStorage from "@react-native-community/async-storage";
import HTML from "react-native-render-html";
import SpinnerComponent from "~/shared/components/SpinnerComponent";
import DropdownAlert from "react-native-dropdownalert";
import { HeaderBackButton } from "react-navigation";

class VacanciesDetails extends Component {
  state = {
    spinner: true,
    description: "",
    eventDescription: "",
    serviceDetail: [],
    previewResponsabilities: [],
    responsabilities: [],
    checkListPreview: [],
    checkListCheckinPreview: [],
    checkListAtCheckin: [],
    checkListCheckoutPreview: [],
    checkListAtCheckout: [],
    status: this.props.navigation.state.params.status
  };

  componentDidMount() {
    const { job } = this.props.navigation.state.params;
    debugger;
    const { status } = this.state;
    const route = status === 2 ? "ToExplore" : "Schedule";
    const request = {
      id: status === 2 ? job.id : job.eventId,
      service: job.job,
      day: job.jobDate.substr(0, 10)
    };

    deitailsVacancies(request).then(({ data }) => {
      const getDeitails = data.result;
      this.setState({
        eventName: job.eventName,
        workshiftsQuantity:
          status === 2
            ? `${getDeitails.workshiftsQuantity} turnos`
            : `${job.start} - ${job.end}`,
        location: getDeitails.location,
        eventDate: job.jobDate.substr(0, 10),
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
        eventDescription: getDeitails.eventDescription,
        spinner: false
      });
    });
    this.props.navigation.setParams({
      route
    });
  }
  static navigationOptions = ({ navigation }) => {
    const { route } = navigation.state.params;
    return {
      headerLeft: (
        <HeaderBackButton
          tintColor="#FFf"
          onPress={() => navigation.navigate(route)}
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

  timeSpinner = () => {
    setTimeout(() => {
      this.setState({ spinner: false });
      this.props.navigation.push("Schedule");
    }, 1000);
  };

  invite = async () => {
    const { job } = this.props.navigation.state.params;
    const { checkin, checkout } = this.state;
    const token = decodeToken(await AsyncStorage.getItem("API_TOKEN"));
    request = {
      freelaId: token.id,
      eventId: job.id,
      day: job.jobDate,
      checkout: checkout,
      checkin: checkin,
      jobToDo: job.job
    };
    checkin === undefined
      ? this.dropDownAlertRef.alertWithType(
          "error",
          "Erro",
          "Selecione um turno."
        )
      : acceptInvite(request)
          .then(({ data }) => {
            this.setState({ spinner: true });
            this.timeSpinner();
          })
          .catch(error => {
            this.dropDownAlertRef.alertWithType(
              "error",
              "Erro",
              error.response.data
            );
          });
  };

  deleteVacancy = () => {
    const { job } = this.props.navigation.state.params;
    request = {
      id: job.id,
      checkin: job.start,
      checkout: job.end
    };
    deleteVacancies(request)
      .then(({ data }) => {
        this.setState({ spinner: true });
        this.timeSpinner();
      })
      .catch(error => {
        error.response.data;
      });
  };

  statusVacancy = () => {
    const { status } = this.state;
    return {
      2: (
        <ButtonVacancies
          name="Aceitar"
          style={{ backgroundColor: "#865FC0", borderWidth: 0 }}
          onPress={() => {
            this.invite();
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
        <StatusBar backgroundColor="#00000050" translucent={true} />
        <View
          style={{
            width: "100%",
            alignItems: "center",
            position: "relative"
          }}
        >
          <DropdownAlert
            ref={ref => (this.dropDownAlertRef = ref)}
            closeInterval={500}
          />
        </View>
        <SpinnerComponent loading={spinner} />
        <ScrollView style={{ flex: 1 }}>
          <View>
            <CardImageVacancies
              title={`${eventName}`}
              shift={`${workshiftsQuantity}`}
              location={`${location}`}
              eventDate={`${eventDate}`}
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
              title="Detalhes do Evento"
              TitleStyle={{ color: "#FFF", fontSize: dimensions(20) }}
              contentTextStyle={{ color: "#FFF" }}
              isModalOn={false}
              previewContent={[]}
              content={[]}
            >
              <HTML
                baseFontStyle={{ color: "#FFF" }}
                html={`<Div>${eventDescription}</Div>`}
              />
            </CardDeitailsVacancies>
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
          <View style={{ marginHorizontal: "5%", paddingVertical: "5%" }}>
            {status === 3 ? (
              <></>
            ) : (
              <SelectComponent
                label="Turnos"
                onSelect={(id, value) => {
                  this.selectShift(value);
                }}
                options={serviceDetail}
                value={description}
              />
            )}
            <View>{this.statusVacancy()}</View>
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
