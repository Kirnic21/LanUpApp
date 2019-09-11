import React, { Component } from "react";
import { FlatList } from "react-native-gesture-handler";
import ToggleSwitch from "toggle-switch-react-native";
import ButtonAdd from "../../shared/components/ButtonAdd";

import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
  TextInput
} from "react-native";

export default class SpecialHours extends Component {
  state = {
    selected: false
  };

  SelectedInput = () => {
    if (event.selected) {
    }
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.Container}>
        <View style={{ marginTop: '20%', marginRight: '40%' }}>
          <Text style={{ fontSize: 20, color: 'white' }}>
            16 de Dez, 2019
          </Text>
        </View>
        <FlatList
          contentContainerStyle={{ ...styles.list }}
          data={[
            {
              title: 'Horas'
            }
          ]}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={{ color: 'white', fontSize: 15, marginBottom: 5 }}>
                {item.title}
              </Text>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: "flex-start" }}>
                <Text style={{ color: "white", marginBottom: 5, fontSize: 13 }}>Das</Text>
                <Text style={{ color: "white", marginBottom: 5, marginLeft: '45%', fontSize: 13 }}>Até</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                <TouchableOpacity style={{ ...styles.TextInput, width: 130, height: 40 }}>
                  <TextInput
                    style={styles.ValueInput}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={{ ...styles.TextInput, width: 130, height: 40 }}>
                  <TextInput
                    style={styles.ValueInput}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
        <ButtonAdd value={"Adicionar Horários"} />
      </ScrollView>
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
  item: {
    padding: 15
  },
  TextInput: {
    borderColor: "white",
    borderWidth: 1.5,
    borderRadius: 50
  }
});
