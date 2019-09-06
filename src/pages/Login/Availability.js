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
  ScrollView
} from "react-native";

export default class Availability extends Component {
  state = {
    selected: false,
    now: false
  };

  SelectedInput = () => {
    if (event.selected) {
    }
  };

  onToggle(isOn) {
    console.log("Changed to " + isOn);
  }

  openAvailabilityDays = () => {
    this.props.navigation.navigate('AvailabilityDays')
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
        <FlatList
          contentContainerStyle={{ ...styles.list, marginTop: '20%' }}
          data={[
            {
              title: 'Emergência',
              subtitle: 'Estou disponivel agora'
            }
          ]}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={{ color: 'white', fontSize: 15, marginBottom: 5 }}>
                {item.title}
              </Text>
              <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: "center", marginTop: 5 }}>
                <Text style={{ color: 'white', fontSize: 13, borderBottomWidth: 0, borderTopWidth: 0 }}>
                  {item.subtitle}
                </Text>
                <View>
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
            </View>
          )}
        />
        <FlatList
          contentContainerStyle={{ ...styles.list }}
          data={[
            {
              header: 'Horários',
              title: 'Segunda',
              date: '18:00 até 21:00',
              onPress: () => this.openAvailabilityDays()
            },
            {
              title: 'Terça',
              date: 'Não aceito job',
              onPress: () => this.openAvailabilityDays()
            },
            {
              title: 'Quarta',
              date: 'Não aceito job',
              onPress: () => this.openAvailabilityDays()
            },
            {
              title: 'Quinta',
              date: '18:00 até 21:00',
              onPress: () => this.openAvailabilityDays()
            },
            {
              title: 'Sexta',
              date: '18:00 até 21:00',
              onPress: () => this.openAvailabilityDays()
            },
            {
              title: 'Sabado',
              date: 'Não aceito job',
              onPress: () => this.openAvailabilityDays()
            },
            {
              title: 'Domingo',
              date: '18:00 até 21:00',
              onPress: () => this.openAvailabilityDays()
            }
          ]}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={item.onPress}>
              <View style={{ ...styles.item, flexDirection: 'row', justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ color: 'white', fontSize: 13 }}>
                  {item.title}
                </Text>
                <Text style={{ color: 'white', fontSize: 10, marginLeft: 90 }}>
                  {item.date}
                </Text>
                <Image source={ArrowRight} style={{ width: 15, height: 15 }} />
              </View>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={this.renderSeparator}
        />
        <FlatList
          contentContainerStyle={styles.list}
          data={[
            {
              title: 'Horários especiais',
              subtitle: '16 de Dez, 2019',
              date: '18:00 até 21:00'
            }
          ]}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={{ color: 'white', fontSize: 15, marginBottom: 5 }}>
                {item.title}
              </Text>
              <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
                <Text style={{ color: 'white', fontSize: 13 }}>
                  {item.subtitle}
                </Text>
                <Text style={{ color: 'white', fontSize: 10, marginLeft: 50 }}>
                  {item.date}
                </Text>
                <Image source={ArrowRight} style={{ width: 15, height: 15 }} />
              </View>
            </View>
          )}
        />
        <FlatList
          contentContainerStyle={{ ...styles.list, marginBottom: 30 }}
          data={
            [
              {
                title: 'Adicionar Horários especiais'
              }
            ]}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <View style={{ ...styles.Add, flexDirection: "row" }}>
                <Image source={ImageAdd} style={{ height: 20, width: 20, marginRight: 10, marginTop: 5 }} />
                <Text style={{ color: '#865FC0', fontSize: 15, marginBottom: 15, marginTop: 5 }}>
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          )}
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
    backgroundColor: "#18142F"
  },
  TextInput: {
    borderColor: "white",
    borderWidth: 1.8,
    borderRadius: 55,
    width: 110,
    height: 110
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
  }
});
