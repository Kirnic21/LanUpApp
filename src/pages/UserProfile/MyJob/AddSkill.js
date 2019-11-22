import React, { Component } from "react";

import { View, Text, Image, Dimensions, StyleSheet } from "react-native";
import add from "~/assets/images/icon_add.png";
import ActionButton from "~/shared/components/ActionButton";

import Modal from "~/shared/components/ModalComponent";
import { ScrollView } from "react-native-gesture-handler";
import { Field, reduxForm } from "redux-form";

// import { updateSkills } from "../../shared/services/freela.http";

class AddSkill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  // getInput = (event, nomedocampo) => {
  //   this.setState({ [nomedocampo]: event });
  // };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View
            style={{
              marginHorizontal: "10%"
            }}
          >
            <Text style={{ color: "#FFF", fontSize: 25 }}>Habiliddades</Text>

            <View
              style={{
                marginTop: "50%"
              }}
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
            <View
              style={{
                alignContent: "stretch",
                paddingVertical: "65%",
                alignItems: "flex-end"
              }}
            >
              <View style={{ position: "absolute", marginTop: "95%" }}>
                <ActionButton
                  onPress={() => {
                    this.setState({ visible: true });
                  }}
                />
              </View>
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
                  style={{ width: "91%", height: 50, borderColor: "#46C5F3" }}
                />
              </View>
              <View style={{ alignItems: "center", top: "10%" }}>
                <RoundButton
                  style={{
                    backgroundColor: "#46C5F3",
                    width: "50%",
                    height: "80%",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 50
                  }}
                  name="Adicionar"
                  onPress={
                    (this.state.teste, () => this.setState({ visible: false }))
                  }
                />
              </View>
            </Modal>
          </View>
        </ScrollView>
      </View>
    );
  }
}
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#18142F",
    width: "100%"
  },
  title: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 24.7,
    lineHeight: 42
  },
  subtitle: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 17,
    textAlign: "center",
    top: "8%",
    lineHeight: 55
  }
});

export default AddSkill = reduxForm({
  form: "AddSkill",
  // validate: formRules,
  enableReinitialize: true
})(AddSkill);
