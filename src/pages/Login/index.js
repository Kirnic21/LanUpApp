import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Text
} from "react-native";
import CoreTemplate from "../../shared/components/CoreTemplate"


class LoginPage extends Component {

  goToLoginEmailPassword = () => this.props.navigation.navigate('LoginEmailPassword')

  render() {
    return (
      <CoreTemplate>
        <View style={styles.buttonContent}>
          {/* TODO: componentizar botão - todos botões tem botão arredondada */}
          <TouchableOpacity style={styles.buttonFacebook}>
            <Text style={{ color: 'white', fontSize: 13 }}>Conectar com facebook </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', margin: 10 }}>
          <Text style={{ color: 'white' }}>ou</Text>
        </View>
        <View style={styles.buttonContent}>
          {/* TODO: componentizar botão - todos botões tem botão arredondada */}
          <TouchableOpacity style={styles.buttonEmail} onPress={this.goToLoginEmailPassword}>
            <Text style={{ color: 'white', fontSize: 13 }}>Conectar com e-mail </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', margin: 50 }}>
          <View>
            <Text style={{
              color: 'white', marginRight: 10, marginTop: 50, fontSize: 13
            }}>Já tem uma conta?</Text>
          </View>
          <View>
            <Text
              style={{ color: '#6A5ACD', marginTop: 50 }}
              onPress={() => Linking.openURL('#')}
            >
              Entrar
            </Text>
          </View>
        </View>
      </CoreTemplate>
    );
  }
}

const styles = StyleSheet.create({
  buttonContent: {
    flexDirection: 'row',
    width: 250,
    margin: 20,
  },
  buttonFacebook: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#141364',
    borderColor: 'white',
    borderWidth: 1.5,
    borderRadius: 50,
    height: 55,
  },
  buttonEmail: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 1.5,
    borderRadius: 50,
    height: 55,
  },
});

export default LoginPage;
