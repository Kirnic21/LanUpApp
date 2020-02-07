import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  SafeAreaView
} from "react-native";
import ImageBack from "~/assets/images/Grupo_518.png";
import dimensions from "~/assets/Dimensions";
import { TouchableOpacity } from "react-native-gesture-handler";
import ButtonPulse from "~/shared/components/ButtonPulse";
import { Dimensions } from "react-native";
import styles from "./styles";
import ModalCheckList from "./ModalCheckList";
class NextEvent extends React.Component {
  state = {
    visible: false,
    bottomModalAndTitle: true
  };

  closeModal = () => {
    this.setState({ visible: false });
  };

  toCheckIn = () => {
    this.setState({ visible: true });
  };

  render() {
    const { visible } = this.state;
    return (
      <ImageBackground source={ImageBack} style={{ flex: 1 }}>
        <SafeAreaView style={styles.container}>
          <StatusBar backgroundColor="transparent" translucent={true} />
          <View style={styles.containerTitle}>
            <View>
              <Text numberOfLines={1} style={styles.textTitle}>
                Balada TheWeek
              </Text>
              <Text style={styles.TextsubTitle}>Bartender</Text>
            </View>
          </View>
          <View style={styles.containerCircle}>
            <View style={styles.borderCircle}>
              <ButtonPulse
                title={`Iniciar${"\n"}Check-in`}
                titleStyle={{
                  color: "#FFF",
                  fontSize: dimensions(18),
                  textAlign: "center",
                  lineHeight: dimensions(26),
                  fontFamily: "HelveticaNowMicro-Regular"
                }}
                startAnimations={true}
                circleStyle={{ backgroundColor: "#46c5f35d" }}
                styleButton={{ backgroundColor: "#46C5F3" }}
                onPress={() => this.toCheckIn()}
              >
                {/* <Text>te</Text> */}
              </ButtonPulse>
              {/* <View style={styles.containerButtonPulse}>
                <ButtonPulse
                  styleButton={[
                    styles.ButtonHeightWidth,
                    styles.ButtonPulseLeft
                  ]}
                />
                <ButtonPulse
                  startAnimations={true}
                  styleButton={[
                    styles.ButtonHeightWidth,
                    styles.buttonOccurrence,
                    { top: "20%", backgroundColor: "#FFB72B" }
                  ]}
                  circleStyle={[
                    {
                      height: dimensions(75),
                      width: dimensions(75),
                      top: "21.5%"
                    },
                    styles.circleOccurence
                  ]}
                />
                <ButtonPulse
                  styleButton={[
                    styles.ButtonHeightWidth,
                    {
                      top: "-50%",
                      borderColor: "#f1356760",
                      borderWidth: 2,
                      backgroundColor: "#F13567"
                    }
                  ]}
                  circleStyle={{ height: 10, width: 10 }}
                />
              </View> */}
            </View>
          </View>
          <View
            style={{
              width: "100%",
              height: "25%",
              alignItems: "center"
            }}
          >
            {/* <TouchableOpacity
              style={{
                borderColor: "#FFF",
                borderWidth: 2,
                height: dimensions(45),
                width: dimensions(200),
                borderRadius: dimensions(45),
                top: "75%"
              }}
            >
              <Text>aaaa</Text>
            </TouchableOpacity> */}
          </View>
        </SafeAreaView>
        <ModalCheckList
          visible={visible}
          onClose={() => this.closeModal()}
          onTouchOutside={() => this.closeModal()}
          onSwipeOut={() => this.setState({ bottomModalAndTitle: false })}
        />
      </ImageBackground>
    );
  }
}

export default NextEvent;
