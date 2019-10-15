import React, { Component } from "react";

import { View, Text, Image, TextInput } from "react-native";
import { Chip } from "react-native-paper";
import add from "../../../assets/images/icon_add.png";
import ActionButton from "../../../shared/components/ActionButton";
import styles from "./styles";
import Modal from "../../../shared/components/ModalComponent";
import InputLabel from "~/shared/components/InputLabel";
import RoundButton from "~/shared/components/RoundButton";

class AddProfession extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    };
  }

  setModalViisible(status) {
    this.setState({ modalVisible: status });
  }

  render() {
    return (
      <View style={styles.Container}>
        <View style={styles.ContainerJob}>
          <View style={{ paddingTop: "20%" }}>
            <Text style={{ color: "#FFF", fontSize: 25 }}>Profissão</Text>
            <Text
              style={{
                color: "rgba(255, 255, 255, 0.7)",
                fontSize: 20,
                textAlign: "right",
                top: "-45%"
              }}
            >
              0/3
            </Text>
          </View>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            <Chip textStyle={styles.textChip} style={styles.chip}>
              Bartender
            </Chip>
            <Chip
              textStyle={styles.textChip}
              style={[styles.chip, { width: 85 }]}
            >
              Cozinha
            </Chip>
            <Chip
              textStyle={styles.textChip}
              style={[styles.chip, { width: 100 }]}
            >
              Recepção
            </Chip>
            <Chip
              textStyle={styles.textChip}
              style={[styles.chip, { width: 70 }]}
            >
              Caixa
            </Chip>
            <Chip
              textStyle={styles.textChip}
              style={[styles.chip, { width: 84 }]}
            >
              Garçom
            </Chip>
            <Chip
              textStyle={styles.textChip}
              style={[styles.chip, { width: 134 }]}
            >
              Serviço Gerais
            </Chip>
          </View>
        </View>

        <View style={styles.ContainerText}>
          <Text style={styles.title}>
            Nenhuma Profissão{"\n"}foi selecionada
          </Text>
          <Text style={styles.subtitle}>
            Se a sua profissão não está{"\n"}
            disponível acima.{"\n"}
            Adicione usando o{' " '}
            <Image source={add} style={{ width: 20, height: 20 }} />
            {' " '}
            abaixo
          </Text>
        </View>

        <View style={styles.ContainerBtn}>
          <ActionButton
            style={styles.ActionButton}
            onPress={() => {
              this.setState({ visible: true });
            }}
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
              title="Profissão"
              style={{ width: 325, height: 50, borderColor: "#865FC0" }}
            />
          </View>
          <View style={{ alignItems: "center", top: "10%" }}>
            <RoundButton
              style={{
                backgroundColor: "#7541BF",
                width: "50%",
                height: 50,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 50
              }}
              name="Adicionar"
            />
          </View>
        </Modal>
      </View>
    );
  }
}

export default AddProfession;
