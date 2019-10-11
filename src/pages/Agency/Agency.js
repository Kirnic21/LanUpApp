import React, { Component } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import InputLabel from '../../shared/components/InputLabel';
import Icon from '../../assets/images/icon_add.png';

class Agency extends Component {
  state = {
    // selected: false,
  };

  openIAnAgency = () => {
    this.props.navigation.navigate('IAnAgency');
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.Container}>
          <View style={[styles.ContainerAgency, styles.width, styles.backColorCard]}>
            <Text style={{ color: '#FFF', fontSize: 17 }}>Informações da Agência</Text>
            <View style={{ alignItems: 'center', top: '10%' }}>
              <InputLabel
                style={{ width: 300, height: 50 }}
                title="CNPJ"
              />
              <InputLabel
                style={{ width: 300, height: 50 }}
                title="CEP"
              />
            </View>
          </View>

          <View style={[styles.ContainerService, styles.width, styles.backColorCard]}>
            <FlatList
              data={[
                {
                  key: '1',
                  title: 'Serviços',
                  subtitle: '3/3',
                },
              ]}
              renderItem={({ item }) => (
                <View style={styles.item}>
                  <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                    <Text style={{ color: 'white', fontSize: 17, marginRight: 10 }}>
                      {item.title}
                    </Text>
                    <Text style={{ color: 'gray', fontSize: 15, marginTop: 2 }}>
                      {item.subtitle}
                    </Text>
                  </View>
                  <View style={{
                    flexDirection: 'row', maxWidth: 400, margin: 0, flexWrap: 'wrap',
                  }}
                  >
                    <View>
                      <Text style={{
                        ...styles.TextBorder, backgroundColor: '#FFB72B', width: 100, fontSize: 13,
                      }}
                      >Bartender
                      </Text>
                    </View>
                    <View>
                      <Text style={{
                        ...styles.TextBorder, backgroundColor: '#737082', width: 90, fontSize: 13,
                      }}
                      >Cozinha
                      </Text>
                    </View>
                    <View>
                      <Text style={{
                        ...styles.TextBorder, backgroundColor: '#737082', width: 90, fontSize: 13,
                      }}
                      >Recepção
                      </Text>
                    </View>
                    <View>
                      <Text style={{
                        ...styles.TextBorder, backgroundColor: '#737082', width: 60, fontSize: 13,
                      }}
                      >Caixa
                      </Text>
                    </View>
                    <View>
                      <Text style={{
                        ...styles.TextBorder, backgroundColor: '#737082', width: 70, fontSize: 13,
                      }}
                      >Garçom
                      </Text>
                    </View>
                    <View>
                      <Text style={{
                        ...styles.TextBorder, backgroundColor: '#737082', width: 150, fontSize: 13,
                      }}
                      >Serviços Gerais
                      </Text>
                    </View>
                    <View>
                      <Text style={{
                        ...styles.TextBorder, backgroundColor: '#46C5F3', width: 50, fontSize: 13,
                      }}
                      >DJ
                      </Text>
                    </View>
                    <View>
                      <Text style={{
                        ...styles.TextBorder, backgroundColor: '#865FC0', width: 160, fontSize: 13,
                      }}
                      >Animador de Festa
                      </Text>
                    </View>
                    <View />
                  </View>
                </View>
              )}
              keyExtractor={item => item.key}
            />
          </View>
          <View style={[styles.btnContainer, styles.backColorCard, styles.width]}>
            <TouchableOpacity style={[styles.Btn, styles.width]}>
              <Image source={Icon} style={{ width: 25, height: 25, top: '30%' }} />
              <Text style={styles.btnText}>Adicionar Serviços
              </Text>
            </TouchableOpacity>
          </View>
        </View>


      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#18142F',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: Dimensions.get('window').height + 50,
  },
  ContainerAgency: {
    height: Dimensions.get('window').height - 530,
    justifyContent: 'flex-start',
    padding: 15,
    top: '6%',
    borderRadius: 15,
  },
  ContainerService: {
    height: Dimensions.get('window').height - 580,
    top: '7.5%',
    borderRadius: 15,
  },
  btnContainer: {
    height: Dimensions.get('window').height - 700,
    top: '8.5%',
    borderRadius: 15,
  },
  Btn: {
    height: Dimensions.get('window').height - 700,
    justifyContent: 'center',
    padding: 20,
  },
  item: {
    padding: 20,
    fontSize: 18,
  },
  TextBorder: {
    color: 'white',
    paddingBottom: 10,
    borderRadius: 50,
    width: 90,
    height: 32,
    paddingTop: 5,
    textAlign: 'center',
    flexWrap: 'wrap',
    margin: 3,
  },
  btnText: {
    color: '#865FC0',
    textAlign: 'center',
    top: '-35%',
    left: '-15%',
    fontSize: 15,
  },
  width: {
    width: Dimensions.get('window').width - 50,
  },
  backColorCard: {
    backgroundColor: '#24203B',
  },

});

export default Agency;
