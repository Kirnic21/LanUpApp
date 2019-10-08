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
import styles from './register.style'

const stylePage = {
  ...styles,
  icon: {
    left: '62%',
    top: '-18.2%',
    position: 'relative'
  }
}

class RegisterStageTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: 'visibility-off',
      password: true,
    };

    this.changeIcon = this.changeIcon.bind(this);
  }

  goLoginPicture = () => this.props.navigation.navigate('LoginProfilePicture')

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
        <View style={{
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

              <Text style={stylePage.textSubtitle}>Etapa 2/2
              </Text>
            </View>

            <View>
              <InputLabel
                style={styles.TextInput}
                title="E-mail"
                keyboardType="email-address"
              />
              <InputLabel
                style={styles.TextInput}
                title="Senha"
                secureTextEntry={this.state.password}
              />
              <Icon
                style={stylePage.icon}
                name={this.state.icon}
                size={25}
                color="#fff"
                onPress={() => this.changeIcon()}
              />
              <InputLabel
                style={styles.TextInput}
                title="Confirmar senha"
                secureTextEntry={this.state.password}
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
