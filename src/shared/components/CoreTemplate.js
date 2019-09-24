import React, { Fragment } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  ImageBackground,
  StatusBar,
} from 'react-native';
import { Right } from 'native-base';
import ImageBack from '../../assets/images/Grupo_518.png';
import ImageNickname from '../../assets/images/Grupo_529.png';
import ImageLogo from '../../assets/images/LanUp_logo2.png';

export default CoreTemplate = props => (
  <View style={styles.logoContainer}>
    <StatusBar backgroundColor="#18142F" barStyle="light-content" />
    <ImageBackground
      source={ImageBack}
      style={styles.ImageBackgroundContainer}
    >
      {props.name && (
      <View style={{ display: 'flex', marginTop: 140, marginLeft: 0 }}>
        <ImageBackground
          source={ImageNickname}
          style={styles.ImageBackgroundNickName}
        />

        <View style={{ top: -60, marginLeft: 7 }}>
          <Text style={{
            color: 'white', fontSize: 29, letterSpacing: 2, fontWeight: 'bold',
          }}
          >{props.name}
          </Text>
        </View>

        <View style={{ top: -70, display: 'flex' }}>
          <Text style={{ color: '#FFB72B', textAlign: 'right', fontSize: 22 }}>{props.subtitle}</Text>
        </View>

        {/* <View style={{
          margin: 30, marginHorizontal: 10, width: 300, backgroundColor: 'blue',
        }}
        >
        </View> */}
        {/* <View style={{
          margin: 30, width: 200, marginHorizontal: 10, display: 'flex', alignItems: 'flex-end',
        }}
        >
          <Text style={{
            color: '#FFF', top: -65,
          }}
          > Ok
          </Text>
        </View> */}
      </View>
      )}
      {!props.name && (
      <View style={styles.logoImage}>
        <Image source={props.logo || ImageLogo} style={{ width: 200, height: 100 }} />
      </View>
      )}
      {props.children}
    </ImageBackground>
  </View>
);


const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  ImageBackgroundNickName: {
    width: 100,
    height: 95,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    // height,
    // width,
  },
  logoNickName: {
    margin: 60,
  },
  logoImage: {
    margin: 60,
  },
  ImageBackgroundContainer: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});
