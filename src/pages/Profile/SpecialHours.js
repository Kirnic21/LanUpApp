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
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import ProfileHeaderMenu from '../../shared/components/ProfileHeaderMenu';
import InputLabel from '../../shared/components/InputLabel';


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

          <FlatList
            contentContainerStyle={{ ...styles.list }}
            data={[
              {
                key: '1', title: 'Horas',
              },
              {
                key: '2', title: 'Horas',
              },
            ]}
            renderItem={({ item }) => (
              <View style={styles.container}>
                <View style={styles.btnTextHolder}>
                  <ToggleSwitch
                    size="small"
                    onColor="#483D8B"
                    offColor="#18142F"
                    label="Estou Disponível"
                    labelStyle={{ color: '#FFF', marginRight: '44%', fontSize: 17 }}
                    isOn={this.state.now}
                    onToggle={(now) => {
                      this.setState({ now });
                      this.onToggle(now);
                      this.changeLayout();
                    }}
                  />
                  <View style={[
                    { height: this.state.expanded ? null : 0, overflow: 'hidden' },
                    styles.item,
                  ]}
                  >
                    <Text style={styles.text}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              It has survived not only five centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem Ipsum.
                    </Text>
                  </View>
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

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingHorizontal: 10,
    height: Dimensions.get('window').height - 300,
    justifyContent: 'center',
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    backgroundColor: '#18142F',
  },

  text: {
    fontSize: 17,
    color: 'black',
    padding: 10,
  },

  btnText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },

  Btn: {
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
