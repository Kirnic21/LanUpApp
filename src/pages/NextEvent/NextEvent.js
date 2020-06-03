import React from "react";
import { View, ImageBackground, StatusBar, SafeAreaView } from "react-native";
import ImageBack from "~/assets/images/Grupo_518.png";
import styles from "./styles";
import ModalCheckList from "./ModalCheckList";
import { workdays } from "~/shared/services/freela.http";
import {
  operationsCheckins,
  operationsChecklists,
  incidents,
  breaks,
  openedBreaks,
  updatebreaks,
  operationsStatus,
  operationsCheckout,
  startOperation,
} from "~/shared/services/operations.http";
import TitleEvent from "./TitleEvent";
import RoundButton from "~/shared/components/RoundButton";
import SpinnerComponent from "~/shared/components/SpinnerComponent";
import { calcWidth } from "~/assets/Dimensions";
import ModalPause from "./ModalPause";
import ModalOccurrence from "./ModalOccurrence";
import ButtonPulse from "~/shared/components/ButtonPulse";
import { AlertHelper } from "~/shared/helpers/AlertHelper";
import BackgroundTimer from "react-native-background-timer";
import ModalDuties from "./ModalDuties";
import ModalComingSoon from "~/shared/components/ModalComingSoon";
import { debounce } from "lodash";

class NextEvent extends React.Component {
  state = {
    openModalCheckin: false,
    spinner: false,
    openModalPause: false,
    openModalOccurrence: false,
    openModalDuties: false,
  };

  componentDidMount() {
    const date = new Date();
    const day = date.toISOString().substr(0, 10);
    this.setState({ spinner: true });
    workdays({ day })
      .then(({ data }) => data)
      .then(({ result }) => {
        const { value } = result;
        value !== null
          ? this.getWordays(value)
          : this.setState({ status: "without" });
      })
      .finally(() => {
        this.setState({ spinner: false });
      });
  }

  getWordays = (value) => {
    this.setState({
      eventName: value.eventName,
      job: value.job,
      operationId: value.operationId,
      checkListCheckout: value.checkListCheckout,
      checkListCheckIn: value.checkListCheckIn,
      vacancyId: value.vacancyId,
      freelaId: value.freelaId,
      checkout: value.checkout,
      hirerId: value.hirerId,
      responsabilities: value.responsabilities,
      addressId: value.addressId,
      address: value.address,
    });
    operationsStatus({ id: value.operationId, freelaId: value.freelaId })
      .then(({ data }) => data)
      .then(({ result }) => {
        const { value } = result;
        this.setState({ isCheckin: value });
        this.statusOperation(value);
        this.checkoutHours();
      });
    this.backgroundHours();
    this.isPaused(value.operationId);
  };

  statusOperation = (value) => {
    const { operationId: id, eventName, addressId, address } = this.state;
    switch (value) {
      case 1:
        this.setState({ status: "checkin", isCheckin: value });
        break;
      case 2:
        this.setState({
          status: "checkin",
          openModalCheckin: true,
          origin: 1,
        });
        break;
      case 6:
        this.setState({ status: "goToWork" });
        break;
      case 7:
        this.props.navigation.replace("MapsGeolocation", {
          id,
          eventName,
          addressId,
          address,
        });
        break;
      default:
        null;
    }
  };

  backgroundHours = () => {
    const { status } = this.state;
    if (status !== "checkout") {
      BackgroundTimer.setInterval(() => {
        this.checkoutHours();
      }, 60000);
    }
  };

  openMaps = () => {
    const { operationId: id, eventName, addressId, address } = this.state;
    startOperation(id).then(() => {
      this.props.navigation.replace("MapsGeolocation", {
        id,
        eventName,
        addressId,
        address,
      });
    });
  };

  toCheckIn = () => {
    const { operationId: id, vacancyId, job } = this.state;
    operationsCheckins({ id, vacancyId, job }).then(({}) => {
      this.setState({ openModalCheckin: true, origin: 1 });
    });
    return;
  };

  // checkinTolerance = () => {
  //   const { isCheckin, checkout } = this.state;
  //   const checkoutTime = new Date().setHours(...checkout.split(":"));
  //   const isMidnight = checkout.substr(0, 1) === "0" ? 1 : 0;
  //   const date = new Date(checkoutTime).setDate(
  //     new Date(checkoutTime).getDate() + isMidnight
  //   );
  //   toleranceTime = new Date(date).setHours(new Date(date).getHours() - 2);
  //   isCheckin === 1 && new Date() >= new Date(toleranceTime)
  //     ? this.setState({ status: "without" })
  //     : this.checkoutHours();
  //   return;
  // };

