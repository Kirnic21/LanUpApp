import React, { Component } from "react";

import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  ScrollView,
  Image
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import arrow from "~/assets/images/arrowRight.png";

import { Field, reduxForm } from "redux-form";
import { Chip } from "react-native-paper";
import InputField from "~/shared/components/InputField";
import profession from "./Jobs";

class Profession extends Component {
  openAddProfession = () => {
    this.props.navigation.navigate("AddProfession");
  };

  openAddAbiliity = () => {
    this.props.navigation.navigate("AddSkill");
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.containerReceive}>
            <Text style={{ color: "#FFF", fontSize: 15 }}>
              Recebo no mínimo até:
            </Text>
            <Field
              style={{ width: "100%" }}
              component={InputField}
              name="receive"
              keyboardType="numeric"
            />
          </View>
          <View style={styles.containerProfessionAndSkill}>
            <View style={{ flexDirection: "row", marginBottom: "2%" }}>
              <Text style={{ color: "#FFF", fontSize: 15 }}>Profissão</Text>
              <Text
                style={{
                  color: "rgba(255, 255, 255, 0.7)",
                  fontSize: 12,
                  marginTop: "1.1%",
                  marginLeft: "2%"
                }}
              >
                0/3
              </Text>
            </View>
            <View
              style={{
                flexWrap: "wrap",
                flexDirection: "row",
                width: "100%"
              }}
            >
              {profession.map(({ name, id }) => (
                <Chip
                  key={id}
                  style={styles.chip}
                  textStyle={{ color: "#FFF", paddingRight: "3%" }}
                >
                  {name}
                </Chip>
              ))}
            </View>
            <TouchableOpacity
              onPress={this.openAddProfession}
              style={{
                width: "50%",
                height: "100%",
                position: "absolute",
                left: "100%",
                top: "85%"
              }}
            >
              <Image
                source={arrow}
                style={{
                  width: "12%",
                  height: "25%"
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.containerProfessionAndSkill}>
            <Text style={{ color: "#FFF", fontSize: 15 }}>Habilidades</Text>
            <Text
              style={{
                color: "#FFF",
                fontSize: 15,
                textAlignVertical: "center",
                padding: "10%",
                paddingLeft: "15%",
                top: "-3%"
              }}
            >
              Não há nenhuma habilidade
            </Text>
            <TouchableOpacity
              onPress={this.openAddAbiliity}
              style={{
                width: "50%",
                height: "100%",
                position: "absolute",
                left: "100%",
                top: "85%"
              }}
            >
              <Image
                source={arrow}
                style={{
                  width: "10%",
                  height: "28%"
                }}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#18142F",
    width: "100%"
  },
  containerReceive: {
    backgroundColor: "#24203B",
    marginHorizontal: "5%",
    padding: "5%",
    borderRadius: 15
  },
  containerProfessionAndSkill: {
    backgroundColor: "#24203B",
    marginLeft: "5%",
    marginTop: "10%",
    padding: "5%",
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15
  },
  chip: {
    backgroundColor: "#6C757D",
    margin: "1.5%"
  }
});

export default Profession = reduxForm({
  form: "Profession",
  enableReinitialize: true
})(Profession);
