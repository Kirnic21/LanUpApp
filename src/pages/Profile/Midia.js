import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Text,
  ScrollView,
} from 'react-native';
import ImageOutline from '../../assets/images/outline.png';
import ActionButton from '../../shared/components/ActionButton';


class Midia extends Component {
  state = {
    selected: false,
  };


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
          <View style={styles.ContainerTitle}>
            <Text style={styles.title}>Não temos nenhuma</Text>
            <Text style={styles.title}>midia para mostrar</Text>
          </View>
          <View style={styles.ContainerImg}>
            <Image source={ImageOutline} style={{ height: '70%', width: '70%' }} />
          </View>
          <View style={styles.ContainerSubtitle}>
            <Text style={styles.subtitle}>Adicione as suas fotos</Text>
            <Text style={styles.subtitle}>e divulgue o seu trabalho</Text>
          </View>
          <View style={{
            alignItems: 'flex-end',
            height: 50,
            width: Dimensions.get('window').width - 100,
            flex: 0.5,
          }}
          >
            <ActionButton />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  Container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width,
    height: Dimensions.get('window').height + 48,
    backgroundColor: '#18142F',
  },
  ContainerTitle: {
    height: 50,
    width: Dimensions.get('window').width - 100,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  ContainerImg: {
    height: 50,
    width: Dimensions.get('window').width - 100,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ContainerSubtitle: {
    height: 50,
    width: Dimensions.get('window').width - 100,
    flex: 1,
    alignItems: 'center',
  },
  title: {
    color: '#FFF',
    fontSize: 25,
    letterSpacing: 1,
    lineHeight: 40,
  },
  subtitle: {
    color: '#FFFFFF',
    fontSize: 18,
    lineHeight: 30,
  },
});

export default Midia;
