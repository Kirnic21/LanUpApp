import React, { Component } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icons from "react-native-vector-icons/FontAwesome";
import { keyframes, stagger } from "popmotion";
import {
  Text,
  View,
  TouchableOpacity,
  Animated,
  TextInput,
  StyleSheet
} from "react-native";
import Modal, {
  ModalContent,
  SlideAnimation,
  ModalTitle,
  ModalFooter
} from "react-native-modals";
import { ProgressBar, Colors } from "react-native-paper";
import CoreTemplate from "~/shared/components/CoreTemplate";
import ListModal from "~/shared/components/ListModal";

const COUNT = 1;
const DURATION = 1100;
const initialPhase = { scale: 1, opacity: 1 };
const constructAnimations = () =>
  [...Array(COUNT).keys()].map(() => initialPhase);

class CheckOut extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      icon: "pause",
      color: "#F13567",
      text: "Pausa",
      BC: "#f1356760",
      animations: constructAnimations()
    };
  }

  componentDidMount() {
    this._isMounted = true;
    if (this._isMounted) {
      this.animateCircles();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  animateCircles = () => {
    const actions = Array(COUNT).fill(
      keyframes({
        values: [initialPhase, { scale: 1.1, opacity: 1 }, { scale: 1 }],
        duration: DURATION,
        loop: Infinity,
        yoyo: Infinity
      })
    );

    stagger(actions, DURATION / COUNT).start(animations => {
      this.setState({ animations });
    });
  };

  openRatings = () => {
    this.props.navigation.navigate("RatingsAgency");
  };

  render() {
    return (
      <CoreTemplate name="Balada TheWeek" subtitle="Bartender" fontSize={30}>
        <View style={{}}>
          <ProgressBar progress={1} color={Colors.red800} />
        </View>
        <View style={styles.Container}>
          {this.state.animations.map(({ opacity, scale }, index) => (
            <Animated.View
              key={index}
              style={[
                styles.circle,
                {
                  transform: [{ scale }],
                  opacity
                }
              ]}
            />
          ))}

          <View style={styles.ContainerCheckOut}>
            <TouchableOpacity
              style={styles.btnCheckOut}
              onPress={this.openRatings}
            >
              <Text style={styles.textCheckOut}> Fazer Check-out </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.containerCheck}>
            <TouchableOpacity style={styles.btnCheck}>
              <Icon
                name="done"
                size={45}
                color="#fff"
                style={{ left: "20%", top: "10%" }}
              />
              <Text style={styles.textCheck}>Check-in</Text>
            </TouchableOpacity>
          </View>

          <View
            style={[
              styles.containerPause,
              {
                backgroundColor: this.state.color,
                borderColor: this.state.BC
              }
            ]}
          >
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  isVisible: this.state.icon === "pause",
                  icon: "pause",
                  text: "Pausa",
                  color: "#F13567",
                  BC: "#f1356760"
                });
              }}
              style={styles.btnPause}
            >
              <Icon
                name={this.state.icon}
                size={35}
                color="#fff"
                style={{ left: "25%", top: 15 }}
              />
              <Text style={styles.textPause}>{this.state.text}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.ContainerOcorre}>
            <TouchableOpacity
              style={styles.btnOcorre}
              onPress={() => {
                this.setState({ visible: true });
              }}
            >
              <Icon
                name="error"
                size={36}
                color="#fff"
                style={{ left: "20%", top: 11 }}
              />
              <Text style={styles.textOcorre}>Ocorrência</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>Histórico do evento</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.container}>
          <Modal
            width={0.9}
            height={0.3}
            visible={this.state.visible}
            onTouchOutside={() => {
              this.setState({ visible: false });
            }}
            swipeDirection={["down", "up"]}
            modalAnimation={new SlideAnimation({ slideFrom: "bottom" })}
            modalStyle={{ backgroundColor: "#49358C", borderRadius: 20 }}
            modalTitle={
              <ModalTitle
                title="Ocorrência"
                style={{
                  backgroundColor: "#49358C",
                  borderBottomColor: "transparent"
                }}
                textStyle={styles.modalTitle}
              />
            }
            footer={
              <ModalFooter style={{ top: -30, borderTopColor: "transparent" }}>
                <View style={{ top: -15, left: 20 }}>
                  <TextInput
                    style={styles.inputModal}
                    placeholder="Digite aqui..."
                    placeholderTextColor="#828282"
                  />
                  <View
                    style={{
                      left: 225,
                      width: 100,
                      height: 48.5,
                      top: -48.4,
                      borderTopRightRadius: 40,
                      borderBottomRightRadius: 40,
                      backgroundColor: "#b6aed1"
                    }}
                  >
                    <TouchableOpacity style={{ width: 30, top: 10, left: -1 }}>
                      <Icons name="paperclip" size={30} color="#18142F" />
                    </TouchableOpacity>

                    <TouchableOpacity style={{ width: 35, top: -19, left: 25 }}>
                      <Icon name="local-see" size={30} color="#18142F" />
                    </TouchableOpacity>

                    <TouchableOpacity style={{ width: 30, top: -51, left: 60 }}>
                      <Icon name="send" size={30} color="#865FC0" />
                    </TouchableOpacity>
                  </View>
                </View>
              </ModalFooter>
            }
          >
            <ModalContent style={styles.ModalContent}>
              <Text style={styles.textModal}>O que aconteceu?</Text>
            </ModalContent>
          </Modal>
        </View>

        <View style={styles.container}>
          <Modal
            width={0.8}
            height={0.6}
            visible={this.state.isVisible}
            onTouchOutside={() => {
              this.setState({ isVisible: false });
            }}
            swipeDirection={["down", "up"]}
            modalAnimation={new SlideAnimation({ slideFrom: "bottom" })}
            modalStyle={{
              top: -50,
              width: 350,
              backgroundColor: "#49358C",
              borderRadius: 20
            }}
            modalTitle={
              <ModalTitle
                title="Pausa"
                style={{
                  backgroundColor: "#49358C",
                  borderBottomColor: "transparent"
                }}
                textStyle={styles.modalTitle}
              />
            }
            footer={
              <ModalFooter
                style={{
                  width: "90%",
                  left: "4%",
                  borderTopColor: "transparent"
                }}
              >
                <ListModal
                  title="Fumar"
                  icon="smoking-rooms"
                  onPress={() => {
                    this.setState({
                      isVisible: false,
                      icon: "play-arrow",
                      text: "voltar",
                      BC: "#86d7c96c",
                      color: "#86D7CA"
                    });
                  }}
                />
              </ModalFooter>
            }
          >
            <ModalContent style={styles.ModalContent}>
              <Text style={styles.textModal}>Para:</Text>

              <ListModal
                title="Comer"
                icon="restaurant"
                onPress={() => {
                  this.setState({
                    isVisible: false,
                    icon: "play-arrow",
                    text: "voltar",
                    BC: "#86d7c96c",
                    color: "#86D7CA"
                  });
                }}
              />
              <ListModal
                title="Banheiro"
                icon="wc"
                onPress={() => {
                  this.setState({
                    isVisible: false,
                    icon: "play-arrow",
                    text: "voltar",
                    BC: "#86d7c96c",
                    color: "#86D7CA"
                  });
                }}
              />
            </ModalContent>
          </Modal>
        </View>
      </CoreTemplate>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    borderColor: "#373361",
    borderWidth: 35,
    width: 320,
    height: 320,
    borderRadius: 175,
    alignItems: "center",
    justifyContent: "center"
  },
  circle: {
    backgroundColor: "#865fc069",
    height: 160,
    width: 160,
    borderRadius: 200,
    position: "absolute"
  },

  ContainerCheckOut: {
    top: "50%",
    left: 0.5
  },

  btnCheckOut: {
    borderRadius: 75,
    width: 140,
    height: 140,
    backgroundColor: "#865FC0"
  },

  textCheckOut: {
    color: "#FFF",
    fontSize: 24,
    textAlign: "center",
    top: 35
  },

  containerCheck: {
    height: 80,
    width: 80,
    backgroundColor: "#46C5F3",
    borderRadius: 45,
    top: "40%",
    right: 119,
    borderColor: "#46c5f33f",
    borderWidth: 3
  },

  btnCheck: {
    height: 80,
    width: 80
  },
  textCheck: {
    color: "#FFF",
    top: "-2%",
    left: 9,
    fontSize: 12,
    letterSpacing: 1
  },

  containerPause: {
    height: 80,
    width: 80,
    borderWidth: 3,
    borderRadius: 45,
    top: "10%",
    left: 115
  },
  btnPause: {
    height: 80,
    width: 80
  },
  textPause: {
    color: "#FFF",
    fontSize: 12,
    letterSpacing: 1,
    left: 18,
    top: 10
  },

  ContainerOcorre: {
    width: 90,
    height: 90,
    backgroundColor: "#FFB72B",
    borderRadius: 50,
    borderColor: "#ffb82b34",
    borderWidth: 9,
    top: -10
  },
  btnOcorre: {
    width: 90,
    height: 90
  },

  textOcorre: {
    color: "#fff",
    fontSize: 11,
    left: 8,
    top: "8%",
    fontWeight: "bold"
  },

  btnContainer: {
    flexDirection: "row",
    width: 230,
    margin: 20,
    top: "10%"
  },
  btn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "white",
    borderWidth: 1.5,
    borderRadius: 50,
    height: 50,
    top: 15
  },
  btnText: {
    color: "white",
    fontSize: 14
  },
  ModalContent: {
    backgroundColor: "#49358C",
    height: "50%"
  },
  modalTitle: {
    color: "#fff",
    top: 10,
    padding: 7,
    fontSize: 20,
    fontWeight: "normal"
  },
  inputModal: {
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: 40,
    width: 240,
    fontSize: 18,
    paddingLeft: 25,
    backgroundColor: "#b6aed1",
    color: "#24203B",
    left: -10
  },
  textModal: {
    color: "#FFF",
    fontSize: 20,
    left: 5,
    letterSpacing: 1,
    top: 20,
    fontWeight: "bold"
  }
});

export default CheckOut;
