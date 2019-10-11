import React, { Component } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  StatusBar,
} from 'react-native';
import RoundButton from '~/shared/components/RoundButton';
import ImageBack from '~/assets/images/Grupo_518.png';
import InputLabel from '~/shared/components/InputLabel';
import styles from './register.style';

class RegisterStage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getInput = (event, nomedocampo) => {
    this.setState({ [nomedocampo]: event });
  };

  goRegister = () => {
    this.props.navigation.push('RegisterStageTwo', {
      fullName: this.state.fullName,
      nickname: this.state.nickname,
      cpf: this.state.cpf,
    });
  };

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
              onChangeText={event => this.getInput(event, 'fullName')}
              style={styles.TextInput}
              title="Nome Completo"
            />
            <InputLabel
              onChangeText={event => this.getInput(event, 'nickname')}
              style={[styles.TextInput, { borderColor: '#F13567' }]}
              title="Apelido"
            />
            <Text
              style={{
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
              onChangeText={event => this.getInput(event, 'cpf')}
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
