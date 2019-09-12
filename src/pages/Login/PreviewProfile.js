import React, { Component } from "react";
import Circle from "../../assets/images/circulo.png";
import Girl from "../../assets/images/girlFest.jpg";
import { FlatList } from "react-native-gesture-handler";

import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  ImageBackground,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput
} from "react-native";

class PreviewProfile extends Component {
  state = {
    selected: false
  }

  SelectedInput = () => {
    if (event.selected) {
    }
  };

  render() {
    return (
      <View>
        <ScrollView>
          <ImageBackground
            source={Girl}
            style={styles.ImageBackgroundContainer}
          >
            <View style={{ flexDirection: "row-reverse" }}>
              <ImageBackground style={{ height: 380, width: 380, marginLeft: 100, marginTop: 150 }} source={Circle}>
                <View style={{ marginLeft: 230, marginTop: 40 }}>
                  <Text style={{ color: "white", fontSize: 30 }}>Milor</Text>
                  <Text style={{ color: '#8979F3', fontSize: 15, marginLeft: -75 }}>Dj, Animador de festa</Text>
                  <Text style={{ color: 'white', fontSize: 20, marginLeft: -50, marginTop: 50 }}>12 Trabalhos</Text>
                  <Text style={{ color: 'white', fontSize: 20, marginLeft: -58 }}>12 Avaliações</Text>
                  <Text style={{ color: 'white', fontSize: 20, marginLeft: -110 }}>12 Recomendações</Text>
                </View>
              </ImageBackground>
            </View>
          </ImageBackground>
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
        </ScrollView>
      </View >
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
  ImageBackgroundContainer: {
    alignItems: "center",
    width: "100%",
    height: "100%"
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
  TextInputSelected: {
    borderColor: "#F13567",
    borderWidth: 1.8,
    borderRadius: 50,
    height: 60
  },
  TextInput: {
    borderColor: "white",
    borderWidth: 1.5,
    borderRadius: 50
  }
});

export default PreviewProfile;
