import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Dimensions,
  StatusBar,
} from 'react-native';
import RoundButton from '~/shared/components/RoundButton';
import ImageBack from '../../assets/images/Grupo_518.png';
import InputLabel from '../../shared/components/InputLabel';


class RegisterStage extends Component {
  goRegister = () => this.props.navigation.navigate('RegisterStageTwo')

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
              <Text style={styles.textSubtitle}>Etapa 1/2
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
  TextInput: {
    width: Dimensions.get('window').width - 100,
    height: 51,
  },
});

export default RegisterStage;