  checkoutHours = () => {
    const { checkout, isCheckin } = this.state;
    const checkoutDate = new Date().setHours(...checkout.split(":"));
    const checkoutTime =
      new Date().getTime >= "12" && checkout <= "12"
        ? new Date(checkoutDate).setDate(new Date(checkoutDate).getDate() + 1)
        : new Date(checkoutDate).setDate(new Date(checkoutDate).getDate());
    new Date() < new Date(checkoutTime) && isCheckin === 3
      ? this.setState({ status: "occurrence" })
      : new Date() >= new Date(checkoutTime)
      ? this.setState({ status: "checkout", origin: 2 })
      : null;
    return;
  };

  toCheckout = () => {
    const { operationId: id, vacancyId, hirerId, eventName, job } = this.state;
    operationsCheckout({ id, vacancyId, job }).then(() => {
      this.setState({ openModalCheckin: false });
      this.props.navigation.replace("Rating", { hirerId, eventName });
    });
  };

  confirmChecklist = () => {
    const { operationId: id, origin, job } = this.state;
    this.setState({ loading: true });
    operationsChecklists({ id, origin, job })
      .then(() => {
        origin === 1
          ? this.setState({ openModalCheckin: false, status: "occurrence" })
          : this.toCheckout();
      })
      .finally(() => {
        this.setState({ loading: false });
      });
    return;
  };

  SendOcurrence = () => {
    const { operationId: id, job, image, description } = this.state;
    const request = { id, job, incidentStatus: 1, image, description };
    this.setState({ loading: true });
    incidents(request)
      .then(() => {
        this.setState({
          description: "",
          send: false,
          image: "",
          picture: "",
          openModalOccurrence: false,
        });
        AlertHelper.show(
          "success",
          "Sucesso",
          "Ocorrência enviada com sucesso."
        );
      })
      .finally(() => {
        this.setState({ loading: false });
      });
    return;
  };

  isPaused = (id) => {
    openedBreaks({ id })
      .then(({ data }) => data)
      .then(({ result }) => {
        const { value: pause } = result;
        this.setState({ pause });
      });
    return;
  };

