import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Dimensions,
  Image,
  StatusBar,
} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import Geolocation from '@react-native-community/geolocation';
import RoundButton from '~/shared/components/RoundButton';
import ImageBack from '../../assets/images/Grupo_518.png';
import Logo from '../../assets/images/logoLanUp.png';

// BackgroundTimer.runBackgroundTimer(() => {
//   Geolocation.getCurrentPosition((position) => {
//     console.log(new Date(), position);
//   });
// }, 30000);

class LoginPage extends Component {
  componentDidMount() {}

  goToLoginEmail = () => this.props.navigation.navigate('LoginEmail');

  goRegister = () => this.props.navigation.navigate('RegisterStageOne');

  render() {
    return (
      <ImageBackground
        source={ImageBack}
        style={{
          width: Dimensions.get('window').width,
          // height: Dimensions.get('window').height,
          flex: 1,
        }}
      >
        <StatusBar translucent backgroundColor="transparent" />
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View
            style={{
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
                  width: Dimensions.get('window').width - 145,
                  height: Dimensions.get('window').height - 700,
                }}
              />
            </View>

            <Text
              style={{
                // textAlign: 'center',
                color: '#FFF',
                fontSize: 28,
                fontWeight: '700',
              }}
            >
              Sua primeira vez aqui?
            </Text>
            <Text
              style={{
                // textAlign: 'center',s
                color: '#FFF',
                fontSize: 20,
                letterSpacing: 0.6,
                fontWeight: '700',
              }}
            >
              Cadastre-se com o seu e-mail
            </Text>
          </View>
          <View
            style={{
              width: Dimensions.get('window').width - 100,
              height: Dimensions.get('window').height - 470,
            }}
          >
            <RoundButton
              style={[styles.Btn, styles.btnRegister]}
              name="Cadastrar"
              onPress={this.goRegister}
            />
            <Text
              style={{
                color: '#FFF',
                textAlign: 'center',
                fontSize: 15,
              }}
            >
              ou
            </Text>
            <RoundButton
              style={[styles.Btn, styles.btnFacebook]}
              name="Entrar com Facebook"
              onPress={this.goToLoginEmailPassword}
            />
          </View>
          <View
            style={{
              width: Dimensions.get('window').width - 100,
              height: 50,
            }}
          >
            <Text style={{ color: '#FFF', textAlign: 'center', fontSize: 16 }}>
              Já tem uma conta?{' '}
              <Text
                onPress={this.goToLoginEmail}
                style={{ color: '#483D8B', textDecorationLine: 'underline' }}
              >
                Entrar
              </Text>
            </Text>
          </View>
        </View>
      </ImageBackground>
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

export default LoginPage;
