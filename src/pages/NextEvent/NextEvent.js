import React from "react";
import {
  View,
  ImageBackground,
  StatusBar,
  SafeAreaView,
  NativeModules,
} from "react-native";
import BackgroundTimer from "react-native-background-timer";
import RNAndroidLocationEnabler from "react-native-android-location-enabler";
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
  checkpoints,
} from "~/shared/services/operations.http";
import TitleEvent from "./TitleEvent";
import RoundButton from "~/shared/components/RoundButton";
import SpinnerComponent from "~/shared/components/SpinnerComponent";
import { calcWidth } from "~/assets/Dimensions";
import ModalPause from "./ModalPause";
import ModalOccurrence from "./ModalOccurrence";
import ButtonPulse from "~/shared/components/ButtonPulse";
import { AlertHelper } from "~/shared/helpers/AlertHelper";
import ModalDuties from "./ModalDuties";
import ModalComingSoon from "~/shared/components/ModalComingSoon";
import { differenceInHours, isBefore, parseISO } from "date-fns";
import Geolocation from "react-native-geolocation-service";

class NextEvent extends React.Component {
  state = {
    openModalCheckin: false,
    spinner: false,
    openModalPause: false,
    openModalOccurrence: false,
    openModalDuties: false,
  };

  componentDidMount() {
    const dayx = new Date();
    const month = dayx.getMonth() + 1;
    const day = `${dayx.getFullYear()}-${
      month < 10 ? `0${month}` : month
    }-${dayx.getDate()}`;
    this.setState({ spinner: true });
    workdays({ day })
      .then(({ data }) => data)
      .then(({ result }) => {
        const { value } = result;
        value !== null
          ? this.getWordays(value)
          : this.setState({ status: "without" });
      })
      .catch((error) =>
        AlertHelper.show("error", "Erro", error.response.data.errorMessage)
      )
      .finally(() => {
        this.setState({ spinner: false });
      });
  }

  getWordays = async (value) => {
    this.setState({
      eventName: value.eventName,
      job: value.job,
      operationId: value.operationId,
      checkListCheckout: value.checkListCheckout,
      checkListCheckIn: value.checkListCheckIn,
      vacancyId: value.vacancyId,
      freelaId: value.freelaId,
      checkin: value.checkin,
      checkout: value.checkout,
      hirerId: value.hirerId,
      responsabilities: value.responsabilities,
      addressId: value.addressId,
      address: value.address,
      date: value.date,
    });
    operationsStatus({
      id: value.operationId,
      freelaId: value.freelaId,
    })
      .then(({ data }) => data)
      .then(async ({ result }) => {
        const { value } = result;
        this.setState({ isCheckin: value });
        this.statusOperation(value);
        await this.checkoutHours();
      })
      .catch((error) =>
        AlertHelper.show("error", "Erro", error.response.data.errorMessage)
      );
    await this.backgroundHours();
    this.isPaused(value.operationId);
  };