  toPause = (reason) => {
    const { operationId: id, job } = this.state;
    this.setState({ loading: true }, () => {
      breaks({ id, reason, job })
        .then(() => {
          this.setState({ pause: true, openModalPause: false });
        })
        .catch((error) => {
          AlertHelper.show("error", "Erro", error.response.data.errorMessage);
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    });
  };

  returnPause = () => {
    const { operationId: id, job } = this.state;
    this.setState({ spinner: true }, () => {
      updatebreaks({ id, job })
        .then(() => {
          this.setState({ pause: false });
        })
        .catch((error) => {
          AlertHelper.show("error", "Erro", error.response.data.errorMessage);
        })
        .finally(() => {
          this.setState({ spinner: false });
        });
    });
  };

  buttonsOperations = () => {
    const { status, pause } = this.state;
    return {
      without: (
        <ButtonPulse
          title={`Iniciar${"\n"}Check-in`}
          titleStyle={styles.textBtnPulse}
          titleColor="#24203B"
          size="normal"
          color="#4F4D65"
        />
      ),
      goToWork: (
        <ButtonPulse
          title={`Estou${"\n"}a${"\n"}caminho`}
          titleStyle={styles.textBtnPulse}
          size="normal"
          startAnimations={true}
          color="#03DAC6"
          titleColor="#24203B"
          onPress={() => this.openMaps()}
        />
      ),
      checkin: (
        <ButtonPulse
          title={`Iniciar${"\n"}Check-in`}
          titleStyle={styles.textBtnPulse}
          size="normal"
          startAnimations={true}
          color="#46C5F3"
          onPress={() => this.toCheckIn()}
        />
      ),
      checkout: (
        <ButtonPulse
          title={`Iniciar${"\n"}Check-out`}
          titleStyle={styles.textBtnPulse}
          size="normal"
          startAnimations={pause ? false : true}
          color="#865FC0"
          onPress={() => this.setState({ openModalCheckin: true })}
        />
      ),
      occurrence: (
        <ButtonPulse
          title="Ocorrência"
          icon="alert-circle"
          size="normal"
          color="#FFB72B"
          startAnimations={pause ? false : true}
          onPress={() => this.setState({ openModalOccurrence: true })}
        />
      ),
    }[status];
  };

  render() {
    const {
      openModalCheckin,
      openModalOccurrence,
      openModalDuties,
      eventName,
      job,
      checked,
      status,
      spinner,
      send,
      description,
      pause,
      openModalPause,
      responsabilities,
      picture,
      loading,
      checkListCheckIn,
      checkListCheckout,
      openModalComingSoon,
    } = this.state;
    return (
      <ImageBackground source={ImageBack} style={{ flex: 1 }}>
        <SpinnerComponent loading={spinner} />
        <SafeAreaView style={styles.container}>
          <StatusBar backgroundColor="transparent" translucent={true} />
          <TitleEvent status={status} job={job} eventName={eventName} />
          <View style={styles.containerCircle}>
            <View
              pointerEvents={pause ? "none" : "auto"}
              style={styles.borderCircle}
            >
              {this.buttonsOperations()}
            </View>
            {status === "checkout" || status === "occurrence" ? (
              <View style={{ alignItems: "center", top: calcWidth(-26) }}>
                <View style={styles.containerGroupButton}>
                  <ButtonPulse
                    icon="assistant"
                    title="Deveres"
                    size="small"
                    color="#46C5F3"
                    onPress={() => this.setState({ openModalDuties: true })}
                  />
                  {status === "checkout" ? (
                    <View
                      pointerEvents={pause ? "none" : "auto"}
                      style={{ top: calcWidth(12) }}
                    >
                      <ButtonPulse
                        title="Ocorrência"
                        icon="alert-circle"
                        size="small"
                        startAnimations={pause ? false : true}
                        onPress={() =>
                          this.setState({ openModalOccurrence: true })
                        }
                        color="#FFB72B"
                      />
                    </View>
                  ) : (
                    <></>
                  )}
                  <ButtonPulse
                    size="small"
                    disabled={spinner}
                    icon={pause ? "play" : "pause"}
                    title={pause ? "voltar" : "Pausa"}
                    startAnimations={pause ? true : false}
                    color={pause ? "#03DAC6" : "#F13567"}
                    onPress={debounce(() => {
                      pause
                        ? this.returnPause()
                        : this.setState({ openModalPause: true });
                    }, 500)}
                  />
                </View>
              </View>
            ) : (
              <></>
            )}
          </View>
          <View style={styles.containerBtn}>
            {status === "without" ? (
              <RoundButton
                width={calcWidth(55)}
                name="Encontrar mais vagas"
                style={styles.btn}
                onPress={() => this.props.navigation.navigate("ToExplore")}
              />
            ) : status === "goToWork" ? (
              <RoundButton
                width={calcWidth(55)}
                name="Ver regras e check list"
                style={styles.btn}
                onPress={() => this.setState({ openModalComingSoon: true })}
              />
            ) : (
              <RoundButton
                width={calcWidth(55)}
                name="Minhas Atividades"
                style={styles.btn}
                onPress={() => this.setState({ openModalComingSoon: true })}
              />
            )}
          </View>
          <ModalCheckList
            visible={openModalCheckin}
            loading={loading}
            titleCheck={status === "checkout" ? "Check-out" : "Check-in"}
            job={job}
            checkList={
              status === "checkin" ? checkListCheckIn : checkListCheckout
            }
            pressConfirm={() => this.confirmChecklist()}
            onPressCheck={() => this.setState({ checked: !checked })}
            checked={checked}
            eventName={eventName}
            onClose={() => {
              this.setState({ openModalCheckin: false });
            }}
          />
          <ModalOccurrence
            visible={openModalOccurrence}
            picture={picture}
            loading={loading}
            sendOcurrence={send}
            onPressSend={() => this.SendOcurrence()}
            onImageSelected={(image) =>
              this.setState({ image: image.data, picture: image.uri })
            }
            valueInput={description}
            onChangeText={(text) =>
              this.setState({
                description: text,
                send: text !== "" ? true : false,
              })
            }
            onClose={() =>
              this.setState({
                openModalOccurrence: false,
                image: "",
                picture: "",
              })
            }
          />
          <ModalPause
            visible={openModalPause}
            onPress={debounce((reason) => {
              this.toPause(reason);
            }, 500)}
            loading={loading}
            onClose={() => this.setState({ openModalPause: false })}
          />
          <ModalDuties
            visible={openModalDuties}
            responsabilities={responsabilities}
            onClose={() => this.setState({ openModalDuties: false })}
          />
          <ModalComingSoon
            onClose={() => this.setState({ openModalComingSoon: false })}
            visible={openModalComingSoon}
          />
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

export default NextEvent;
