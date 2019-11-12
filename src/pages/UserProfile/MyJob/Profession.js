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

class Profession extends Component {
  static navigationOptions = {
    title: "Profissão"
  };

  state = {
    selected: false
  };

  renderSeparator = () => (
    <View
      style={{
        height: 2,
        width: "90%",
        backgroundColor: "#18142F",
        marginLeft: "5%",
        marginRight: "10%"
      }}
    />
  );

  openAddProfession = () => {
    this.props.navigation.navigate("AddProfession");
  };

  openAddAbiliity = () => {
    this.props.navigation.navigate("AddSkill");
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.Container}>
          <View style={{ marginBottom: "30%", top: "10%" }}>
            <FlatList
              style={{}}
              contentContainerStyle={[styles.list]}
              data={[
                {
                  key: "1",
                  title: "Profissão",
                  subtitle: "3/3"
                }
              ]}
              renderItem={({ item }) => (
                <View style={styles.item}>
                  <View style={{ flexDirection: "row", marginBottom: 5 }}>
                    <Text
                      style={{ color: "white", fontSize: 15, marginRight: 10 }}
                    >
                      {item.title}
                    </Text>
                    <Text style={{ color: "gray", fontSize: 13, marginTop: 2 }}>
                      {item.subtitle}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      maxWidth: 400,
                      margin: 0,
                      flexWrap: "wrap"
                    }}
                  >
                    {/* TODO: fazer um service fake pra trabalharmos com json! */}
                    {/* TODO: fazer laço dessas View de baixo! */}
                    <View>
                      <Text
                        style={{
                          ...styles.TextBorder,
                          backgroundColor: "#737082",
                          width: 100,
                          fontSize: 13
                        }}
                      >
                        Bartender
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          ...styles.TextBorder,
                          backgroundColor: "#737082",
                          width: 90,
                          fontSize: 13
                        }}
                      >
                        Cozinha
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          ...styles.TextBorder,
                          backgroundColor: "#737082",
                          width: 100,
                          fontSize: 13
                        }}
                      >
                        Recepção
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          ...styles.TextBorder,
                          backgroundColor: "#737082",
                          width: 70,
                          fontSize: 13
                        }}
                      >
                        Caixa
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          ...styles.TextBorder,
                          backgroundColor: "#737082",
                          width: 80,
                          fontSize: 13
                        }}
                      >
                        Garçom
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          ...styles.TextBorder,
                          backgroundColor: "#737082",
                          width: 140,
                          fontSize: 13
                        }}
                      >
                        Serviços Gerais
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={this.openAddProfession}
                      style={{ left: "20%", marginTop: "-3.5%" }}
                    >
                      <Image source={arrow} style={{ width: 20, height: 20 }} />
                    </TouchableOpacity>
                    <View />
                  </View>
                </View>
              )}
              keyExtractor={item => item.key}
            />
            <FlatList
              contentContainerStyle={styles.list}
              data={[
                {
                  key: "1",
                  title: "Habilidades",
                  subtitle: "Não há nenhuma habilidade"
                }
              ]}
              renderItem={({ item }) => (
                <View style={styles.item}>
                  <Text
                    style={{ color: "white", fontSize: 15, marginBottom: 5 }}
                  >
                    {item.title}
                  </Text>
                  <View style={{ height: 75, justifyContent: "center" }}>
                    <Text
                      style={{ color: "#FFFFFF", fontSize: 15, left: "10%" }}
                    >
                      {item.subtitle}
                    </Text>
                    <TouchableOpacity
                      onPress={this.openAddAbiliity}
                      style={{ left: "90%", top: "-30%" }}
                    >
                      <Image source={arrow} style={{ width: 20, height: 20 }} />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              keyExtractor={item => item.key}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  Container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    flex: 1,
    height: height + 50,
    backgroundColor: "#18142F"
  },
  list: {
    backgroundColor: "#24203B",
    width,
    left: "5%",
    borderRadius: 20
  },
  item: {
    padding: 20,
    fontSize: 18
  },
  TextBorder: {
    color: "white",

    paddingBottom: 10,

    borderRadius: 50,

    width: 90,

    height: 32,

    paddingTop: 5,

    textAlign: "center",

    flexWrap: "wrap",

    margin: 3
  }
});

export default Profession;
