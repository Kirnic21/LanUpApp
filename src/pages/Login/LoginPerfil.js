import React, { Component } from "react";
import ImageProfile from "./../../assets/images/backgroud.png";
import ArrowRight from "./../../assets/images/arrowRight.png";

import {
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
  Image,
  TouchableOpacity,
  Text,
  ScrollView
} from "react-native";
import { FlatList } from "react-native-gesture-handler";

class LoginPerfil extends Component {
  state = {
    selected: false
  };

  SelectedInput = () => {
    debugger;
    if (event.selected) {
    }
  };

  renderSeparator = () => {
    return (
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
  };

  aboutMe = () => this.props.navigation.navigate('AboutMe')

  render() {
    return (
      <ScrollView contentContainerStyle={styles.Container}>
        <View style={{ alignItems: "center", marginTop: '25%' }}>
          <TouchableOpacity onPress={this.aboutMe}>
            <Image source={ImageProfile}
              style={styles.TextInput}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.submitText}>Pré-visualizar o perfil</Text>
        <FlatList
          contentContainerStyle={styles.list}
          data={[
            {
              title: 'Sobre mim',
              subtitle: 'Sua foto de perfil, apresentação e mais'
            },
            {
              title: 'Profissão',
              subtitle: 'Área de operação e habilidades'
            },
            {
              title: 'Midias',
              subtitle: 'Fotos e videos de seu trabalho'
            },
            {
              title: 'Histórico de trabalho',
              subtitle: 'Trabalho, avaliações e recomendações'
            }
          ]}
          renderItem={({ item }) => (
            <View style={{ ...styles.item, flexDirection: 'row', justifyContent: "space-between", alignItems: "center" }}>
              <View>
                <Text style={{ color: 'white', fontSize: 15, marginBottom: 5 }}>
                  {item.title}
                </Text>
                <Text style={{ color: 'gray', fontSize: 13, borderBottomWidth: 0, borderTopWidth: 0 }}>
                  {item.subtitle}
                </Text>
              </View>
              <Image source={ArrowRight} style={{ width: 20, height: 20 }} />
            </View>
          )}
          ItemSeparatorComponent={this.renderSeparator}
        />
        <Text style={styles.agency}>Sou uma Agência</Text>
        <FlatList
          contentContainerStyle={styles.list}
          data={[
            {
              title: 'Configurações',
              subtitle: 'Senha e mais'
            }
          ]}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={{ color: 'white', fontSize: 15, marginBottom: 5 }}>
                {item.title}
              </Text>
              <Text style={{ color: 'gray', fontSize: 13, borderBottomWidth: 0, borderTopWidth: 0 }}>
                {item.subtitle}
              </Text>
            </View>

          )}
          ItemSeparatorComponent={this.renderSeparator}
        />
        {/* <FlatList
          contentContainerStyle={styles.list}
          data={[
            {
              title: 'Avaliar aplicativo'
            },
            {
              title: 'FAQ'
            },
            {
              title: 'Principios da Comunidade'
            },
            {
              title: 'Enviar feedback'
            },
            {
              title: 'Sobre o LanUp'
            },
            {
              title: 'Termos de serviço'
            }
          ]}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={{ color: 'white', fontSize: 15 }}>
                {item.title}
              </Text>
            </View>

          )}
          ItemSeparatorComponent={this.renderSeparator}
        /> */}
        <Text style={{ ...styles.submitText, color: 'white', marginBottom: 30 }}>Terminar sessão</Text>
      </ScrollView>
    );
  }
}

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  ImageBackgroundContainer: {
    width: "100%",
    height: "100%"
  },
  ImageBackgroundNickName: {
    width: 100,
    height: 95
  },
  Container: {
    alignItems: "center",
    width: width,
    backgroundColor: "#18142F"
  },
  logoNickName: {
    margin: 60
  },
  buttonContent: {
    flexDirection: "row",
    width: 280,
    margin: 20
  },
  TextInput: {
    borderColor: "white",
    borderWidth: 1.8,
    borderRadius: 55,
    width: 110,
    height: 110
  },
  TextInputSelected: {
    borderColor: "#F13567",
    borderWidth: 1.8,
    borderRadius: 50,
    height: 60
  },
  button: {
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#483D8B",
    borderColor: "#483D8B",
    borderWidth: 1.5,
    borderRadius: 50,
    height: 55,
    width: 150
  },
  submitText: {
    marginTop: 20,
    paddingTop: 10,
    paddingBottom: 10,
    color: '#46C5F3',
    textAlign: 'center',
    backgroundColor: '#24203B',
    borderRadius: 20,
    fontSize: 15,
    width: '70%'
  },
  agency: {
    marginTop: 20,
    paddingTop: 20,
    paddingBottom: 20,
    color: '#46C5F3',
    padding: 20,
    backgroundColor: '#24203B',
    borderRadius: 10,
    fontSize: 15,
    width: 340
  },
  list: {
    marginTop: 20,
    backgroundColor: '#24203B',
    width: 340,
    borderRadius: 20
  },
  item: {
    padding: 20,
    fontSize: 18
  }
});

export default LoginPerfil;
