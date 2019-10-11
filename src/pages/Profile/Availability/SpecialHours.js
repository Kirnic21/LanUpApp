import React, { Component } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import ToggleSwitch from 'toggle-switch-react-native';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  ScrollView,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import ProfileHeaderMenu from '../../../shared/components/ProfileHeaderMenu';
import InputLabel from '../../../shared/components/InputLabel';


export default class SpecialHours extends Component {
  constructor() {
    super();

    this.state = {
      expanded: false,
      now: false,
    };

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }


  onToggle(isOn) {
    console.log(`Changed to ${isOn}`);
  }

        changeLayout = () => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          this.setState({ expanded: !this.state.expanded });
        }


  renderSeparator = () => (
    <View
      style={{
        height: 2,
        width: '90%',
        backgroundColor: '#18142F',
        marginLeft: '5%',
        marginRight: '10%',
      }}
    />
  );

  onLogout = () => {
    this.props.logout().then(() => this.props.navigation.navigate('LoginPerfil'));
  }

  render() {
    return (
      <ScrollView>


        <View style={styles.Container}>

          <View style={styles.list}>
            <View style={styles.item}>
              <View>
                <Text style={{ color: '#FFF', fontSize: 20 }}>aa</Text>
                <ProfileHeaderMenu
                  style={{ marginBottom: '-25%', top: '-65%' }}
                  handleOnLogout={this.onLogout}
                />
              </View>
              <View style={{ top: '5%', left: '40%' }}>
                <ToggleSwitch
                  size="small"
                  onColor="#483D8B"
                  offColor="#18142F"
                  label="Estou Disponível"
                  labelStyle={{ color: '#FFF', left: -135, fontSize: 17 }}
                  isOn={this.state.now}
                  onToggle={(now) => {
                    this.setState({ now });
                    this.onToggle(now);
                    this.changeLayout();
                  }}
                />
              </View>
              <View style={{ top: '10%' }}>
                <View style={{ height: this.state.expanded ? null : 0, overflow: 'hidden' }}>
                  <InputLabel title="Das" />
                  <InputLabel title="Das" />
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  Container: {
    alignItems: 'center',
    width,
    height: Dimensions.get('window').height + 50,
    backgroundColor: '#18142F',
  },
  list: {
    top: '15%',
    backgroundColor: '#24203B',
    width: width - 50,
    borderRadius: 20,
    height: '40%',
  },
  item: {
    padding: 15,
  },
  TextInput: {
    borderColor: 'white',
    borderWidth: 1.5,
    borderRadius: 50,
  },

});
