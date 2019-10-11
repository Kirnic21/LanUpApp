import React, { Component } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RoundButton from '~/shared/components/RoundButton';
import ImageBack from '~/assets/images/Grupo_518.png';
import InputLabel from '~/shared/components/InputLabel';
import styles from './register.style';

const stylePage = {
  ...styles,
  icon: {
    left: '62%',
    top: '-18.2%',
    position: 'relative',
  },
};

class RegisterStageTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: 'visibility-off',
      password: true,
    };

    this.changeIcon = this.changeIcon.bind(this);
  }

  componentDidMount() {
    const { fullName, nickname, cpf } = this.props.navigation.state.params;
    this.setState({ fullName });
    this.setState({ nickname });
    this.setState({ cpf });
  }

  getInput = (event, nomedocampo) => {
    this.setState({ [nomedocampo]: event });
  };

  goLoginPicture = () => {
    this.props.navigation.push('LoginProfilePicture', {
      fullName: this.state.fullName,
      nickname: this.state.nickname,
      cpf: this.state.cpf,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
    });
  };

  changeIcon() {
    this.setState(prevState => ({
      icon: prevState.icon === 'visibility' ? 'visibility-off' : 'visibility',
      password: !prevState.password,
    }));
  }

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
          }}
        >
          <View style={styles.registerContainer}>
            <View>
              <Text style={styles.textTitle}>
                Bem-vindo!{'\n'}
                Insira seus dados
              </Text>

              <Text style={stylePage.textSubtitle}>Etapa 2/2</Text>
            </View>

            <View>
              <InputLabel
                onChangeText={event => this.getInput(event, 'email')}
                style={styles.TextInput}
                title="E-mail"
                keyboardType="email-address"
              />
              <InputLabel
                onChangeText={event => this.getInput(event, 'password')}
                style={styles.TextInput}
                title="Senha"
                secureTextEntry
              />
              <Icon
                style={stylePage.icon}
                name={this.state.icon}
                size={25}
                color="#fff"
                onPress={() => this.changeIcon()}
              />
              <InputLabel
                onChangeText={event => this.getInput(event, 'confirmPassword')}
                style={styles.TextInput}
                title="Confirmar senha"
                secureTextEntry
              />
              <Icon
                style={stylePage.icon}
                name={this.state.icon}
                size={25}
                color="#fff"
                onPress={() => this.changeIcon()}
              />
            </View>

            <RoundButton
              style={[stylePage.Btn, stylePage.btnRegister]}
              name="Continuar"
              onPress={this.goLoginPicture}
            />
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default RegisterStageTwo;
