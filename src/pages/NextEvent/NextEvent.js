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
  incidents
} from "~/shared/services/operations.http";
import TitleEvent from "./TitleEvent";
import RoundButton from "~/shared/components/RoundButton";
import SpinnerComponent from "~/shared/components/SpinnerComponent";
import { calcWidth } from "~/assets/Dimensions";
import ModalPause from "./ModalPause";
import ModalOcurrence from "./ModalOcurrence";
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
    isModalPause: false,
    openModalOccurrence: false,
    description: "",
    origin: ""
  };

  componentDidMount() {
    this.getWorkday();
  }

  getWorkday = () => {
    const date = new Date().toISOString().substr(0, 10);
    getWorkdays({ day: date }).then(({ data }) => {
      const get = data.result.value;
      this.setState({ get });
      get !== null
        ? this.setWordays()
        : this.setState({ status: "without", spinner: false });
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

  closeModal = value => {
    return this.setState(value);
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

  checked = () =>
    this.state.checked
      ? this.setState({ checked: false })
      : this.setState({ checked: true });

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

  buttonStatus = () => {
    const { status } = this.state;
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
          startAnimations={true}
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
      description
    } = this.state;
    return (
      <ImageBackground source={ImageBack} style={{ flex: 1 }}>
        <SpinnerComponent loading={spinner} />
        <SafeAreaView style={styles.container}>
          <StatusBar backgroundColor="transparent" translucent={true} />
          <TitleEvent status={status} job={job} eventName={eventName} />
          <View style={styles.containerCircle}>
            <View style={styles.borderCircle}>{this.buttonStatus()}</View>
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
                    icon="pause"
                    title="Pausa"
                    color="#F13567"
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
            onPressCheck={() => this.checked()}
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
          <ModalPause visible={false} />
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

export default NextEvent;
