import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Dimensions,
  StatusBar,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RoundButton from '~/shared/components/RoundButton';
import ImageBack from '../../assets/images/Grupo_518.png';
import InputLabel from '../../shared/components/InputLabel';


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
          justifyContent: 'space-between',
        }}
        >
          <View style={{
            width: Dimensions.get('window').width - 90,
            height: Dimensions.get('window').height - 490,
            justifyContent: 'flex-end',
          }}
          >
            <View style={{
              top: '-10%',
            }}
            >
              <Text style={styles.textTitle}>
              Bem-vindo!
              </Text>
              <Text style={styles.textTitle}>Insira seus dados</Text>
              <Text style={styles.textSubtitle}>Etapa 2/2
              </Text>
            </View>

          </View>
          <View style={{
            width: Dimensions.get('window').width - 100,
            height: Dimensions.get('window').height - 260,

          }}
          >
            <View style={{ top: '-1%' }}>
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
              <InputLabel
                style={{ width: 290, height: 50 }}
                title="Confirmar senha"
                secureTextEntry={this.state.password}
              />
            </View>
            <RoundButton
              style={[styles.Btn, styles.btnRegister]}
              name="Continuar"
              onPress={this.goLoginPicture}
            />

          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  btnRegister: {
    backgroundColor: '#46C5F3',
  },
  Btn: {
    width: Dimensions.get('window').width - 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    height: 55,
    top: '5%',
  },
  textTitle: {
    color: '#FFF',
    fontSize: 35,
    fontFamily: 'Helvetica Now Micro',
    lineHeight: 35,
    fontWeight: '600',
  },
  textSubtitle: {
    color: '#FFF',
    fontSize: 22,
    fontFamily: 'Helvetica Now Micro',
    fontWeight: '700',
    top: '10%',
  },
  icon: {
    left: '85%',
    top: '-20.5%',
    marginBottom: '-9%',
  },
});

export default RegisterStageTwo;
