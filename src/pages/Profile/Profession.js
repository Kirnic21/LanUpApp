import React, { Component } from "react";
import ImageAdd from '../../assets/images/icon_add.png'

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

class Profession extends Component {
  static navigationOptions = {
    title: 'Profissão'
  };

  state = {
    selected: false
  };

  SelectedInput = () => {
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
        <FlatList
          style={{ marginTop: '20%' }}
          contentContainerStyle={styles.list}
          data={[
            {
              title: 'Profissão',
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

        <FlatList
          contentContainerStyle={styles.list}
          data={[
            {
              title: 'Adicionar Profissão'
            }
          ]}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <View style={{ ...styles.Add, flexDirection: "row" }}>
                <Image source={ImageAdd} style={{ height: 20, width: 20, marginRight: 10, marginTop: 5 }} />
                <Text style={{ color: '#865FC0', fontSize: 13, marginBottom: 15, marginTop: 5 }}>
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          )
          }
        />

        < FlatList
          contentContainerStyle={styles.list}
          data={
            [
              {
                title: 'Habilidades'
              }
            ]}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={{ color: 'white', fontSize: 15, marginBottom: 5 }}>
                {item.title}
                <Text style={{ color: '#737082', fontSize: 10 }}>
                  {item.subtitle}
                </Text>
              </Text>
              <View style={{ flexDirection: "row", maxWidth: 400, margin: 0, flexWrap: "wrap" }}>
                <View>
                  <Text style={{ ...styles.TextBorder, backgroundColor: '#737082', color: '#FFB72B', width: 120, fontSize: 13 }}>Musica Eletrônica</Text>
                </View>
                <View>
                  <Text style={{ ...styles.TextBorder, backgroundColor: '#737082', color: '#18142F', width: 120, fontSize: 13 }}>Pop Internácional</Text>
                </View>
                <View>
                  <Text style={{ ...styles.TextBorder, backgroundColor: '#737082', color: '#F2C8DC', width: 50, fontSize: 13 }}>Forrô</Text>
                </View>
                <View>
                  <Text style={{ ...styles.TextBorder, backgroundColor: '#737082', color: '#C70047', width: 80, fontSize: 13 }}>Carismático</Text>
                </View>
                <View>
                  <Text style={{ ...styles.TextBorder, backgroundColor: '#737082', color: '#0008A4', width: 100, fontSize: 13 }}>Pop Nácional</Text>
                </View>
                <View>
                </View>
              </View>
            </View>
          )
          }
        />

        <FlatList
          contentContainerStyle={{ ...styles.list, marginBottom: 30 }}
          data={
            [
              {
                title: 'Adicionar Habilidades'
              }
            ]}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <View style={{ ...styles.Add, flexDirection: "row" }}>
                <Image source={ImageAdd} style={{ height: 20, width: 20, marginRight: 10, marginTop: 5 }} />
                <Text style={{ color: '#865FC0', fontSize: 13, marginBottom: 15, marginTop: 5 }}>
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </ScrollView >
    );
  }
}

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  Container: {
    alignItems: "center",
    width: width,
    height: height,
    backgroundColor: "#18142F"
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
  Add: {
    paddingTop: 10,
    paddingBottom: 10,
    color: '#46C5F3',
    padding: 20,
    backgroundColor: '#24203B',
    borderRadius: 10,
    fontSize: 15,
    width: width - 50
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
  }
});

export default Profession;
