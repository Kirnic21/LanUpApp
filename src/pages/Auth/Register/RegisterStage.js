import React, { Component } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  StatusBar
} from 'react-native';
import RoundButton from '~/shared/components/RoundButton';
import ImageBack from '~/assets/images/Grupo_518.png';
import InputLabel from '~/shared/components/InputLabel';
import styles from './register.style'


class RegisterStage extends Component {
  goRegister = () => this.props.navigation.push('RegisterStageTwo')

  render() {
    return (
      <ImageBackground
        source={ImageBack}
        style={{
          width: Dimensions.get('window').width,
          flex: 1
        }}
      >
        <StatusBar translucent backgroundColor="transparent" />
        <View style={styles.registerContainer}>
          <View>
            <Text style={styles.textTitle}>
              Bem-vindo!{'\n'}
              Insira seus dados
              </Text>
            <Text style={styles.textSubtitle}>Etapa 1/2</Text>
          </View>

          <View>
            <InputLabel
              style={styles.TextInput}
              title="Nome Completo"
            />
            <InputLabel
              style={[styles.TextInput, { borderColor: '#F13567' }]}
              title="Apelido"
            />
            <Text style={{
              color: '#F13567',
              fontSize: 12,
              left: '10%',
              top: '-5%',
              marginBottom: '-3%',
            }}
            >
              Este apelido já existe
              </Text>
            <InputLabel
              style={styles.TextInput}
              title="CPF"
            />
          </View>
          
          <RoundButton
            style={[styles.Btn, styles.btnRegister]}
            name="Continuar"
            onPress={this.goRegister}
          />

        </View>
      </ImageBackground>
    );
  }
}

export default RegisterStage;
