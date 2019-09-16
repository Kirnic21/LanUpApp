import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  Alert
} from "react-native";
import CoreTemplate from "~/shared/components/CoreTemplate";

class DetailNextEvent extends Component {
  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    return (
      <CoreTemplate name="Kaori">
        <View style={styles.border}>
          <TouchableOpacity onPress={() => { this.setModalVisible(true) }}
            style={{ alignItems: "center", margin: 5 }}>
            <Text style={styles.circle}>Ocorrência</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View style={{ marginTop: 22 }}>
              <View style={styles.modalView}>
                <TouchableHighlight
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}>
                  <Text style={{ color: 'white' }}>Fechar</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
        </View>
      </CoreTemplate >
    );
  }
}

const styles = StyleSheet.create({
  circle: {
    borderWidth: 8,
    borderColor: '#352F4D',
    borderRadius: 80,
    width: 150,
    height: 150,
    backgroundColor: '#FFB72B',
    color: 'white',
    padding: 30
  },
  border: {
    borderWidth: 25,
    borderRadius: 150,
    width: 280,
    height: 280,
    backgroundColor: 'transparent',
    padding: 32,
    paddingHorizontal: 50,
    borderColor: '#352F4D'
  },
  modalView: {
    backgroundColor: "#000",
    height: 150,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default DetailNextEvent;
