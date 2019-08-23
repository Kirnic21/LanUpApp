import React, { Component } from "react";
import ImageProfile from "./../../assets/images/backgroud.png";
import ArrowRight from "./../../assets/images/arrowRight.png";
import Box from '../../shared/components/Box';
import ImageBody from './../../assets/images/icon_addbody.png';
import ImageSelf from './../../assets/images/icon_addselfie.png';

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

class AboutMe extends Component {
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
              <View>
                <Text style={{ color: "white", marginBottom: 5 }}>Nome Completo</Text>
              </View>
              <View>
                <TouchableOpacity style={this.state.selected == false ? styles.TextInput : styles.TextInputSelected} onPress={this.SelectedInput}>
                  <TextInput
                    style={styles.ValueInput}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ paddingTop: 10 }}>
                <Text style={{ color: "white", marginBottom: 5 }}>Apelido</Text>
              </View>
              <View>
                <TouchableOpacity style={styles.TextInput}>
                  <TextInput
                    style={styles.ValueInput}
                  />
                </TouchableOpacity>
                <View style={{ paddingTop: 10 }}>
                  <Text style={{ color: "white", marginBottom: 5 }}>Descrição</Text>
                </View>
                <View>
                  <TouchableOpacity style={{ ...styles.TextInput, height: 100, borderRadius: 30 }}>
                    <TextInput
                      numberOfLines={10}
                      style={styles.ValueInput}
                    />
                  </TouchableOpacity>
                </View>
              </View>
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
              <Text style={{ color: 'white', fontSize: 15, marginBottom: 15 }}>
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
              <Text style={{ color: 'white', fontSize: 15, marginBottom: 5 }}>
                {item.title}
              </Text>
              <Text style={{ color: 'gray', fontSize: 13, marginBottom: 20 }}>
                {item.subtitle}
              </Text>
              <TouchableOpacity
                style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Box
                  icon={ImageSelf}
                  onClick={this.SelectedInput}
                />
                <Box icon={ImageSelf} />
                <Box icon={ImageBody} />
                <Box icon={ImageBody} />
              </TouchableOpacity>
            </View>
          )}
        />
        <FlatList
          contentContainerStyle={{...styles.list, marginBottom: 30}}
          data={[
            {
              title: 'Informações Privadas'
            }
          ]}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={{ color: 'white', fontSize: 15, marginBottom: 20 }}>
                {item.title}
              </Text>
              <View>
                <Text style={{ color: "white", marginBottom: 5 }}>E-mail</Text>
              </View>
              <View>
                <TouchableOpacity style={this.state.selected == false ? styles.TextInput : styles.TextInputSelected} onPress={this.SelectedInput}>
                  <TextInput
                    style={styles.ValueInput}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ paddingTop: 10 }}>
                <Text style={{ color: "white", marginBottom: 5 }}>Telefone</Text>
              </View>
              <View>
                <TouchableOpacity style={{...styles.TextInput, marginBottom: 10}}>
                  <TextInput
                    style={styles.ValueInput}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: "flex-start"}}>
                <Text style={{ color: "white", marginBottom: 5 }}>Nascimento</Text>
                  <Text style={{ color: "white", marginBottom: 5, marginLeft: 80}}>Genero</Text>
                </View>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                <TouchableOpacity style={{ ...styles.TextInput, width: 140 }}>
                  <TextInput
                    style={styles.ValueInput}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={{ ...styles.TextInput, width: 140 }}>
                  <TextInput
                    style={styles.ValueInput}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: "flex-start" }}>
                <Text style={{ color: "white", marginBottom: 5 }}>Altura</Text>
                  <Text style={{ color: "white", marginBottom: 5, marginLeft: 120}}>Peso</Text>
                </View>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity style={{ ...styles.TextInput, width: 140 }}>
                  <TextInput
                    style={styles.ValueInput}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={{ ...styles.TextInput, width: 140 }}>
                  <TextInput
                    style={styles.ValueInput}
                  />
                </TouchableOpacity>
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
  }
});

export default AboutMe;
