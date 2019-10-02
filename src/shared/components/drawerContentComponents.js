
import React, { Component } from 'react';
import { NavigationActions, DrawerActions } from 'react-navigation';
import {
  Text, View, StyleSheet, ImageBackground, Image, TouchableOpacity,
} from 'react-native';
// import { white } from 'ansi-colors';
import { ScrollView } from 'react-native-gesture-handler';
import imgTitle from '../../assets/images/imgTitle.png';
import imgBack from '../../assets/images/drawerBack.png';
import IconMenu from '../../assets/images/icon_menu.png';
import IconPerfil from '../../assets/images/iconPerfil.png';
import iconNextEvent from '../../assets/images/iconNextEvent.png';
import iconExplore from '../../assets/images/iconExplore.png';
import iconSchedule from '../../assets/images/iconSchedule.png';

export default class drawerContentComponents extends Component {
    navigateToScreen = route => (
      () => {
        const navigateAction = NavigationActions.navigate({
          routeName: route,
        });
        this.props.navigation.dispatch(navigateAction);
      })

    render() {
      return (
        <ScrollView>
          <ImageBackground
            source={imgBack}
            style={{
              width: 170,
              height: 822,
              backgroundColor: '#24203BE6',
              elevation: 2,
              borderRightColor: '#EB48864D',
              borderRightWidth: 2,
            }}
            resizeMode="cover"
            imageStyle={{ opacity: 0.3 }}
          >
            <View style={styles.container}>
              <View style={styles.headerContainer}>
                <Image source={imgTitle} style={{ width: 115, height: 80, top: 20 }} />
                <TouchableOpacity
                  style={{ left: 115, top: -35 }}
                  onPress={() => {
                    this.props.navigation.dispatch(DrawerActions.closeDrawer());
                  }}
                >
                  <Image style={{ height: 40, width: 40 }} source={IconMenu} />
                </TouchableOpacity>
                <Text style={{
                  color: '#fff', fontSize: 17, top: 14, textAlign: 'center',
                }}
                >@MillerLanUp
                </Text>
              </View>
              <View style={styles.screenContainer}>
                <View style={[
                  styles.screenStyle,
                  (this.props.activeItemKey === 'LoginPerfil')
                    ? styles.activeBackgroundColor : null,
                ]}
                >
                  <Image source={IconPerfil} style={{ width: 75, height: 75 }} />
                  <Text
                    style={[
                      styles.screenTextStyle,
                      (this.props.activeItemKey === 'LoginPerfil')
                        ? styles.selectedTextStyle : null,
                    ]}
                    onPress={this.navigateToScreen('LoginPerfil')}
                  >
                    Perfil
                  </Text>
                </View>
                <View style={[
                  styles.screenStyle,
                  styles.screenStyleNextEvent,
                  (this.props.activeItemKey === 'NextEvent')
                    ? styles.activeBackgroundColor : null,
                ]}
                >
                  <Image source={iconNextEvent} style={{ width: 75, height: 75, top: 30 }} />
                  <Text
                    style={[
                      styles.screenTextStyle,
                      styles.screenTextNextEvent,
                      (this.props.activeItemKey === 'NextEvent')
                        ? styles.selectedTextStyle : null]}
                    onPress={this.navigateToScreen('NextEvent')}
                  >
                     Próximo
                     Evento
                  </Text>
                </View>
                <View style={[
                  styles.screenStyle,
                  styles.screenStyleExplore,
                  (this.props.activeItemKey === 'ToExplore')
                    ? styles.activeBackgroundColor : null,
                ]}
                >
                  <Image source={iconExplore} style={{ width: 75, height: 75 }} />
                  <Text
                    style={[
                      styles.screenTextStyle,
                      styles.screenTextExplore,
                      (this.props.activeItemKey === 'ToExplore')
                        ? styles.selectedTextStyle : null,
                    ]}
                    onPress={this.navigateToScreen('ToExplore')}
                  >
                    Explorar
                  </Text>
                </View>
                <View style={[
                  styles.screenStyle,
                  styles.screenStyleSchedule,
                  (this.props.activeItemKey === 'ToExplore')
                    ? styles.activeBackgroundColor : null,
                ]}
                >
                  <Image source={iconSchedule} style={{ width: 75, height: 75 }} />
                  <Text
                    style={[
                      styles.screenTextStyle,
                      styles.screenTextExploreSchedule,
                      (this.props.activeItemKey === 'ToExplore')
                        ? styles.selectedTextStyle : null,
                    ]}
                    onPress={this.navigateToScreen('ToExplore')}
                  >
                    Agenda
                  </Text>
                </View>
              </View>
            </View>
          </ImageBackground>
        </ScrollView>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    top: 35,
    justifyContent: 'center',
    height: 85,
    width: 150,
  },
  screenContainer: {
    paddingTop: 150,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

  },
  screenStyle: {
    top: -70,
    height: 135,
    marginTop: 2,
    flexDirection: 'column',
    alignItems: 'center',
    width: '70%',
    borderBottomColor: '#865FC0',
    borderBottomWidth: 3,
  },
  screenTextStyle: {
    fontSize: 18.7,
    marginLeft: 20,
    textAlign: 'center',
    color: '#FFF',
    textAlignVertical: 'bottom',
    height: 130,
    width: 110,
    top: -100,
    left: -10,
  },

  screenStyleNextEvent: {
    top: -80,
    height: 185,
  },

  screenTextNextEvent: {
    top: -55,
  },

  screenStyleExplore: {
    top: -55,
    height: 130,
  },

  screenTextExplore: {
    top: -110,
  },

  screenStyleSchedule: {
    top: -30,
    height: 110,
    borderBottomColor: 'transparent',
  },

  screenTextExploreSchedule: {
    top: -110,
  },


  selectedTextStyle: {
    fontWeight: 'bold',
    color: '#00adff',
  },
  activeBackgroundColor: {
    backgroundColor: 'blue',
  },
});
