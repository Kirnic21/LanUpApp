import React from "react";
import {
  View,
  ImageBackground,
  StatusBar,
  SafeAreaView,
  Text
} from "react-native";
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
  updatebreaks
} from "~/shared/services/operations.http";
import TitleEvent from "./TitleEvent";
import RoundButton from "~/shared/components/RoundButton";
import SpinnerComponent from "~/shared/components/SpinnerComponent";
import { calcWidth } from "~/assets/Dimensions";
import ModalPause from "./ModalPause";
import ModalOccurrence from "./ModalOccurrence";
import ButtonPulse from "~/shared/components/ButtonPulse";
import { AlertHelper } from "~/shared/helpers/AlertHelper";

class NextEvent extends React.Component {
  state = {
    openModalCheckin: false,
    bottomModalAndTitle: true,
    eventName: "",
    job: "",
    checkList: [],
    checked: false,
    status: "",
    spinner: true,
    openModalPause: false,
    openModalOccurrence: false,
    description: "",
    origin: "",
    pause: false
  };

  componentDidMount() {
    this.getWorkday();
  }
  componentWillUnmount() {
    this.getWorkday();
  }

  closeModal = value => {
    return this.setState(value);
  };

  getWorkday = () => {
    const date = new Date().toISOString().substr(0, 10);
    getWorkdays({ day: date }).then(({ data }) => {
      const get = data.result.value;
      this.setState({ get });
      get !== null
        ? this.setWordays()
        : this.setState({ status: "without", spinner: false });
      openedBreaks({ id: get.operationId })
        .then(({ data }) => data)
        .then(({ result }) => {
          const { value } = result;
          this.setState({ pause: value });
        });
    });
  };

  setWordays = () => {
    const { get } = this.state;
    const check = get.checkList.map((c, i) => ({ id: i, title: c }));
    this.setState({
      eventName: get.eventName,
      job: get.job,
      operationId: get.operationId,
      checkList: check,
      spinner: false,
      vacancyId: get.vacancyId,
      freelaId: get.freelaId
    });
    request = {
      id: get.operationId,
      freelaId: get.freelaId
    };

    getCheckins(request)
      .then(({ data }) => data)
      .then(({ result }) => {
        const { value: isCheckin } = result;
        this.setState({ origin: "Checkin" });
        isCheckin ? this.checklist() : this.setState({ status: "checkin" });
      });
  };

  toCheckIn = () => {
    const { operationId: id, vacancyId } = this.state;
    operationsCheckins({ id, vacancyId }).then(({}) => {
      this.setState({ openModalCheckin: true });
    });
  };

  checklist = () => {
    const { operationId: id, freelaId, origin } = this.state;
    request = {
      id,
      origin,
      freelaId
    };
    getChecklists(request)
      .then(({ data }) => data)
      .then(({ result }) => {
        const { value: isCheckLists } = result;
        isCheckLists
          ? this.setState({ status: "occurrence" })
          : this.setState({
              status: "checkin",
              openModalCheckin: true
            });
      });
  };

  checkedChecklist = () =>
    this.state.checked
      ? this.setState({ checked: false })
      : this.setState({ checked: true });

  confirmChecklist = () => {
    const { operationId: id, origin } = this.state;
    operationsChecklists({ id, origin: origin === "Checkin" ? 1 : 0 }).then(
      () => {
        this.setState({
          openModalCheckin: false,
          status: "occurrence"
        });
      }
    );
  };

  sendImgOcurrence = image => {
    this.setState({ image: image.data });
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
    request = { id, reason };
    breaks(request).then(() => {
      this.setState({ pause: true, openModalPause: false });
    });
    return;
  };

  returnBreak = () => {
    const { operationId: id } = this.state;
    updatebreaks({ id }).then(() => {
      this.setState({ pause: false });
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
      occurrence: (
        <ButtonPulse
          title="Ocorrência"
          icon="alert-circle"
          size="normal"
          startAnimations={pause ? false : true}
          color="#FFB72B"
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
      eventName,
      job,
      checkList,
      checked,
      status,
      spinner,
      send,
      description,
      pause,
      openModalPause
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
                  />
                  {status === "checkout" ? (
                    <View style={{ top: calcWidth(12) }}>
                      <ButtonPulse
                        title="Ocorrência"
                        icon="alert-circle"
                        size="small"
                        startAnimations={true}
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
            job={job}
            checkList={checkList}
            pressConfirm={() => this.confirmChecklist()}
            onPressCheck={() => this.checkedChecklist()}
            checked={checked}
            eventName={eventName}
            onClose={() => this.closeModal({ openModalCheckin: false })}
            onTouchOutside={() => this.closeModal({ openModalCheckin: false })}
            onSwipeOut={() => this.setState({ bottomModalAndTitle: false })}
          />
          <ModalOccurrence
            visible={openModalOccurrence}
            send={send}
            onPressSend={() => this.SendOcurrence()}
            onImageSelected={this.sendImgOcurrence}
            valueInput={description}
            onChangeText={text =>
              this.setState({
                description: text,
                send: text !== "" ? true : false
              })
            }
            onClose={() => this.closeModal({ openModalOccurrence: false })}
            onTouchOutside={() =>
              this.closeModal({ openModalOccurrence: false })
            }
            onSwipeOut={() => this.setState({ bottomModalAndTitle: false })}
          />
          <ModalPause
            visible={openModalPause}
            onPress={reason => this.breakOperations(reason)}
            onClose={() => this.closeModal({ openModalCheckin: false })}
            onTouchOutside={() => this.closeModal({ openModalCheckin: false })}
            onSwipeOut={() => this.setState({ bottomModalAndTitle: false })}
          />
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

export default NextEvent;
