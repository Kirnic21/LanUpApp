import React, { Component } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import ToggleSwitch from 'toggle-switch-react-native';
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  ScrollView,
  TextInput,
} from 'react-native';
import ProfileHeaderMenu from '../../../shared/components/ProfileHeaderMenu';

export default class Availability extends Component {
  state = {
    selected: false,
    now: true,
  };

  onToggle(isOn) {
    console.log(`Changed to ${isOn}`);
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
          <View style={{
            flexDirection: 'column',
            alignItems: 'flex-start',
            top: '10%',
          }}
          >
            <Text style={{
              fontSize: 22,
              color: '#FFF',
              left: '-20%',
            }}
            >
            Segunda
            </Text>
            <View style={{ top: '30%', left: '19%' }}>
              <ToggleSwitch
                size="small"
                onColor="#483D8B"
                offColor="#18142F"
                label="Estou Disponível"
                labelStyle={{ color: '#FFF', left: -161, fontSize: 17 }}
                isOn={this.state.now}
                onToggle={(now) => {
                  this.setState({ now });
                  this.onToggle(now);
                }}
              />
            </View>
          </View>
          <FlatList
            contentContainerStyle={{ ...styles.list }}
            data={[
              {
                key: '1', title: 'Horas',
              },
            ]}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <ProfileHeaderMenu
                  style={{ marginBottom: '-25%' }}
                  handleOnLogout={this.onLogout}
                />
                <Text style={{ color: 'white', fontSize: 15, marginBottom: '3%' }}>
                  {item.title}
                </Text>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
                  <Text style={{ color: 'white', marginBottom: '3%', fontSize: 13 }}>Das</Text>
                  <Text style={{
                    color: 'white', marginBottom: 5, marginLeft: '45%', fontSize: 13,
                  }}
                  >Até
                  </Text>
                </View>
                <View style={{
                  flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5,
                }}
                >
                  <TouchableOpacity style={{ ...styles.TextInput, width: 130, height: 40 }}>
                    <TextInput
                      style={styles.ValueInput}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={{ ...styles.TextInput, width: 130, height: 40 }}>
                    <TextInput
                      style={styles.ValueInput}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            keyExtractor={item => item.key}
          />
        </View>

      </ScrollView>
    );
  }
}

const { width } = Dimensions.get('window');

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
