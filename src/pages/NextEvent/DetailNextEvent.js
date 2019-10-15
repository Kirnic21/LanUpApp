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
import CoreTemplate from "~/shared/components/CoreTemplate";
import ListModal from "~/shared/components/ListModal";
import * as Progress from "react-native-progress";

const COUNT = 1;
const DURATION = 1100;
const initialPhase = { scale: 1, opacity: 1 };
const constructAnimations = () =>
  [...Array(COUNT).keys()].map(() => initialPhase);

class DetailNextEvent extends Component {
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
    this.animateCircles();
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

  openCheckOut = () => {
    this.props.navigation.navigate("CheckOut");
  };

  render() {
    return (
      <CoreTemplate name="Balada TheWeek" subtitle="Bartender" fontSize={35}>
        <View style={{ top: "-5%" }}>
          <Progress.Bar
            progress={1}
            width={300}
            height={5}
            color="#46C5F3"
            style={{
              backgroundColor: "#FFF",
              borderColor: "transparent"
            }}
          />
          <Text
            style={{
              color: "#FFF",
              textAlign: "right",
              top: "20%"
            }}
          >
            Horas trabalhadas: <Text style={{ color: "#46C5F3" }}>8h10min</Text>
          </Text>
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

          <View style={styles.ContainerOcorre}>
            <TouchableOpacity
              style={styles.btnOcorre}
              onPress={() => {
                this.setState({ visible: true });
              }}
            >
              <Icon
                name="error"
                size={60}
                color="#fff"
                style={{ left: "28%", top: "20%" }}
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
                style={{ left: "22%", top: "10%" }}
              />
              <Text style={styles.textPause}>{this.state.text}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btn} onPress={this.openCheckOut}>
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
    top: "-1%",
    borderColor: "#373361",
    borderWidth: 35,
    width: 320,
    height: 320,
    borderRadius: 175,
    alignItems: "center",
    justifyContent: "center"
  },
  circle: {
    backgroundColor: "#ffb82b34",
    height: 150,
    width: 150,
    borderRadius: 200,
    position: "absolute"
  },

  ContainerOcorre: { top: "32%" },
  btnOcorre: {
    borderRadius: 75,
    width: 130,
    height: 130,
    backgroundColor: "#FFB72B"
  },

  containerCheck: {
    height: 80,
    width: 80,
    backgroundColor: "#46C5F3",
    borderRadius: 45,
    top: "25%",
    right: "47%",
    borderColor: "#46c5f33f",
    borderWidth: 3
  },

  btnCheck: {
    height: 90,
    width: 90
  },
  textCheck: {
    color: "#FFF",
    top: 1,
    left: 9,
    fontSize: 14,
    letterSpacing: 1
  },

  containerPause: {
    height: 80,
    width: 80,
    // backgroundColor:{state.color},
    borderWidth: 3,
    borderRadius: 45,
    top: "-1%",
    left: "45%"
  },
  btnPause: {
    height: 90,
    width: 90
  },
  textPause: {
    color: "#FFF",
    fontSize: 14,
    letterSpacing: 1,
    left: "17%",
    top: "6%"
  },

  btnContainer: {
    flexDirection: "row",
    width: 230,
    margin: 20
  },
  btn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "white",
    borderWidth: 1.5,
    borderRadius: 50,
    height: 50,
    top: -10
  },
  btnText: {
    color: "white",
    fontSize: 14
  },
  textOcorre: {
    color: "#fff",
    fontSize: 16,
    letterSpacing: 1.5,
    left: "15%",
    top: "15%"
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

export default DetailNextEvent;
