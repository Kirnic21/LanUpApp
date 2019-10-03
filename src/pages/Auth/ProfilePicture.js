import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

import ImageProfile from '../../assets/images/Grupo_528.png';

import CoreTemplate from '~/shared/components/CoreTemplate';

class LoginProfilePicture extends Component {
  state = {
    selected: false,
  };

  // SelectedInput = () => {
  //   debugger;
  //   if (event.selected) {
  //   }
  // };

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
      <CoreTemplate name="MillorLanUp" fontSize={40}>
        <View style={styles.Container}>
          <Text style={styles.title}>Adicionar foto de perfil</Text>
          <View
            onTouchStart={() => this.props.navigation.navigate('LoginPerfil')}
            style={{ margin: 5, alignItems: 'center' }}
          >
            <Image source={ImageProfile} style={{ width: 110, height: 110 }} />
          </View>
          {/* TODO: componentizar botão - todos botões tem botão arredondada */}
          <TouchableOpacity
            style={styles.button}
            onPress={this.goToLoginCropProfilePhoto}
          >
            <Text style={{ color: 'white', fontSize: 13 }}>Adicionar Foto</Text>
          </TouchableOpacity>
        </View>
      </CoreTemplate>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 20,
    letterSpacing: 1,
    top: -10,
  },
  button: {
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7541BF',
    borderRadius: 50,
    height: 45,
    width: 155,
  },
});

export default LoginProfilePicture;
