import React, { Component } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import ToggleSwitch from 'toggle-switch-react-native';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';

import ArrowRight from '../../assets/images/arrowRight.png';

export default class Availability extends Component {
  state = {
    selected: false,
    now: false,
  };

  onToggle(isOn) {
    console.log(`Changed to ${isOn}`);
  }

  openAvailabilityDays = () => {
    this.props.navigation.navigate('AvailabilityDays');
  }

  openSpecialHours = () => {
    this.props.navigation.navigate('SpecialHours');
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

  render() {
    return (
      <ScrollView>
        <View style={styles.Container}>
          <FlatList
            contentContainerStyle={[styles.list, { top: '20%' }]}
            data={[
              {
                key: '1',
                title: 'Emergência',
                subtitle: 'Estou disponivel agora',
              },
            ]}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={{ color: 'white', fontSize: 15, marginBottom: 5 }}>
                  {item.title}
                </Text>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 5,
                }}
                >
                  <Text style={{
                    color: 'white', fontSize: 13, borderBottomWidth: 0, borderTopWidth: 0,
                  }}
                  >
                    {item.subtitle}
                  </Text>
                  <View>
                    <ToggleSwitch
                      size="small"
                      onColor="#483D8B"
                      offColor="#18142F"
                      isOn={this.state.now}
                      onToggle={(now) => {
                        this.setState({ now });
                        this.onToggle(now);
                      }}
                    />
                  </View>
                </View>
              </View>
            )}
            keyExtractor={item => item.key}
          />
          {/* TODO: fazer um service fake retornando esses dados dos horarios */}
          <View style={[
            styles.list,
            {
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              height: '6%',
            }]}
          >
            <Text style={{
              color: '#FFF',
              fontSize: 15,
              left: '5%',
              top: '45%',
            }}
            >Horários
            </Text>
          </View>
          <FlatList
            contentContainerStyle={[
              styles.list, {
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                paddingBottom: '4%',
                marginBottom: '-6%',
              },
            ]}
            data={[
              {
                key: '1',
                hrs: 'Horarios',
                title: 'Segunda',
                date: '18:00 até 21:00',
                onPress: () => this.openAvailabilityDays(),
              },
              {
                key: '2',
                title: 'Terça',
                d: 'Não aceito job',
                onPress: () => this.openAvailabilityDays(),
              },
              {
                key: '3',
                title: 'Quarta',
                d: 'Não aceito job',
                onPress: () => this.openAvailabilityDays(),
              },
              {
                key: '4',
                title: 'Quinta',
                date: '18:00 até 21:00',
                onPress: () => this.openAvailabilityDays(),
              },
              {
                key: '5',
                title: 'Sexta',
                date: '18:00 até 21:00',
                onPress: () => this.openAvailabilityDays(),
              },
              {
                key: '6',
                title: 'Sabado',
                d: 'Não aceito job',
                onPress: () => this.openAvailabilityDays(),
              },
              {
                key: '7',
                title: 'Domingo',
                date: '18:00 até 21:00',
                onPress: () => this.openAvailabilityDays(),
              },
            ]}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={item.onPress}>
                <View style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  height: Dimensions.get('window').height - 720,
                }}
                >
                  <Text style={{
                    color: '#fff',
                    fontSize: 14,
                    left: '5%',
                    top: '40%',
                  }}
                  >
                    {item.title}
                  </Text>
                  <Text style={{
                    color: '#46C5F3',
                    fontSize: 10,
                    left: '60%',
                    top: '20%',
                  }}
                  >
                    {item.date}
                  </Text>
                  <Text style={{
                    color: '#EB4886',
                    fontSize: 10,
                    left: '60%',
                    top: '-5%',
                  }}
                  >
                    {item.d}
                  </Text>
                  <Image
                    source={ArrowRight}
                    style={{
                      width: 15,
                      height: 15,
                      left: '90%',
                      top: '-29%',
                    }}
                  />
                </View>
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={this.renderSeparator}
            keyExtractor={item => item.key}
          />
          <FlatList
            contentContainerStyle={styles.list}
            data={[
              {
                key: '1',
                title: 'Horários especiais',
                subtitle: '16 de Dez, 2019',
                date: '18:00 até 21:00',
                onPress: () => this.openSpecialHours(),
              },
            ]}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={{ color: '#FFF', fontSize: 15, marginBottom: 5 }}>
                  {item.title}
                </Text>
                <TouchableOpacity onPress={item.onPress}>
                  <View style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}
                  >
                    <Text style={{
                      color: '#FFF',
                      fontSize: 15,
                      top: '50%',

                    }}
                    >
                      {item.subtitle}
                    </Text>
                    <Text style={{
                      color: '#46C5F3',
                      fontSize: 12,
                      left: '50%',
                      top: '16%',
                    }}
                    >
                      {item.date}
                    </Text>
                    <Image
                      source={ArrowRight}
                      style={{
                        width: 15,
                        height: 15,
                        left: '95%',
                        top: '-95%',
                      }}
                    />
                  </View>
                </TouchableOpacity>
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
    paddingTop: '10%',
  },
  list: {
    backgroundColor: '#24203B',
    width: width - 50,
    borderRadius: 20,
  },
  item: {
    padding: 15,
  },
});
