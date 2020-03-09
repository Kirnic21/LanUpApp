import React from "react";
import { View, ImageBackground, StatusBar, SafeAreaView } from "react-native";
import ImageBack from "~/assets/images/Grupo_518.png";
import styles from "./styles";
import ModalCheckList from "./ModalCheckList";
import { getWorkdays } from "~/shared/services/freela.http";
import {
  operationsCheckins,
  operationsChecklists,
  getCheckins,
  getChecklists,
  incidents,
  breaks,
  openedBreaks,
  updatebreaks,
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
    bottomModalAndTitle: true,
    checked: false,
    checkList: [],
    description: "",
    eventName: "",
    openModalCheckin: false,
    job: "",
    status: "",
    spinner: false,
    openModalPause: false,
    openModalOccurrence: false,
    origin: "",
    pause: false,
    isCheckin: false,
    openModalDuties: false,
    responsabilities: []
  };

  componentDidMount() {
    this.getWorkday();
  }
  componentWillUnmount() {
    this.getWorkday();
  }

  getWorkday = () => {
    const date = new Date();
    const day = date.toISOString().substr(0, 10);
    this.setState({ spinner: true });
    getWorkdays({ day })
      .then(({ data }) => {
        const get = data.result.value;
        this.setState({ get });
        get !== null ? this.setWordays() : this.setState({ status: "without" });
      })
      .catch(error => {
        error.response.data;
      })
      .finally(() => {
        this.setState({ spinner: false });
      });
  };

  setWordays = () => {
    const { get, status } = this.state;
    const checkList =
      status === "checkout" ? get.checkListCheckout : get.checkListCheckIn;
    const check = checkList.map((c, i) => ({ id: i, title: c }));
    this.setState({
      eventName: get.eventName,
      job: get.job,
      operationId: get.operationId,
      checkList: check,
      spinner: false,
      vacancyId: get.vacancyId,
      freelaId: get.freelaId,
      checkout: get.checkout,
      hirerId: get.hirerId,
      responsabilities: get.responsabilities
    });
    request = {
      id: get.operationId,
      freelaId: get.freelaId
    };
    getCheckins(request)
      .then(({ data }) => data)
      .then(({ result }) => {
        const { value: isCheckin } = result;
        this.setState({ origin: "Checkin", isCheckin });
        this.checkoutHours();
        isCheckin ? this.checklist() : this.setState({ status: "checkin" });
      })
      .catch(error => {
        error.response.data;
      });

    openedBreaks({ id: get.operationId })
      .then(({ data }) => data)
      .then(({ result }) => {
        const { value } = result;
        this.setState({ pause: value });
      })
      .catch(error => {
        error.response.data;
      });
    BackgroundTimer.setInterval(() => {
      this.checkoutHours();
    }, 60000);
  };

  checkoutHours = () => {
    const { checkout } = this.state;
    const date = new Date();
    const checkoutDate = new Date(date.setHours(...checkout.split(":")));

    const checkoutTime =
      checkout.substr(0, 2) === "00"
        ? checkoutDate.setDate(checkoutDate.getDate() + 1)
        : checkoutDate.setDate(checkoutDate.getDate());

    if (new Date() >= checkoutTime)
      this.setState({ status: "checkout", origin: "Checkout" });
  };

  toCheckIn = () => {
    const { operationId: id, vacancyId } = this.state;
    operationsCheckins({ id, vacancyId }).then(({}) => {
      this.setState({ openModalCheckin: true });
    });
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

  checklist = () => {
    const { operationId: id, freelaId, origin } = this.state;
    this.setState({ spinner: true });
    request = {
      id,
      origin,
      freelaId
    };
    getChecklists(request)
      .then(({ data }) => data)
      .then(({ result }) => {
        const { value: isCheckLists } = result;
        const { status } = this.state;
        if (isCheckLists && status !== "checkout")
          this.setState({ status: "occurrence" });
        if (isCheckLists === false && status !== "checkout")
          this.setState({
            status: "checkin",
            openModalCheckin: true,
            isCheckLists
          });
      })
      .catch(error => {
        error.response.data;
      })
      .finally(() => {
        this.setState({ spinner: false });
      });
  };

  checkedChecklist = () =>
    this.state.checked
      ? this.setState({ checked: false })
      : this.setState({ checked: true });

  confirmChecklist = () => {
    const { operationId: id, origin, status } = this.state;
    this.setState({ spinner: true });
    operationsChecklists({
      id,
      origin: origin === "Checkin" ? 1 : 2
    })
      .then(() => {
        status !== "checkout"
          ? this.setState({
              openModalCheckin: false,
              status: "occurrence"
            })
          : this.toCheckout();
      })
      .finally(() => {
        this.setState({ spinner: false });
      });
  };

  sendImgOcurrence = image => {
    this.setState({ image: image.data, picture: image.uri });
    AlertHelper.show("success", "Sucesso", "Sua imagem foi adicionada.");
    return;
  };

  SendOcurrence = () => {
    const { operationId: id, job, image, description } = this.state;
    request = { id, job, incidentStatus: 1, image, description };
    incidents(request).then(() => {
      this.setState({
        description: "",
        send: false,
        openModalOccurrence: false
      });
      AlertHelper.show("success", "Sucesso", "Ocorrência enviada com sucesso.");
    });
    return;
  };

  breakOperations = reason => {
    const { operationId: id } = this.state;
    this.setState({ spinner: true });
    request = { id, reason };
    breaks(request)
      .then(() => {
        this.setState({ pause: true, openModalPause: false });
      })
      .finally(() => {
        this.setState({ spinner: false });
      });
    return;
  };

  returnBreak = () => {
    const { operationId: id } = this.state;
    this.setState({ spinner: true });
    updatebreaks({ id })
      .then(() => {
        this.setState({ pause: false });
      })
      .finally(() => {
        this.setState({ spinner: false });
      });
  };

  buttonsOperations = () => {
    const { status, pause } = this.state;
    return {
      without: (
        <ButtonPulse
          title={`Iniciar${"\n"}Check-in`}
          titleStyle={{ textAlign: "center", lineHeight: calcWidth(7) }}
          titleColor="#24203B"
          size="normal"
          color="#4F4D65"
        />
      ),
      checkin: (
        <ButtonPulse
          title={`Iniciar${"\n"}Check-in`}
          titleStyle={{ textAlign: "center", lineHeight: calcWidth(7) }}
          size="normal"
          startAnimations={true}
          color="#46C5F3"
          onPress={() => this.toCheckIn()}
        />
      ),
      checkout: (
        <ButtonPulse
          title={`Iniciar${"\n"}Check-out`}
          titleStyle={{ textAlign: "center", lineHeight: calcWidth(7) }}
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

  activityButton = () => {
    const { status } = this.state;
    return {
      without: (
        <RoundButton
          name="Encontrar mais vagas"
          style={styles.btn}
          onPress={() => this.props.navigation.navigate("ToExplore")}
        />
      ),
      occurrence: <RoundButton name="Minhas Atividades" style={styles.btn} />
    }[status];
  };

  render() {
    const {
      openModalCheckin,
      openModalOccurrence,
      openModalDuties,
      eventName,
      job,
      checkList,
      checked,
      status,
      spinner,
      send,
      description,
      pause,
      openModalPause,
      responsabilities,
      picture
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
                        ? this.returnBreak()
                        : this.setState({ openModalPause: true });
                    }}
                  />
                </View>
              </View>
            ) : (
              <></>
            )}
          </View>
          <View style={styles.containerBtn}>{this.activityButton()}</View>
          <ModalCheckList
            visible={openModalCheckin}
            titleCheck={status === "checkout" ? "Check-out" : "Check-in"}
            job={job}
            checkList={checkList}
            pressConfirm={() => this.confirmChecklist()}
            onPressCheck={() => this.checkedChecklist()}
            checked={checked}
            eventName={eventName}
            onClose={() => {
              this.setState({ openModalCheckin: false });
            }}
          />
          <ModalOccurrence
            visible={openModalOccurrence}
            picture={picture}
            sendOcurrence={send}
            onPressSend={() => this.SendOcurrence()}
            onImageSelected={this.sendImgOcurrence}
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
            onPress={reason => this.breakOperations(reason)}
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
