import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Dimensions,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ImageBack from '../../assets/images/Grupo_518.png';
import Logo from '../../assets/images/logoLanUp.png';
import InputLabel from '../../shared/components/InputLabel';


class LoginEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: 'visibility-off',
      password: true,
    };

    this.changeIcon = this.changeIcon.bind(this);
  }


  goToLoginPerfil = () => this.props.navigation.navigate('LoginPerfil')

  changeIcon() {
    this.setState(prevState => ({
      icon: prevState.icon === 'visibility' ? 'visibility-off' : 'visibility',
      password: !prevState.password,
    }));
  }


  render() {
    const { width, height } = Dimensions.get('window');
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} enabled behavior="height">
        <ImageBackground
          source={ImageBack}
          style={{ width, height: height + 80, flex: 1 }}
        >
          <View style={styles.Container}>

            <View style={styles.ContainerLogo}>
              <Image
                source={Logo}
                style={{ width: width - 120, height: height - 700 }}
              />
            </View>

            <View style={styles.ContainerForm}>

              <View style={{ paddingVertical: 100, alignItems: 'center' }}>

                <InputLabel
                  style={{ width: 290, height: 50 }}
                  title="E-mail"
                  keyboardType="email-address"
                />


                <InputLabel
                  style={{ width: 290, height: 50 }}
                  title="Senha"
                  secureTextEntry={this.state.password}
                />

                <Icon
                  style={styles.icon}
                  name={this.state.icon}
                  size={25}
                  color="#fff"
                  onPress={() => this.changeIcon()}
                />
                <TouchableOpacity
                  style={styles.Btn}
                  onPress={this.goToLoginPerfil}
                >
                  <Text style={styles.textBtn}>Entrar</Text>
                </TouchableOpacity>
              </View>

            </View>
            <View style={{ width: width - 100, height: 50 }}>
              <Text style={styles.textForgot}>Esqueci minha senha
              </Text>
            </View>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ContainerLogo: {
    width: Dimensions.get('window').width - 90,
    height: Dimensions.get('window').height - 500,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  ContainerForm: {
    width: Dimensions.get('window').width - 100,
    height: Dimensions.get('window').height - 250,
    alignItems: 'center',
  },
  Btn: {
    backgroundColor: '#7541bf',
    width: Dimensions.get('window').width - 200,
    height: Dimensions.get('window').height - 720,
    borderRadius: 60,
    justifyContent: 'center',
  },
  textBtn: {
    color: '#FFF',
    fontSize: 15,
    textAlign: 'center',
  },
  textForgot: {
    color: '#483D8B',
    textDecorationLine: 'underline',
    textAlign: 'center',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  icon: {
    left: '40%',
    top: '-21%',
  },
});

export default LoginEmail;
