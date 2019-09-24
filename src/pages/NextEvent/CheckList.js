import React, { Component } from 'react';
// import Button from "../../shared/components/Button"
import { FlatList } from 'react-native-gesture-handler';
import { CheckBox } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';

export default class CheckList extends Component {
  state = {
    checked: false,
  };

  buildConversa = async (prop, value) => {
    debugger;
    await this.setState({ [prop]: value });
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

  openDetailNextEvent = () => {
    this.props.navigation.navigate('DetailNextEvent');
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.Container}>
        <View style={{
          flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: '20%', marginRight: '40%',
        }}
        >
          <Text style={{ fontSize: 20, color: 'white' }}>
            Balada TheWeek
          </Text>
        </View>
        <TouchableOpacity
          style={{
            ...styles.list, flexDirection: 'row', alignItems: 'center', marginTop: 5,
          }}
          onPress={() => this.setState({ checked: !this.state.checked })}
        >
          <View style={{
            padding: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
          }}
          >
            <CheckBox
              checked={this.state.checked}
              uncheckedIcon="circle"
              checkedIcon="circle"
              checkedColor="#46C5F3"
              size={15}
            />
            <Text style={{
              color: 'white', fontSize: 15, marginBottom: 1, marginLeft: -15,
            }}
            >
              {'Check in'}
            </Text>
            <Text style={{
              color: 'gray', fontSize: 14, marginBottom: 1, marginLeft: 30, marginRight: -10,
            }}
            >
              {'10/08 as 21:30'}
            </Text>
          </View>
        </TouchableOpacity>
        <FlatList
          contentContainerStyle={styles.list}
          data={[
            {
              title: 'Conferir Fichas',
            },
            {
              title: 'Conferir Cervejas',
            },
            {
              title: 'Verificar Freezer',
            },
          ]}
          renderItem={({ item }) => (
            <View

              style={{
                ...styles.item, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <CheckBox
                  onPress={event => this.buildConversa(item.title, event)}
                  // onPress={() => this.setState({ checked: !this.state.checked })}
                  checked={this.state.checked}
                  uncheckedIcon="circle"
                  checkedIcon="circle"
                  checkedColor="#46C5F3"
                  size={15}
                />
                <Text style={{
                  color: 'white', fontSize: 15, marginBottom: 1, marginRight: -500,
                }}
                >
                  {item.title}
                </Text>
              </View>
            </View>
          )}
          ItemSeparatorComponent={this.renderSeparator}
        />
        <View style={styles.buttonContent}>
          <TouchableOpacity style={styles.buttonEmail} onPress={this.openDetailNextEvent}>
            <Text style={{ color: 'white', fontSize: 13 }}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: '#18142F',
  },
  submitText: {
    marginTop: 20,
    paddingTop: 10,
    paddingBottom: 10,
    color: '#46C5F3',
    textAlign: 'center',
    backgroundColor: '#24203B',
    borderRadius: 20,
    fontSize: 13,
    width: '70%',
  },
  list: {
    marginTop: '5%',
    backgroundColor: '#403A60',
    width: width - 50,
    borderRadius: 20,
  },
  item: {
    padding: 15,
  },
  buttonEmail: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 1.5,
    borderRadius: 50,
    height: 50,
    top: -230,
  },
  buttonContent: {
    flexDirection: 'row',
    width: 230,
    margin: 20,
  },
});
