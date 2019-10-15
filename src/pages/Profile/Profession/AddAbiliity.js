import React, { Component } from "react";

import { View, Text, Image, Dimensions } from "react-native";
import add from "../../../assets/images/icon_add.png";
import ActionButton from "../../../shared/components/ActionButton";
import styles from "./styles";
import Modal from "../../../shared/components/ModalComponent";
// import { updateSkills } from "../../shared/services/freela.http";

class AddAbiliity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  // componentDidMount() {
  //   this.setState({ skill });
  // }

  getInput = (event, nomedocampo) => {
    this.setState({ [nomedocampo]: event });
  };

  teste() {
    console.log(this.setState(skills));
  }

  render() {
    return (
      <View style={styles.Container}>
        <View style={styles.ContainerJob}>
          <View style={{ paddingTop: "20%" }}>
            <Text style={{ color: "#FFF", fontSize: 37 }}>Habilidades</Text>
          </View>
        </View>

        <View
          style={[
            styles.ContainerText,
            { width: Dimensions.get("window").width - 10 }
          ]}
        >
          <Text style={styles.title}>
            Não há nenhuma habilidade{"\n"}para ser exibida
          </Text>
          <Text style={styles.subtitle}>
            Adicione usando o{' " '}
            <Image source={add} style={{ width: 20, height: 20 }} />
            {' " '}
            abaixo
          </Text>
        </View>

        <View style={styles.ContainerBtn}>
          <ActionButton
            onPress={() => {
              this.setState({ visible: true });
            }}
            style={styles.ActionButton}
          />
        </View>
        <Modal
          onTouchOutside={() => {
            this.setState({ visible: false });
          }}
          visible={this.state.visible}
        >
          <Text style={{ color: "#FFF", padding: "5%", fontSize: 30 }}>
            Adicionar
          </Text>
          <View
            style={{
              justifyContent: "center",
              alignItems: "flex-start",
              left: "5%",
              top: "10%"
            }}
          >
            <InputLabel
              onChangeText={event => this.getInput(event, "skill")}
              title="Habilidade"
              style={{ width: 325, height: 50, borderColor: "#46C5F3" }}
            />
          </View>
          <View style={{ alignItems: "center", top: "10%" }}>
            <RoundButton
              style={{
                backgroundColor: "#46C5F3",
                width: "50%",
                height: 50,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 50
              }}
              name="Adicionar"
              onPress={this.state.teste}
            />
          </View>
        </Modal>
      </View>
    );
  }
}

export default AddAbiliity;
