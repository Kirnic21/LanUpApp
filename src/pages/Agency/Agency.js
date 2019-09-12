import React, { Component } from "react";
import { FlatList } from "react-native-gesture-handler";
import ButtonAdd from "../../shared/components/ButtonAdd";
import {
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TextInput
} from "react-native";

class Agency extends Component {
  state = {
    selected: false
  };

  SelectedInput = () => {
    if (event.selected) {
    }
  };

  openIAnAgency = () => {
    this.props.navigation.navigate('IAnAgency');
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.Container}>
        <View style={{ alignItems: "center", marginTop: 40 }}>
          <TouchableOpacity onPress={this.aboutMe}>
          </TouchableOpacity>
        </View>
        <FlatList
          contentContainerStyle={styles.list}
          data={[
            {
              title: 'Informações da Agência'
            }
          ]}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={{ color: 'white', fontSize: 15, marginBottom: 20 }}>
                {item.title}
              </Text>
              <View>
                <Text style={{ color: "white", marginBottom: 5, fontSize: 13 }}>CNPJ</Text>
              </View>
              <View>
                <TouchableOpacity style={this.state.selected == false ? styles.TextInput : styles.TextInputSelected} onPress={this.SelectedInput}>
                  <TextInput
                    style={styles.ValueInput}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ paddingTop: 10 }}>
                <Text style={{ color: "white", marginBottom: 5, fontSize: 13 }}>CEP</Text>
              </View>
              <View>
                <TouchableOpacity style={styles.TextInput}>
                  <TextInput
                    style={styles.ValueInput}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />

        {/* TODO: fazer um service fake retornando esses dados dos serviços */}
        {/* TODO: o titulo e subtitulo tem que ser renderizado fora do data = */}
        <FlatList
          contentContainerStyle={styles.list}
          data={[
            {
              title: 'Serviços',
              subtitle: '3/3'
            }
          ]}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <View style={{ flexDirection: "row", marginBottom: 5 }}>
                <Text style={{ color: 'white', fontSize: 15, marginRight: 10 }}>
                  {item.title}
                </Text>
                <Text style={{ color: 'gray', fontSize: 13, marginTop: 2 }}>
                  {item.subtitle}
                </Text>
              </View>
              <View style={{ flexDirection: "row", maxWidth: 400, margin: 0, flexWrap: "wrap" }}>
                <View>
                  <Text style={{ ...styles.TextBorder, backgroundColor: '#FFB72B', width: 90, fontSize: 13 }}>Bartender</Text>
                </View>
                <View>
                  <Text style={{ ...styles.TextBorder, backgroundColor: '#737082', width: 80, fontSize: 13 }}>Cozinha</Text>
                </View>
                <View>
                  <Text style={{ ...styles.TextBorder, backgroundColor: '#737082', width: 80, fontSize: 13 }}>Recepção</Text>
                </View>
                <View>
                  <Text style={{ ...styles.TextBorder, backgroundColor: '#737082', width: 50, fontSize: 13 }}>Caixa</Text>
                </View>
                <View>
                  <Text style={{ ...styles.TextBorder, backgroundColor: '#737082', width: 60, fontSize: 13 }}>Garçom</Text>
                </View>
                <View>
                  <Text style={{ ...styles.TextBorder, backgroundColor: '#737082', width: 130, fontSize: 13 }}>Serviços Gerais</Text>
                </View>
                <View>
                  <Text style={{ ...styles.TextBorder, backgroundColor: '#46C5F3', width: 40, fontSize: 13 }}>DJ</Text>
                </View>
                <View>
                  <Text style={{ ...styles.TextBorder, backgroundColor: '#865FC0', width: 150, fontSize: 13 }}>Animador de Festa</Text>
                </View>
                <View>
                </View>
              </View>
            </View>
          )
          }
        />
        <ButtonAdd value={"Adicionar Profissão"} />
        <TouchableOpacity onPress={this.openIAnAgency}>
          <Text style={{ ...styles.submitText, color: 'white', marginBottom: 30, backgroundColor: '#865FC0', fontSize: 13, width: 200 }}>Concluir</Text>
        </TouchableOpacity>
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
  Image: {
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
    width: width - 50
  },
  list: {
    marginTop: 20,
    backgroundColor: '#24203B',
    width: width - 50,
    borderRadius: 20
  },
  item: {
    padding: 20,
    fontSize: 18
  },
  TextInput: {
    borderColor: "white",
    borderWidth: 1.5,
    borderRadius: 50
  },
  TextBorder: {
    color: 'white',
    paddingBottom: 10,
    borderRadius: 50,
    width: 90,
    height: 32,
    paddingTop: 5,
    textAlign: 'center',
    flexWrap: 'wrap',
    margin: 3
  },
  ValueInput: {
    height: 45,
    color: 'white',
    fontSize: 15,
    paddingHorizontal: 20
  }
});

export default Agency;
