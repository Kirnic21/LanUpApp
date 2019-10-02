import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';
import InputLabel from '../../shared/components/InputLabel';
import CoreTemplate from '../../shared/components/CoreTemplate';

class LoginNickName extends Component {
  state = {
    selected: false,
  }


  // SelectedInput = () => {
  //   if (event.selected) {

  //   }
  // }

  goToLoginProfilePicture = () => this.props.navigation.navigate('LoginProfilePicture')

  render() {
    return (
      <CoreTemplate>
        <View style={{ paddingHorizontal: 50 }}>
          <InputLabel title="Nome Completo" />
          {/* <InputLabel title={'Apelido'} /> */}
          <View style={{ paddingTop: 10 }}>
            <Text style={{ color: 'white', fontSize: 13 }}>Apelido</Text>
          </View>
          <View>
            <TouchableOpacity style={styles.TextInputSelected}>
              <TextInput
                style={{
                  height: 45, color: 'white', fontSize: 18, paddingHorizontal: 20,
                }}
                value="Millor"
              />
            </TouchableOpacity>
          </View>

          {/* TODO: mostrar essa mensagem dentro do componente de input  */}
          <View style={{ paddingHorizontal: 20 }}>
            <Text style={{ color: '#F13567', fontSize: 10, margin: 5 }}>Este Apelido já existe</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity style={styles.button} onPress={this.goToLoginProfilePicture}>
              <Text style={{ color: 'white' }}>Continuar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </CoreTemplate>
    );
  }
}

const styles = StyleSheet.create({
  TextInputSelected: {
    borderColor: '#F13567',
    borderWidth: 1.8,
    borderRadius: 50,
    height: 45,
    width: 250,
  },
  button: {
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#483D8B',
    borderColor: '#483D8B',
    borderWidth: 1.5,
    borderRadius: 50,
    height: 50,
    width: 150,
  },
});

export default LoginNickName;
