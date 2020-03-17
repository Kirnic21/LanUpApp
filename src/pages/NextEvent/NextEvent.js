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
  operationsCheckout
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

class NextEvent extends React.Component {
  state = {
    openModalCheckin: false,
    spinner: false,
    openModalPause: false,
    openModalOccurrence: false,
    openModalDuties: false
  };

  componentDidMount() {
    const date = new Date();
    const day = date.toISOString().substr(0, 10);
    this.setState({ spinner: true });
    workdays({ day })
      .then(({ data }) => data)
      .then(({ result }) => {
        const { value } = result;
        debugger;
        value !== null
          ? this.getWordays(value)
          : this.setState({ status: "without" });
      })
      .finally(() => {
        this.setState({ spinner: false });
      });
  }

  getWordays = value => {
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
      responsabilities: value.responsabilities
    });
    this.checkoutHours();
    BackgroundTimer.setInterval(() => {
      this.checkoutHours();
    }, 60000);
    operationsStatus({ id: value.operationId, freelaId: value.freelaId })
      .then(({ data }) => data)
      .then(({ result }) => {
        const { value } = result;
        value === 1
          ? this.setState({ status: "checkin" })
          : value === 2
          ? this.setState({
              status: "checkin",
              openModalCheckin: true,
              origin: 1
            })
          : null;
      });
    this.isPaused(value.operationId);
  };

  toCheckIn = () => {
    const { operationId: id, vacancyId } = this.state;
    debugger;
    operationsCheckins({ id, vacancyId }).then(({}) => {
      this.setState({ openModalCheckin: true });
    });
    return;
  };

  checkoutHours = () => {
    const { checkout } = this.state;
    const date = new Date();
    const checkoutDate = new Date(date.setHours(...checkout.split(":")));

    const checkoutTime =
      checkout.substr(0, 2) === "00"
        ? checkoutDate.setDate(checkoutDate.getDate() + 1)
        : checkoutDate.setDate(checkoutDate.getDate());
    new Date() >= checkoutTime
      ? this.setState({ status: "checkout", origin: 2 })
      : this.setState({ status: "occurrence" });
    return;
  };

  toCheckout = () => {
    const { operationId: id, vacancyId, hirerId, eventName } = this.state;
    this.setState({ spinner: true });
    operationsCheckout({ id, vacancyId })
      .then(() => {
        this.setState({ openModalCheckin: false });
        this.props.navigation.replace("Rating", { hirerId, eventName });
      })
      .catch(error => {
        error.response.data;
      })
      .finally(() => {
        this.setState({ spinner: false });
      });
  };

  confirmChecklist = () => {
    const { operationId: id, origin, status } = this.state;
    this.setState({ spinner: true });
    operationsChecklists({ id, origin })
      .then(() => {
        status !== "checkout"
          ? this.setState({ openModalCheckin: false, status: "occurrence" })
          : this.toCheckout();
      })
      .finally(() => {
        this.setState({ spinner: false });
      });
  };

  SendOcurrence = () => {
    const { operationId: id, job, image, description } = this.state;
    const request = { id, job, incidentStatus: 1, image, description };
    this.setState({ loading: true });
    incidents(request)
      .then(() => {
        debugger;
        this.setState({
          description: "",
          send: false,
          image: "",
          picture: "",
          openModalOccurrence: false
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

  isPaused = id => {
    openedBreaks({ id })
      .then(({ data }) => data)
      .then(({ result }) => {
        const { value: pause } = result;
        this.setState({ pause });
      });
    return;
  };

  toPause = reason => {
    const { operationId: id } = this.state;
    this.setState({ spinner: true });
    debugger;
    breaks({ id, reason })
      .then(() => {
        this.setState({ pause: true, openModalPause: false });
      })
      .finally(() => {
        this.setState({ spinner: false });
      });
    return;
  };

  returnPause = () => {
    const { operationId: id } = this.state;
    this.setState({ spinner: true });
    updatebreaks({ id })
      .then(() => {
        this.setState({ pause: false });
      })
      .finally(() => {
        this.setState({ spinner: false });
      });
    return;
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
      )
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
      checkListCheckout
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
                    icon={pause ? "play" : "pause"}
                    title={pause ? "voltar" : "Pausa"}
                    startAnimations={pause ? true : false}
                    color={pause ? "#03DAC6" : "#F13567"}
                    onPress={() => {
                      pause
                        ? this.returnPause()
                        : this.setState({ openModalPause: true });
                    }}
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
                name="Encontrar mais vagas"
                style={styles.btn}
                onPress={() => this.props.navigation.navigate("ToExplore")}
              />
            ) : (
              <RoundButton name="Minhas Atividades" style={styles.btn} />
            )}
          </View>
          <ModalCheckList
            visible={openModalCheckin}
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
            onImageSelected={image =>
              this.setState({ image: image.data, picture: image.uri })
            }
            valueInput={description}
            onChangeText={text =>
              this.setState({
                description: text,
                send: text !== "" ? true : false
              })
            }
            onClose={() => this.setState({ openModalOccurrence: false })}
          />
          <ModalPause
            visible={openModalPause}
            onPress={reason => this.toPause(reason)}
            onClose={() => this.setState({ openModalCheckin: false })}
          />
          <ModalDuties
            visible={openModalDuties}
            responsabilities={responsabilities}
            onClose={() => this.setState({ openModalDuties: false })}
          />
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

export default NextEvent;
