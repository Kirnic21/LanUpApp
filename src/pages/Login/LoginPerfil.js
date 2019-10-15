import React, { Component } from 'react';
import { FlatList } from 'react-native-gesture-handler';
// import { NavigationActions } from 'react-navigation';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
  StatusBar,

} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ArrowRight from '../../assets/images/arrowRight.png';


export default class LoginPerfil extends Component {

  constructor(props) {
    super(props)

    this.state = {
      selected: false,
      user: this.state.user || props.navigation.getParam('user')
    }
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

  aboutMe = () => {
    this.props.navigation.navigate('AboutMe');
  }

  PageLogin = () => {
    this.props.navigation.navigate('LoginPage');
  }

  openProfession = () => {
    this.props.navigation.navigate('Profession');
  }

  openMidia = () => {
    this.props.navigation.navigate('Midia');
  }

  openAgency = () => {
    this.props.navigation.navigate('Agency');
  }

  openPreviewProfile = () => {
    this.props.navigation.navigate('PreviewProfile');
  }

  openAvaliability = () => {
    this.props.navigation.navigate('Availability');
  }

  openForgotPassword = () => {
    this.props.navigation.navigate('ForgotPassword');
  }

  render() {
    const { user } = this.state;
    debugger
    return (
      <ScrollView contentContainerStyle={styles.Container}>
        <StatusBar backgroundColor="#18142F" barStyle="light-content" />
        <View style={{ alignItems: 'center', marginTop: '5%' }}>
          <TouchableOpacity style={{ width: 100, height: 100 }} onPress={this.aboutMe}>
            <Image
              source={{uri: user.authenticateUser.avatar.url}}
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                borderColor: '#FFF',
                borderWidth: 2,
              }}
            />
            <Icon
              name="circle"
              size={25}
              color="#86D7CA"
              style={{
                left: 75,
                top: -25,
              }}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={this.openPreviewProfile} style={{ width: 300, alignItems: 'center' }}>
          <Text style={styles.submitText}>Pré-visualizar o perfil</Text>
        </TouchableOpacity>
        {/* TODO: essas funções do onPress não precissa fazer um método pra cada!
          faz uma função que recebe a rota que precisa ir on onPress
           (ex: navegar('AboutMe'))
          daí pra cada onPress passa uma rota especifica para essa função
           (ex: navegar('batata'), navegar('abacaxi'))
        */}
        <FlatList
          contentContainerStyle={styles.list}
          data={[
            {
              key: '1',
              title: 'Sobre mim',
              subtitle: 'Sua foto de perfil, apresentação e mais',
              onPress: () => this.aboutMe(),
            },
            {
              key: '2',
              title: 'Meu Job',
              subtitle: 'Área de operação, disponibilidade e mais',
              onPress: () => this.openProfession(),
            },
            {
              key: '3',
              title: 'Agências',
              subtitle: 'Entre na equipe de sua agência',
              onPress: () => this.openAgency(),
            },
            {
              key: '4',
              title: 'Galeria',
              subtitle: 'Fotos e videos de seu trabalho',
              onPress: () => this.openMidia(),
            },
            {
              key: '5',
              title: 'Disponibilidade',
              subtitle: 'Dias, horários e feriados',
              onPress: () => this.openAvaliability(),
            },
            {
              key: '6',
              title: 'Histórico de trabalho',
              subtitle: 'Trabalho, avaliações e recomendações',
            },
          ]}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={item.onPress}
              style={{
                ...styles.item, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
              }}
            >
              <View>
                <Text style={{ color: 'white', fontSize: 14, marginBottom: 5 }}>
                  {item.title}
                </Text>
                <Text style={{
                  color: 'gray', fontSize: 13, borderBottomWidth: 0, borderTopWidth: 0,
                }}
                >
                  {item.subtitle}
                </Text>
              </View>
              <Image source={ArrowRight} style={{ width: 15, height: 15 }} />
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={this.renderSeparator}
          keyExtractor={item => item.key}
        />
        <TouchableOpacity onPress={this.openAgency}>
          <Text style={styles.agency}>Sou uma Agência</Text>
        </TouchableOpacity>
        <FlatList
          contentContainerStyle={[styles.list, { borderRadius: 10 }]}
          data={[
            {
              key: '1',
              title: 'Alterar Senha',
              onPress: () => this.openForgotPassword(),
            },
          ]}
          renderItem={({ item }) => (
            <View style={[styles.item]}>
              <TouchableOpacity onPress={item.onPress}>
                <Text style={{ color: 'white', fontSize: 14, marginBottom: 5 }}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          ItemSeparatorComponent={this.renderSeparator}
          keyExtractor={item => item.key}
        />

        <Text
          onPress={() => this.PageLogin()}
          style={{ ...styles.submitText, color: 'white', marginBottom: 30 }}
        >
          Terminar sessão
        </Text>
      </ScrollView>
    );
  }
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  Container: {
    alignItems: 'center',
    width,
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
  agency: {
    marginTop: 20,
    paddingTop: 20,
    paddingBottom: 20,
    color: '#46C5F3',
    padding: 20,
    backgroundColor: '#24203B',
    borderRadius: 10,
    fontSize: 14,
    width: width - 50,
  },
  list: {
    marginTop: 20,
    backgroundColor: '#24203B',
    width: width - 50,
    borderRadius: 20,
  },
  item: {
    padding: 20,
    fontSize: 18,
  },
});
