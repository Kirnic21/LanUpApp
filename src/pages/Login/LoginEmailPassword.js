import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Dimensions,
  Image,
  StatusBar,
  KeyboardAvoidingView,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import RoundButton from '~/shared/components/RoundButton';
import ImageBack from '../../assets/images/Grupo_518.png';
import Logo from '../../assets/images/logo_lanup.png';


class LoginEmailPassword extends Component {
  goToLoginEmailPassword = () => this.props.navigation.navigate('LoginPerfil')

  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} enabled behavior="padding">
        <ImageBackground
          source={ImageBack}
          style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height + 100,
            flex: 1,
          }}
        >
          <StatusBar translucent backgroundColor="transparent" />
          <View style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          >
            <View style={{
              width: Dimensions.get('window').width - 90,
              height: Dimensions.get('window').height - 410,
              justifyContent: 'flex-end',
            // alignItems: 'center',
            }}
            >

              <View style={{ alignItems: 'center', top: '-10%' }}>
                <Image
                  source={Logo}
                  style={{
                    width: Dimensions.get('window').width - 150,
                    height: Dimensions.get('window').height - 700,
                  }}
                />
              </View>
            </View>
            <View style={{
              width: Dimensions.get('window').width - 100,
              height: Dimensions.get('window').height - 470,
            }}
            >
              <KeyboardAvoidingView behavior="padding">
                <View>
                  <Text>E-mail</Text>
                  <TextInput />
                </View>

                <Text>E-mail</Text>
                <TextInput style={{ backgroundColor: '#FFF' }} />

              </KeyboardAvoidingView>
            </View>
            <View style={{
              width: Dimensions.get('window').width - 100,
              height: 50,
            }}
            >
              <Text style={{ color: '#FFF', textAlign: 'center', fontSize: 16 }}>
            Já tem uma conta?  <Text onPress={this.goToLoginEmailPassword} style={{ color: '#483D8B', textDecorationLine: 'underline' }}>Entrar</Text>
              </Text>
            </View>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  btnFacebook: {
    backgroundColor: '#141364',
  },
  btnRegister: {
    backgroundColor: '#06a2cd',
  },
  Btn: {
    width: Dimensions.get('window').width - 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 1.5,
    borderRadius: 50,
    height: 55,
  },
});

export default LoginEmailPassword;
