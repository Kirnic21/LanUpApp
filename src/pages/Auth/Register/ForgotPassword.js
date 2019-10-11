import React, { Component } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  StatusBar,
  Image,
} from 'react-native';
import RoundButton from '~/shared/components/RoundButton';
import ImageBack from '~/assets/images/Grupo_518.png';
import InputLabel from '~/shared/components/InputLabel';
import styles from './register.style';
import Logo from '../../../assets/images/logoLanUp.png';

const stylePage = {
  ...styles,
  icon: {
    left: '62%',
    top: '-18.2%',
    position: 'relative',
  },
};

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: true,
    };
  }

  goLoginPerfil = () => this.props.navigation.navigate('LoginPerfil')

  render() {
    return (
      <ImageBackground
        source={ImageBack}
        style={{
          width: Dimensions.get('window').width,
          flex: 1,
        }}
      >
        <StatusBar translucent backgroundColor="transparent" />
        <View style={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
        }}
        >
          <View style={styles.registerContainer}>
            <View style={{
              flex: 0.8,
              width: Dimensions.get('window').width - 100,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
            >
              <View style={[styles.ContainerLogo, { top: '-15%' }]}>
                <Image
                  source={Logo}
                  style={{
                    width: Dimensions.get('window').width - 120,
                    height: Dimensions.get('window').height - 710,
                  }}
                />
              </View>
              <View style={{ top: '-10%' }}>
                <Text style={[styles.textTitle, {
                  textAlign: 'center',
                  lineHeight: 45,
                  fontSize: 27,
                }]}
                >
                Você está alterando{'\n'}
                sua senha
                </Text>
              </View>
            </View>

            <View style={{ flex: 1.2 }}>
              <InputLabel
                style={styles.TextInput}
                title="Senha Atual"
                secureTextEntry
              />
              <InputLabel
                style={styles.TextInput}
                title="Nova Senha"
                secureTextEntry
              />
              <InputLabel
                style={styles.TextInput}
                title="Confirmar sua Nova senha"
                secureTextEntry
              />
              <RoundButton
                style={[stylePage.Btn, stylePage.btnRegister, { width: 200 }]}
                name="Salvar"
                onPress={this.goLoginPerfil}
              />
            </View>


          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default ForgotPassword;
