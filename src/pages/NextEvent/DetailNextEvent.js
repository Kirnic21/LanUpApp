import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/FontAwesome';
import { keyframes, stagger } from 'popmotion';
import { Overlay } from 'react-native-elements';
// import Modal from 'react-native-modal';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Modal,
  TextInput,
} from 'react-native';
import CoreTemplate from '~/shared/components/CoreTemplate';

const COUNT = 1;
const DURATION = 1100;
const initialPhase = { scale: 1, opacity: 1 };
const constructAnimations = () => [...Array(COUNT).keys()].map(() => (initialPhase));


class DetailNextEvent extends Component {
  state = {
    animations: constructAnimations(),
    modalVisible: false,
  };

  setModalVisible(modalVisible) {
    this.setState({ modalVisible });
  }

  componentDidMount() {
    this.animateCircles();
  }

  animateCircles = () => {
    const actions = Array(COUNT).fill(
      keyframes({
        values: [
          initialPhase,
          { scale: 1.1, opacity: 1 },
          { scale: 1 },
        ],
        duration: DURATION,
        loop: Infinity,
        yoyo: Infinity,
      }),
    );

    stagger(actions, DURATION / COUNT).start((animations) => {
      this.setState({ animations });
    });
  }

  render() {
    return (
      <CoreTemplate name="Balada TheWeek" subtitle="Bartender">
        <View style={styles.Container}>
          {this.state.animations.map(({ opacity, scale }, index) => (
            <Animated.View
              key={index}
              style={[styles.circle, {
                transform: [{ scale }],
                opacity,
              }]}
            />
          ))}

          <View style={styles.ContainerOcorre}>
            <TouchableOpacity
              style={styles.btnOcorre}

              onPress={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}
            >
              <Icon
                name="error"
                size={60}
                color="#fff"
                style={{ left: 45, top: 35 }}
              />
              <Text style={styles.textOcorre}>Ocorrência</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.containerCheck}>
            <TouchableOpacity style={styles.btnCheck}>
              <Icon
                name="done"
                size={45}
                color="#fff"
                style={{ left: 20, top: 10 }}
              />
              <Text style={styles.textCheck}>Check-in</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.containerPause}>
            <TouchableOpacity style={styles.btnPause}>
              <Icon
                name="pause"
                size={35}
                color="#fff"
                style={{ left: 26, top: 15 }}
              />
              <Text style={styles.textPause}>Pausa</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>Histórico do evento</Text>
          </TouchableOpacity>
        </View>

        <Modal
          animationType="slide"
          transparent
          visible={this.state.modalVisible}
        >
          <TouchableWithoutFeedback onPress={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}
          >
            <View style={styles.modalContainer}>
              <TouchableWithoutFeedback onPress={() => { }}>
                <View style={styles.modal}>
                  <Text style={styles.titleModal}>Ocorrência</Text>
                  <Text style={styles.labelModal}>O que aconteceu?</Text>

                  <View style={{ top: 105, left: 16 }}>
                    <TextInput
                      style={{
                        borderRadius: 40,
                        width: 320,
                        fontSize: 18,
                        paddingLeft: 25,
                        backgroundColor: '#b6aed1',
                        color: '#24203B',
                      }}
                      placeholder="Digite aqui..."
                      placeholderTextColor="#828282"
                    />
                    <Icons
                      name="paperclip"
                      size={30}
                      color="#18142F"
                      style={{ left: 215, top: -40 }}
                    />
                    <Icon
                      name="local-see"
                      size={30}
                      color="#18142F"
                      style={{ left: 245, top: -70 }}
                    />
                    <Icon
                      name="send"
                      size={30}
                      color="#865FC0"
                      style={{ left: 280, top: -100 }}
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

      </CoreTemplate>
    );
  }
}


const styles = StyleSheet.create({
  Container: {
    top: -45,
    borderColor: '#373361',
    borderWidth: 35,
    width: 350,
    height: 350,
    borderRadius: 175,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    backgroundColor: '#ffb82b34',
    height: 170,
    width: 170,
    borderRadius: 200,
    position: 'absolute',
  },

  ContainerOcorre: { top: 90 },
  btnOcorre: {
    borderRadius: 75,
    width: 150,
    height: 150,
    backgroundColor: '#FFB72B',
  },

  containerCheck: {
    height: 90,
    width: 90,
    backgroundColor: '#46C5F3',
    borderRadius: 45,
    top: 75,
    right: 126,
    borderColor: '#46c5f33f',
    borderWidth: 3,
  },

  btnCheck: {
    height: 90,
    width: 90,
  },
  textCheck: {
    color: '#FFF',
    top: 1,
    left: 9,
    fontSize: 14,
    letterSpacing: 1,
  },

  containerPause: {
    height: 90,
    width: 90,
    backgroundColor: '#F13567',
    borderColor: '#f1356760',
    borderWidth: 3,
    borderRadius: 45,
    top: -15,
    left: 120,
  },
  btnPause: {
    height: 90,
    width: 90,
  },
  textPause: {
    color: '#FFF',
    fontSize: 15,
    letterSpacing: 1,
    left: 18,
    top: 10,
  },


  btnContainer: {
    flexDirection: 'row',
    width: 230,
    margin: 20,
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 1.5,
    borderRadius: 50,
    height: 50,
    top: -10,
  },
  btnText: {
    color: 'white',
    fontSize: 14,
  },
  textOcorre: {
    color: '#fff',
    fontSize: 17,
    letterSpacing: 1.5,
    left: 26,
    top: 30,
  },
  modalContainer: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',

  },
  modal: {
    width: '90%',
    height: '30%',
    backgroundColor: '#49358C',
    borderRadius: 20,
    top: -39,
  },
  titleModal: {
    textAlign: 'center',
    top: 50,
    fontSize: 20,
    letterSpacing: 1,
    color: '#FFF',
  },
  labelModal: {
    color: '#fff',
    top: 75,
    left: 20,
    fontSize: 20,
    letterSpacing: 2,
  },
});

export default DetailNextEvent;
