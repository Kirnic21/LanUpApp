import React, { Component } from 'react';

import {
  StyleSheet,
  Dimensions,
  ScrollView,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  FlatList
} from 'react-native';

export default class ToExplore extends Component {
  static navigationOptions = (props) => ({
    title: 'Explorar'
  });
  render() {
    return (
      <ScrollView contentContainerStyle={styles.Container}>
        <View style={styles.circle}>
          <TextInput style={styles.item}>
            Explorar
        </TextInput>
          <TextInput style={styles.item}>
            Candidatados
        </TextInput>
        </View>
        <View style={{ flexDirection: "row", width: 300, margin: 5, flexWrap: "wrap" }}>
          <View>
            <Text style={{ ...styles.TextBorder, backgroundColor: '#FFB72B', width: 90, fontSize: 13 }}>Bartender</Text>
          </View>
          <View>
            <Text style={{ ...styles.TextBorder, backgroundColor: '#24203B', width: 40, fontSize: 13 }}>Dj</Text>
          </View>
          <View>
            <Text style={{ ...styles.TextBorder, backgroundColor: '#24203B', width: 150, fontSize: 13 }}>Animador de festa</Text>
          </View>
        </View>
        <FlatList
          contentContainerStyle={styles.list}
          data={[
            {

            }
          ]}
          renderItem={({ item }) => (
            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: "center" }}>
              <View>
                <Text style={{ color: 'white', fontSize: 13, marginBottom: 5 }}>
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
        <FlatList
          contentContainerStyle={styles.list}
          data={[
            {

            }
          ]}
          renderItem={({ item }) => (
            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: "center" }}>
              <View>
                <Text style={{ color: 'white', fontSize: 13, marginBottom: 5 }}>
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
        <FlatList
          contentContainerStyle={styles.list}
          data={[
            {

            }
          ]}
          renderItem={({ item }) => (
            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: "center" }}>
              <View>
                <Text style={{ color: 'white', fontSize: 13, marginBottom: 5 }}>
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

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  Container: {
    alignItems: 'center',
    width,
    backgroundColor: '#18142F',
  },
  circle: {
    marginTop: 20,
    backgroundColor: '#0D0B19',
    borderRadius: 40,
    fontSize: 15,
    width: '90%',
    height: 60,
    flexDirection: 'row',
    justifyContent: "space-between",
  },
  item: {
    color: '#fff',
    padding: 10,
    fontSize: 15
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
  list: {
    marginTop: 20,
    backgroundColor: '#24203B',
    width: width - 50,
    height: 200,
    borderRadius: 20
  }
});
