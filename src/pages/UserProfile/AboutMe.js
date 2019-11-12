import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
  TextInput,
  Picker
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import ToggleSwitch from "toggle-switch-react-native";
import ImageProfile from "../../assets/images/backgroud.png";
import Box from "~/shared/components/Box";
import ImageBody from "~/assets/images/icon_addbody.png";
import ImageSelf from "~/assets/images/icon_addselfie.png";
import InputLabel from "~/shared/components/InputLabel";

const BoxItem = [
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
];

class AboutMe extends Component {
  state = {
    selected: false,
    filhos: false,
    fumo: false,
    bebo: false,
    tatuagem: false,
    isOnDefaultToggleSwitch: true,
    genero: "Genero"
  };

  onToggle(isOn) {
    console.log(`Changed to ${isOn}`);
  }

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

  render() {
    return (
      <ScrollView>
        <View style={styles.Container}>
          <Image source={ImageProfile} style={styles.Image} />

          <FlatList
            contentContainerStyle={styles.list}
            data={[
              {
                key: "1",
                title: "Informações do Perfil"
              }
            ]}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text
                  style={{ color: "white", fontSize: 15, marginBottom: 20 }}
                >
                  {item.title}
                </Text>
                <InputLabel
                  style={{ width: 300, height: 55 }}
                  title="Nome Completo"
                />
                <InputLabel
                  style={{ width: 300, height: 55 }}
                  title="Apelido"
                />
                <InputLabel
                  style={{
                    width: 300,
                    height: 140,
                    borderRadius: 30,
                    textAlignVertical: "top"
                  }}
                  title="Descrição"
                  numberOfLines={10}
                  multiline
                />
                <InputLabel style={{ width: 145, height: 55 }} title="Altura" />
                <View style={{ left: "53%", top: "-12.5%" }}>
                  <InputLabel style={{ width: 145, height: 55 }} title="Peso" />
                </View>
                <View style={{ top: "-10%", marginBottom: "-15%" }}>
                  <View style={{ marginBottom: "10%" }}>
                    <ToggleSwitch
                      onColor="#483D8B"
                      offColor="#18142F"
                      isOn={this.state.filhos}
                      label="Tenho filhos"
                      labelStyle={{
                        color: "#FFF",
                        marginRight: "50%",
                        fontSize: 16
                      }}
                      size="small"
                      onToggle={filhos => {
                        this.setState({ filhos });
                        this.onToggle(filhos);
                      }}
                    />
                  </View>
                  <View style={{ marginBottom: "10%" }}>
                    <ToggleSwitch
                      onColor="#483D8B"
                      offColor="#18142F"
                      label="Eu fumo"
                      isOn={this.state.fumo}
                      labelStyle={{
                        color: "#FFF",
                        marginRight: "59%",
                        fontSize: 16
                      }}
                      size="small"
                      onToggle={fumo => {
                        this.setState({ fumo });
                        this.onToggle(fumo);
                      }}
                    />
                  </View>
                  <View style={{ marginBottom: "10%" }}>
                    <ToggleSwitch
                      isOn={this.state.bebo}
                      onColor="#483D8B"
                      offColor="#18142F"
                      label="Eu bebo"
                      labelStyle={{
                        color: "#FFF",
                        marginRight: "59%",
                        fontSize: 16
                      }}
                      size="small"
                      onToggle={bebo => {
                        this.setState({ bebo });
                        this.onToggle(bebo);
                      }}
                    />
                  </View>
                  <View>
                    <ToggleSwitch
                      isOn={this.state.tatuagem}
                      onColor="#483D8B"
                      offColor="#18142F"
                      label="Tenho tatuagem"
                      labelStyle={{
                        color: "#FFF",
                        marginRight: "40%",
                        fontSize: 16
                      }}
                      size="small"
                      onToggle={tatuagem => {
                        this.setState({ tatuagem });
                        this.onToggle(tatuagem);
                      }}
                    />
                  </View>
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
                title: "Localização"
              }
            ]}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text
                  style={{ color: "white", fontSize: 15, marginBottom: 15 }}
                >
                  {item.title}
                </Text>
                <View>
                  <TouchableOpacity
                    style={
                      this.state.selected === false
                        ? styles.TextInput
                        : styles.TextInputSelected
                    }
                    onPress={this.SelectedInput}
                  >
                    <TextInput style={styles.ValueInput} />
                  </TouchableOpacity>
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
                title: "Fotos de apresentação",
                subtitle: "2 de perfil(sozinho) e 2 de corpo inteiro"
              }
            ]}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={{ color: "white", fontSize: 15, marginBottom: 5 }}>
                  {item.title}
                </Text>
                <Text style={{ color: "gray", fontSize: 12, marginBottom: 20 }}>
                  {item.subtitle}
                </Text>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}
                >
                  {BoxItem.map(item => (
                    <Box icon={item.icon} onPress={item.onPress} />
                  ))}
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={item => item.key}
          />
          <FlatList
            contentContainerStyle={{ ...styles.list, marginBottom: 40 }}
            data={[
              {
                key: "1",
                title: "Informações Privadas"
              }
            ]}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text
                  style={{ color: "white", fontSize: 15, marginBottom: "5%" }}
                >
                  {item.title}
                </Text>
                <InputLabel
                  style={{ width: 300 }}
                  title="E-mail"
                  keyboardType="email-address"
                />
                <InputLabel
                  style={{ width: 300 }}
                  title="Telefone"
                  keyboardType="numeric"
                />
                <InputLabel
                  style={{ width: 300 }}
                  title="CPF"
                  keyboardType="numbers-and-punctuation"
                />
                <InputLabel
                  style={{ width: 150 }}
                  title="Nascimento"
                  keyboardType="numbers-and-punctuation"
                />
                <View
                  style={{
                    borderColor: "#FFF",
                    borderWidth: 2,
                    width: 150,
                    borderRadius: 300,
                    height: 48,
                    left: "51%",
                    top: "-15%"
                  }}
                >
                  <Text style={{ color: "#FFF", fontSize: 15, top: "-50%" }}>
                    Genero
                  </Text>
                  <Picker
                    mode="dropdown"
                    supportedOrientations={["portrait", "landscape"]}
                    style={{ width: 150, color: "#fff", top: "-55%" }}
                    selectedValue={this.state.genero}
                    onValueChange={gen => this.setState({ genero: gen })}
                  >
                    <Picker.Item label="Masculino" value="M" />
                    <Picker.Item label="Feminino" value="F" />
                  </Picker>
                </View>
              </View>
            )}
            keyExtractor={item => item.key}
          />
        </View>
      </ScrollView>
    );
  }
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  Container: {
    alignItems: "center",
    width,
    flex: 1,
    backgroundColor: "#18142F"
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
  list: {
    marginTop: 20,
    backgroundColor: "#24203B",
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
    color: "white",
    fontSize: 15,
    paddingHorizontal: 20
  }
});

export default AboutMe;