  statusOperation = (value) => {
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
      case 4:
        this.setState({
          status: "checkout",
          origin: 2,
        });
        break;
      case 6:
        this.setState({ status: "goToWork" });
        break;
      case 7:
        this.openMaps();
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

  openMaps = async () => {
    const {
      operationId: id,
      eventName,
      addressId,
      address,
      isCheckin,
    } = this.state;
    try {
      await RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
        interval: 10000,
        fastInterval: 5000,
      });

      isCheckin === 6 && (await startOperation(id));

      NativeModules.ForegroundModule.startForegroundService();

      this.props.navigation.replace("MapsGeolocation", {
        id,
        eventName,
        addressId,
        address,
      });
    } catch (error) {
      error.message === "denied"
        ? AlertHelper.show(
            "error",
            "Erro",
            "Ative sua localização para continuar!."
          )
        : AlertHelper.show("error", "Erro", error.message);
    }
  };

  getLocationFreela = () => {
    const { operationId: id } = this.state;
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
      interval: 10000,
      fastInterval: 5000,
    })
      .then(() => {
        Geolocation.getCurrentPosition(
          ({ coords: { latitude, longitude } }) => {
            checkpoints({ id, lat: latitude, long: longitude }).catch((error) =>
              AlertHelper.show("error", "Erro", error.message)
            );
          }
        );
      })
      .catch(() => {
        AlertHelper.show(
          "error",
          "Erro",
          "Ative sua localização para continuar!."
        );
      });
  };

  toCheckIn = () => {
    const { operationId: id, vacancyId, job } = this.state;
    operationsCheckins({ id, vacancyId, job })
      .then(({}) => {
        this.getLocationFreela();
        this.setState({ openModalCheckin: true, origin: 1 });
      })
      .catch((error) =>
        AlertHelper.show("error", "Erro", error.response.data.errorMessage)
      );
  };

  checkoutHours = () => {
    const { checkout, isCheckin } = this.state;
    const checkoutParse = parseISO(checkout);
    const dateStatus = isBefore(new Date(), checkoutParse);
    if (isCheckin === 3) {
      this.setState({
        origin: 2,
        status: dateStatus ? "occurrence" : "checkout",
        isLate: differenceInHours(new Date(), parseISO(checkout)),
      });
    }
  };

  toCheckout = () => {
    const { operationId: id, vacancyId, hirerId, eventName, job } = this.state;
    this.setState({ openModalCheckin: false }, () => {
      operationsCheckout({ id, vacancyId, job })
        .then(async () => {
          this.getLocationFreela();
          await this.props.navigation.replace("Rating", { hirerId, eventName });
        })
        .catch((error) =>
          AlertHelper.show("error", "Erro", error.response.data.errorMessage)
        );
    });
  };

  confirmChecklist = () => {
    const { operationId: id, origin, job, checkout } = this.state;
    this.setState({ loading: true });
    operationsChecklists({ id, origin, job })
      .then(() => {
        origin === 1
          ? this.setState({
              openModalCheckin: false,
              status: isBefore(new Date(), parseISO(checkout))
                ? "occurrence"
                : "checkout",
              origin: 2,
              isCheckin: 3,
              checked: false,
            })
          : this.toCheckout();
      })
      .catch((error) =>
        AlertHelper.show("error", "Erro", error.response.data.errorMessage)
      )
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  SendOcurrence = () => {
    const { operationId: id, job, image, description } = this.state;
    const request = {
      id,
      job,
      incidentStatus: 1,
      image,
      description,
    };
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
      .catch((error) =>
        AlertHelper.show("error", "Erro", error.response.data.errorMessage)
      )
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  isPaused = (id) => {
    openedBreaks({ id })
      .then(({ data }) => data)
      .then(({ result }) => {
        const { value: pause } = result;
        this.setState({ pause });
      })
      .catch((error) =>
        AlertHelper.show("error", "Erro", error.response.data.errorMessage)
      );
  };

  toPause = (reason) => {
    const { operationId: id, job } = this.state;
    this.setState({ loading: true, openModalPause: false }, () => {
      breaks({ id, reason, job })
        .then(() => {
          this.setState({ pause: true });
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
    const { status, pause, isLate } = this.state;
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
          startAnimations
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
          startAnimations
          color="#46C5F3"
          onPress={() => this.toCheckIn()}
        />
      ),
      checkout: (
        <ButtonPulse
          title={`Iniciar${"\n"}Check-out`}
          titleStyle={styles.textBtnPulse}
          size="normal"
          startAnimations={!pause}
          color={isLate ? "#FF0000" : "#865FC0"}
          onPress={() => this.setState({ openModalCheckin: true })}
        />
      ),
      occurrence: (
        <ButtonPulse
          title="Ocorrência"
          icon="error"
          size="normal"
          color="#FFB72B"
          startAnimations={!pause}
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
      date,
      origin,
    } = this.state;
    return (
      <ImageBackground source={ImageBack} style={{ flex: 1 }}>
        <SpinnerComponent loading={spinner} />
        <SafeAreaView style={styles.container}>
          <StatusBar backgroundColor="transparent" translucent />
          <TitleEvent
            status={status}
            job={job}
            eventName={eventName}
            date={date}
          />
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
                  <View
                    pointerEvents={pause ? "none" : "auto"}
                    style={{ top: calcWidth(12) }}
                  >
                    {status === "checkout" ? (
                      <ButtonPulse
                        title="Ocorrência"
                        icon="error"
                        size="small"
                        startAnimations={!pause}
                        onPress={() =>
                          this.setState({ openModalOccurrence: true })
                        }
                        color="#FFB72B"
                      />
                    ) : (
                      <ButtonPulse
                        title={`Iniciar${"\n"}Check-out`}
                        titleStyle={[
                          styles.textBtnPulse,
                          { lineHeight: calcWidth(5) },
                        ]}
                        size="small"
                        startAnimations={!pause}
                        onPress={() =>
                          this.setState({ openModalCheckin: true, origin: 2 })
                        }
                        color="#865FC0"
                      />
                    )}
                  </View>

                  <ButtonPulse
                    size="small"
                    disabled={spinner}
                    icon={pause ? "play-arrow" : "pause"}
                    title={pause ? "voltar" : "Pausa"}
                    startAnimations={!!pause}
                    color={pause ? "#03DAC6" : "#F13567"}
                    onPress={() =>
                      pause
                        ? this.returnPause()
                        : this.setState({ openModalPause: true })
                    }
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
            titleCheck={origin === 2 ? "Check-out" : "Check-in"}
            job={job}
            checkList={origin === 1 ? checkListCheckIn : checkListCheckout}
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
                send: text !== "",
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
            onPress={(reason) => this.toPause(reason)}
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
