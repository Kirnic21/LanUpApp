import React, { Component } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  StatusBar,
} from 'react-native';
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form';

import RoundButton from '~/shared/components/RoundButton';
import ImageBack from '~/assets/images/Grupo_518.png';
import InputLabel from '~/shared/components/InputLabel';

import styles from './register.style';
import FormValidator from '~/shared/services/validator';


const formRules = FormValidator.make({
  fullName: 'required|email',
  nickname: 'required',
  cpf: 'required'
}, {
  email: 'Adicione um e-mail válido',
})

class RegisterStage extends Component {
  state = {
    user: {
      isFacebook: false,
      authenticateUser: {}
    }
  }
  constructor(props) {
    super(props);
    const user = props.navigation.getParam('user');
    this.state = { user };
  }

  getInput = (event, nomedocampo) => {
    this.setState({ [nomedocampo]: event });
  };

  goRegister = () => {
    const { fullName, nickname, cpf, user } = this.state;

    if (user.isFacebook) {
      this.props.navigation.navigate('LoginPerfil', { user });
      return;
    }

    this.props.navigation.push('RegisterStageTwo', {
      fullName,
      nickname,
      cpf,
    });
  };

  render() {
    const { user } = this.state;
    const { handleSubmit } = this.props;
    debugger
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
            {!user.isFacebook && <Text style={styles.textSubtitle}>Etapa 1/2</Text>}
          </View>

          <View>
            <Field
              name={'fullName'}
              inputStyle={styles.TextInput}
              title="Nome Completo"
              component={InputLabel}
            />
            <InputLabel
              onChangeText={event => this.getInput(event, 'nickname')}
              style={[styles.TextInput, { borderColor: '#F13567' }]}
              value={user.authenticateUser.name}
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
const selector = formValueSelector('ItineraryForm')

RegisterStage = reduxForm({
  form: 'RegisterStage',
  validate: formRules,
  enableReinitialize: true
})(RegisterStage);

RegisterStage = connect(state => {
  debugger
  return {
    initialValues: state.user,
    startAt: selector(state, 'fullName'),
  }
})(RegisterStage)

export default RegisterStage;
