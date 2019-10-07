import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import ImageBack from '../../assets/images/Grupo_518.png';

import ImageProfile from '../../assets/images/Grupo_528.png';

import CoreTemplate from '~/shared/components/CoreTemplate';

class LoginProfilePicture extends Component {
  state = {
    selected: false,
  };

  goToLoginCropProfilePhoto = () => {
    ImagePicker.openPicker({
      width: 30,
      height: 40,
      cropperCircleOverlay: true,
      cropping: true,
    })
      .then(() => this.props.navigation.navigate('LoginPerfil'));
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
        <View style={{
          flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        }}
        >
          <View style={{
            flex: 0.7,
            width: Dimensions.get('window').width - 100,
            justifyContent: 'flex-end',
          }}
          >
            <Text style={{
              color: '#FFF',
              fontSize: 52,
              fontFamily: 'Helvetica Now Micro',
              fontWeight: '600',
              textAlign: 'center',
              top: '-12%',
            }}
            >MillorLanUp
            </Text>
            <Text style={{
              fontSize: 25,
              color: '#FFF',
              letterSpacing: 0.6,
              textAlign: 'center',
            }}
            >Adicionar foto de perfil
            </Text>
          </View>
          <View style={{
            width: '15%',
            height: 1,
            borderBottomColor: '#F2D74C',
            borderBottomWidth: 3,
            top: '-10%',
            left: '-27%',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          />
          <View style={{
            flex: 1,
            width: Dimensions.get('window').width - 100,
            alignItems: 'center',
            top: '5%',
          }}
          >
            <Image source={ImageProfile} style={{ height: 130, width: 130 }} />
            <TouchableOpacity
              style={styles.button}
              onPress={this.goToLoginCropProfilePhoto}
            >
              <Text style={{ color: 'white', fontSize: 14 }}>Tirar Foto</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 150,
    height: 50,
    backgroundColor: '#46C5F3',
    borderRadius: 50,
    top: '8%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginProfilePicture;
