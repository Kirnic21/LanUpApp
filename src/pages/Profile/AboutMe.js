import React, { Component } from "react";
import ImageProfile from "./../../assets/images/backgroud.png";
import Box from '../../shared/components/Box';
import ImageBody from './../../assets/images/icon_addbody.png';
import ImageSelf from './../../assets/images/icon_addselfie.png';
import InputLabel from "../../shared/components/InputLabel";

import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
  TextInput,
  TextArea
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import ToggleSwitch from "toggle-switch-react-native";

BoxItem = [
  {
    icon: ImageSelf,
    onPress: this.SelectedInput
  },
  {
    icon: ImageSelf,
    onPress: this.SelectedInput
  },
  {
    icon: ImageBody,
    onPress: this.SelectedInput
  },
  {
    icon: ImageBody,
    onPress: this.SelectedInput
  }
]

class AboutMe extends Component {
  state = {
    selected: false,
    filhos: false,
    fumo: false,
    bebo: false,
    tatuagem: false
  };

  SelectedInput = () => {
    debugger
    if (event.selected) {
    }
  };

  onToggle(isOn) {
    console.log("Changed to " + isOn);
  }


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

  render() {
    return (
      <ScrollView contentContainerStyle={styles.Container}>
        <View style={{ alignItems: "center", marginTop: '25%' }}>
          <TouchableOpacity onPress={this.aboutMe}>
            <Image source={ImageProfile}
              style={styles.Image}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          contentContainerStyle={styles.list}
          data={[
            {
              title: 'Informações do Perfil'
            }
          ]}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={{ color: 'white', fontSize: 15, marginBottom: 20 }}>
                {item.title}
              </Text>
              <InputLabel title={"Nome Completo"} />
              <InputLabel title={"Apelido"} />
              <InputLabel title={"Descrição"} />
            </View>
          )}
        />
        <FlatList
          contentContainerStyle={styles.list}
          data={[
            {
              title: 'Localização'
            }
          ]}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={{ color: 'white', fontSize: 13, marginBottom: 15 }}>
                {item.title}
              </Text>
              <View>
                <TouchableOpacity style={this.state.selected == false ? styles.TextInput : styles.TextInputSelected} onPress={this.SelectedInput}>
                  <TextInput
                    style={styles.ValueInput}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
        <FlatList
          contentContainerStyle={styles.list}
          data={[
            {
              title: 'Fotos de apresentação',
              subtitle: '2 de perfil(sozinho) e 2 de corpo inteiro'
            }
          ]}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={{ color: 'white', fontSize: 13, marginBottom: 5 }}>
                {item.title}
              </Text>
              <Text style={{ color: 'gray', fontSize: 10, marginBottom: 20 }}>
                {item.subtitle}
              </Text>
              <TouchableOpacity
                style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                {BoxItem.map(item => <Box icon={item.icon} onPress={item.onPress} />)}
              </TouchableOpacity>
            </View>
          )}
        />
        <FlatList
          contentContainerStyle={{ ...styles.list, marginBottom: 30 }}
          data={[
            {
              title: 'Informações Privadas'
            }
          ]}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <InputLabel title={"E-mail"} />
              <InputLabel title={"Telefone"} />
              {/* TODO: fazer um laço pra mostrar esses 4 inputs (nascimento, genero, altura, peso) */}
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: "flex-start" }}>
                <Text style={{ color: "white", marginBottom: 5, fontSize: 13 }}>Nascimento</Text>
                <Text style={{ color: "white", marginBottom: 5, marginLeft: 60, fontSize: 13 }}>Genero</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                <TouchableOpacity style={{ ...styles.TextInput, width: 130 }}>
                  <TextInput
                    style={styles.ValueInput}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={{ ...styles.TextInput, width: 130 }}>
                  <TextInput
                    style={styles.ValueInput}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: "flex-start" }}>
                <Text style={{ color: "white", marginBottom: 5, fontSize: 13 }}>Altura</Text>
                <Text style={{ color: "white", marginBottom: 5, marginLeft: 100, fontSize: 13 }}>Peso</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity style={{ ...styles.TextInput, width: 130 }}>
                  <TextInput
                    style={styles.ValueInput}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={{ ...styles.TextInput, width: 130 }}>
                  <TextInput
                    style={styles.ValueInput}
                  />
                </TouchableOpacity>
              </View>

              {/* TODO: fazer um laço pra mostrar esses 4 inputs (nascimento, genero, altura, peso) */}
              <View style={{ flex: 1, flexDirection: 'row', marginTop: 40 }}>
                <Text style={{ color: "white", marginRight: 60, fontSize: 13 }}>Tenho filhos</Text>
                <View>
                  <ToggleSwitch
                    size="small"
                    onColor="#483D8B"
                    offColor="#18142F"
                    isOn={this.state.filhos}
                    onToggle={filhos => {
                      this.setState({ filhos });
                      this.onToggle(filhos);
                    }}
                  />
                </View>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', marginTop: 40 }}>
                <Text style={{ color: "white", marginRight: 85, fontSize: 13 }}>Eu fumo</Text>
                <View>
                  <ToggleSwitch
                    size="small"
                    onColor="#483D8B"
                    offColor="#18142F"
                    isOn={this.state.fumo}
                    onToggle={fumo => {
                      this.setState({ fumo });
                      this.onToggle(fumo);
                    }}
                  />
                </View>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', marginTop: 40 }}>
                <Text style={{ color: "white", marginRight: 85, fontSize: 13 }}>Eu bebo</Text>
                <View>
                  <ToggleSwitch
                    size="small"
                    onColor="#483D8B"
                    offColor="#18142F"
                    isOn={this.state.bebo}
                    onToggle={bebo => {
                      this.setState({ bebo });
                      this.onToggle(bebo);
                    }}
                  />
                </View>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', marginTop: 40 }}>
                <Text style={{ color: "white", marginRight: 35, fontSize: 13 }}>Tenho tatuagem</Text>
                <View>
                  <ToggleSwitch
                    size="small"
                    onColor="#483D8B"
                    offColor="#18142F"
                    isOn={this.state.tatuagem}
                    onToggle={tatuagem => {
                      this.setState({ tatuagem });
                      this.onToggle(tatuagem);
                    }}
                  />
                </View>
              </View>
            </View>
          )}
        />
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
  ValueInput: {
    height: 45,
    color: 'white',
    fontSize: 15,
    paddingHorizontal: 20
  },
  toggle: {
    height: 50,
    width: 50
  }
});

export default AboutMe;
