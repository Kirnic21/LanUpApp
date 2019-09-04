import * as React from 'react';
import { Text, View, Image, ScrollView, StyleSheet } from 'react-native';
import {
  DrawerItems,
  SafeAreaView,
} from 'react-navigation';
import { createAppContainer, createDrawerNavigator } from "react-navigation";

class Home extends React.Component {
  static navigationOptions = {
    title: 'Proximo Evento',
    // drawerIcon: ({ focused }) => (
    //   <Ionicons name="md-home" size={24} color={focused ? 'blue' : 'black'} />
    // ),
  };

  render() {
    return (
      <View style={styles.container}>
        <Text
          style={styles.paragraph}
          onPress={() => {
            this.props.navigation.toggleDrawer();
          }}>
          Open Drawer
        </Text>
      </View>
    );
  }
}

class Profile extends React.Component {
  static navigationOptions = {
    title: 'Perfil',
    // drawerIcon: ({ focused }) => (
    //   <Ionicons name="md-person" size={24} color={focused ? 'blue' : 'black'} />
    // ),
  };

  render() {
    return (
      <View style={styles.container}>
        <Text
          style={styles.paragraph}
          onPress={() => {
            this.props.navigation.navigate('Profile');
          }}>
          Go back home
        </Text>
      </View>
    );
  }
}

const navigator = createDrawerNavigator(
  {
    Home,
    Profile
  },
  {
    drawerType: 'slide',
    // drawerPosition: 'right',
    drawerWidth: 200,
    drawerBackgroundColor: 'gray',
    // contentComponent: CustomDrawerContentComponent
  }
);

export default createAppContainer(navigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: '#18142F',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white'
  },
  image: {
    flex: 1,
    height: 300,
  },
});
