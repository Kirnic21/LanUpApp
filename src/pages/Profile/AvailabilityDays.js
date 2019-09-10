import React, { Component } from "react";
import ArrowRight from "./../../assets/images/arrowRight.png";
import { FlatList } from "react-native-gesture-handler";
import ToggleSwitch from "toggle-switch-react-native";
import ImageAdd from './../../assets/images/icon_add.png';

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

export default class Availability extends Component {
  state = {
    selected: false,
    now: true
  };

  SelectedInput = () => {
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
        <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: "center", marginTop: '20%', marginLeft: '20%' }}>
          <Text style={{ fontSize: 20, color: 'white' }}>
            Segunda
          </Text>
          <View style={{ marginLeft: '60%' }}>
            <ToggleSwitch
              size="small"
              onColor="#483D8B"
              offColor="#18142F"
              isOn={this.state.now}
              onToggle={now => {
                this.setState({ now });
                this.onToggle(now);
              }}
            />
          </View>
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
        <FlatList
          contentContainerStyle={{ ...styles.list }}
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
