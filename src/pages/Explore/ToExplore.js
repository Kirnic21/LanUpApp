import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import audienceBand from '../../assets/images/audience-band.png';
import blackAndWhite from '../../assets/images/black-and-white.png';


export default class ToExplore extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.Container}>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.btnTagOne}
            >
              <Text style={styles.textTag}>Bartender</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnTagTwo}
            ><Text style={[styles.textTag, { color: '#FFF' }]}>DJ</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnTagThree}
            ><Text style={[styles.textTag, { color: '#FFF', fontSize: 16 }]}>Animador de festa</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={[
              {
                title: 'Balada TheWeek',
              },

              {
                title: 'Balada TheWeek',
              },
              {
                title: 'Balada TheWeek',
              },
              {
                title: 'Balada TheWeek',
              },

            ]}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.ContainerList}>

                <View style={{ left: -60, top: '71%' }}>
                  <Image
                    source={audienceBand}
                    style={{ width: 150, height: 145 }}

                  />
                  <View style={{ top: '-65%', left: '-15%' }}>
                    <Image
                      source={blackAndWhite}
                      style={{
                        width: 25, height: 25, top: '-40%', left: '50%',
                      }}
                    />
                    <Text style={{
                      left: '57%',
                      color: '#fff',
                      top: '-90%',
                    }}
                    >Allison Ackerman -
                      <Text style={{ fontSize: 12 }}>
                        à 4h atrás
                      </Text>
                    </Text>
                  </View>
                </View>

                <View style={{ alignItems: 'center', top: '-45%' }}>

                  <Text style={{
                    left: '-5%', top: '30%', fontSize: 28, color: '#FFF',
                  }}
                  >{item.title}
                  </Text>

                  <View style={{
                    height: 75,
                    width: 60,
                    backgroundColor: '#FFFFFF85',
                    borderRadius: 16,
                    left: '-21%',
                    top: '31%',
                  }}
                  >
                    <Text style={{
                      fontSize: 20,
                      textAlign: 'center',
                      color: '#18142F',
                    }}
                    >
                    SAB
                    </Text>
                    <Text style={{
                      fontSize: 30,
                      textAlign: 'center',
                      top: -10,
                      fontWeight: 'bold',
                      color: '#18142F',
                    }}
                    >10
                    </Text>
                    <Text style={{
                      fontSize: 20,
                      textAlign: 'center',
                      top: -17,
                      color: '#18142F',
                    }}
                    >
                    OUT
                    </Text>
                  </View>

                  <View style={{
                    left: '3%',
                    top: '-6%',
                    width: 135,
                  }}
                  >
                    <Text style={{
                      color: '#FFF', fontSize: 14, lineHeight: 24, top: '25%',
                    }}
                    >
                    10:00pm - 05:00am
                    Jardim Paulista,SP
                    </Text>
                  </View>

                  <Text style={{
                    fontSize: 15, color: '#FFF', top: '3%', left: '-3%',
                  }}
                  >
                  Valor Total:
                  </Text>
                  <View style={{ left: '17%', top: '-9%' }}>
                    <Text style={{ fontSize: 17, color: '#46C5F3' }}>
                    R$
                      <Text style={{ fontSize: 23, color: '#46C5F3' }}>
                      140,
                      </Text>
                    00
                    </Text>
                  </View>
                  <Icon
                    name="chevron-right"
                    size={28}
                    color="#FFF"
                    style={{ top: '-45%', left: '26%' }}
                  />
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  Container: {
    alignItems: 'center',
    width: Dimensions.get('window').width,
    // width: 450,
    // height: Dimensions.get('window').height,
    backgroundColor: '#18142F',
    flexDirection: 'column',
  },
  btnContainer: {
    width: Dimensions.get('window').width - 50,
    height: 70,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  btnTagOne: {
    left: -8,
    backgroundColor: '#ffb72b',
    height: 40,
    width: 115,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTagTwo: {
    backgroundColor: '#24203b',
    height: 40,
    width: 55,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTagThree: {
    left: 8,
    backgroundColor: '#24203b',
    height: 40,
    width: 155,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTag: {
    fontSize: 17,
    textAlign: 'center',
  },
  ContainerList: {
    backgroundColor: '#23203F',
    marginBottom: 25,
    width: 450,
    height: 200,
    left: 30,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    flexDirection: 'column',
    justifyContent: 'center',
  },

});
