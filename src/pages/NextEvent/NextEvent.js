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
  getChecklists
} from "~/shared/services/operations.http";
import TitleEvent from "./TitleEvent";
import RoundButton from "~/shared/components/RoundButton";
import SpinnerComponent from "~/shared/components/SpinnerComponent";
import { calcWidth } from "~/assets/Dimensions";
import ModalPause from "./ModalPause";
import ModalOcurrence from "./ModalOcurrence";
import ButtonPulse from "~/shared/components/ButtonPulse";

class NextEvent extends React.Component {
  state = {
    visible: false,
    bottomModalAndTitle: true,
    eventName: "",
    job: "",
    checkList: [],
    checked: false,
    status: "",
    spinner: true,
    isModalPause: false
  };

  componentDidMount() {
    this.getWorkday();
  }

  getWorkday = () => {
    const date = new Date().toISOString().substr(0, 10);
    getWorkdays({ day: date }).then(({ data }) => {
      debugger;
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
      spinner: false
    });
    request = {
      id: get.operationId,
      freelaId: get.freelaId
    };

    getCheckins(request)
      .then(({ data }) => data)
      .then(({ result }) => {
        const { value: isCheckin } = result;

        const getStateByChecklist = ({ data }) =>
          data.result.value
            ? { status: "occurrence" }
            : { status: "checkin", visible: true };

        if (isCheckin)
          getChecklists(request)
            .then(getStateByChecklist)
            .then(this.setState);
        else this.setState({ status: "checkin" });
      });
  };

  closeModal = () => this.setState({ visible: false });

  toCheckIn = () => {
    const { operationId: id } = this.state;

    operationsCheckins({ id }).then(() => this.setState({ visible: true }));
  };

  confirmChecklist = () => {
    const { operationId: id } = this.state;
    operationsChecklists({ id }).then(({ data }) => {
      debugger;
      this.setState({
        visible: false,
        status: "occurrence"
      });
    });
  };

  checked = () =>
    this.state.checked
      ? this.setState({ checked: false })
      : this.setState({ checked: true });

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
      visible,
      eventName,
      job,
      checkList,
      checked,
      status,
      spinner,
      isVisible
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
                    icon="play"
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
            visible={visible}
            job={job}
            checkList={checkList}
            pressConfirm={() => this.confirmChecklist()}
            onPressCheck={() => this.checked()}
            checked={checked}
            eventName={eventName}
            onClose={() => this.closeModal()}
            onTouchOutside={() => this.closeModal()}
            onSwipeOut={() => this.setState({ bottomModalAndTitle: false })}
          />
          <ModalOcurrence visible={false} />
          <ModalPause visible={false} />
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

export default NextEvent;
