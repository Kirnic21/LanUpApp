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
import ButtonOccurrence from "./ButtonOcurrence";
import ButtonChecklist from "./ButtonCheckList";
import ButtonPause from "./ButtonPause";
import ButtonDuties from "./ButtonDuties";
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
    isVisible: false
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
      spinner: false
    });
    request = {
      id: get.operationId,
      freelaId: get.freelaId
    };
    getCheckins(request).then(({ data }) => {
      const isCheckin = data.result.value;
      isCheckin ? "" : this.setState({ status: "checkin" });
      if (isCheckin) {
        getChecklists(request).then(({ data }) => {
          const isCheckLists = data.result.value;
          isCheckLists
            ? this.setState({ status: "occurrence", isVisible: true })
            : this.setState({ visible: true });
        });
      }
    });
  };

  closeModal = () => {
    this.setState({ visible: false });
  };

  closeModalBreve = () => {
    this.setState({ isVisible: false });
    setTimeout(async () => {
      this.props.navigation.navigate("UserProfile");
    }, 500);
  };

  toCheckIn = () => {
    const { operationId } = this.state;
    operationsCheckins({ id: operationId }).then(({ data }) => {
      console.log(data);
      this.setState({ visible: true });
    });
  };

  confirmChecklist = () => {
    const { operationId } = this.state;
    operationsChecklists({ id: operationId }).then(({ data }) => {
      debugger;
      this.setState({
        visible: false,
        status: "occurrence"
      });
    });
  };

  checked = () => {
    const { checked } = this.state;
    checked
      ? this.setState({ checked: false })
      : this.setState({ checked: true });
  };

  buttonStatus = () => {
    const { status } = this.state;
    return {
      without: (
        <ButtonChecklist title={`Iniciar${"\n"}Check-in`} type="without" />
      ),
      checkin: (
        <ButtonChecklist
          title={`Iniciar${"\n"}Check-in`}
          type="checkin"
          onPress={() => this.toCheckIn()}
        />
      ),
      occurrence: <ButtonOccurrence />
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
          <ModalComingSoon
            onTouchOutside={() => this.closeModalBreve()}
            onClose={() => this.closeModalBreve()}
            visible={isVisible}
            onSwipeOut={() => this.setState({ bottomModalAndTitle: false })}
          />
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

export default NextEvent;
