import * as React from 'react';
import { Text, View, Image, ScrollView, StyleSheet } from 'react-native';
import {
  DrawerItems,
  SafeAreaView,
} from 'react-navigation';

class Home extends React.Component {
  static navigationOptions = {
    title: 'Home',
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
            this.props.navigation.navigate('Profile');
          }}>
          Exit
        </Text>

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
    title: 'Profile',
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
            this.props.navigation.navigate('Home');
          }}>
          Go back home
        </Text>
      </View>
    );
  }
}

const CustomDrawerContentComponent = props => (
  <ScrollView>
    <SafeAreaView
      style={styles.container}
      forceInset={{ top: 'always', horizontal: 'never' }}>
      <DrawerItems {...props} />
      <Image
        style={styles.image}
        source={{
          uri: 'https://appjs.co/wp-content/uploads/2015/09/brent3-458x458.png',
        }}
      />
    </SafeAreaView>
  </ScrollView>
);

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
