import React, { Component } from "react";
import {
  NavigationActions,
  DrawerActions,
  StackActions
} from "react-navigation";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  Dimensions
} from "react-native";
// import { white } from 'ansi-colors';
import { ScrollView } from "react-native-gesture-handler";
import imgTitle from "~/assets/images/imgDrawer.png";
import imgBack from "~/assets/images/drawerBack.png";
import IconMenu from "~/assets/images/icon_menu.png";
import iconNextEvent from "~/assets/images/iconNextEvent.png";
import iconExplore from "~/assets/images/iconExplore.png";
import iconSchedule from "~/assets/images/iconSchedule.png";
import AsyncStorage from "@react-native-community/async-storage";
import { getAbout, decodeToken } from "~/shared/services/freela.http";
import dimensions from "~/assets/Dimensions/index";

export default class drawerContentComponents extends Component {
  state = {
    avatar: null,
    nickName: "",
    visible: false
  };

  async componentDidMount() {
    const token = decodeToken(await AsyncStorage.getItem("API_TOKEN"));
    getAbout(token.id)
      .then(({ data }) => {
        const { nickName, image } = data.result.value;
        this.setState({ avatar: image, nickName });
      })
      .catch(error => {
        console.log(error.response.data);
      });
  }

  navigateToScreen = route => () => {
    const navigateAction = StackActions.push({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  };

  openModal = () => {
    this.setState({ visible: true });
  };
  closeModal = () => {
    this.setState({ visible: false });
  };

  render() {
    const { avatar, nickName, visible } = this.state;
    const { height } = Dimensions.get("screen");
    return (
      <ImageBackground
        source={imgBack}
        style={{
          flex: 1,
          height: height,
          backgroundColor: "#24203BE6",
          elevation: 2,
          borderRightColor: "#EB48864D",
          borderRightWidth: 2
        }}
        resizeMode="cover"
        imageStyle={{ opacity: 0.3 }}
      >
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Image
              source={imgTitle}
              style={{
                width: dimensions(90),
                height: dimensions(30)
              }}
            />
            <TouchableOpacity
              style={{ left: "-10%" }}
              onPress={() => {
                this.props.navigation.dispatch(DrawerActions.closeDrawer());
              }}
            >
              <Image
                style={{ height: dimensions(30), width: dimensions(35) }}
                source={IconMenu}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.nickNameContainer}>
            <Text
              style={{
                color: "#fff",
                fontSize: dimensions(13),
                fontFamily: "HelveticaNowMicro-Regular"
              }}
            >
              @{nickName}
            </Text>
          </View>
          <View style={styles.screenContainer}>
            <TouchableOpacity
              onPress={this.navigateToScreen("UserProfile")}
              style={{
                width: "70%",
                height: "22%",
                alignItems: "center",
                borderBottomColor: "#865FC0",
                borderBottomWidth: 2,
                marginBottom: "18%"
              }}
            >
              <Image
                source={{ uri: avatar }}
                style={[
                  {
                    borderRadius: 40,
                    borderColor: "#865FC0",
                    borderWidth: 2
                  },
                  styles.sizeIcons
                ]}
              />
              <Text style={styles.screenTextStyle}>Perfil</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={this.navigateToScreen("NextEvent")}
              // onPress={() => {
              //   this.openModal(),
              //     this.props.navigation.dispatch(DrawerActions.closeDrawer());
              // }}
              style={styles.containerIcons}
            >
              <Image source={iconNextEvent} style={styles.sizeIcons} />
              <Text style={styles.screenTextStyle}>Próximo Evento</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={this.navigateToScreen("ToExplore")}
              style={[styles.containerIcons, { height: "22%" }]}
            >
              <Image source={iconExplore} style={styles.sizeIcons} />
              <Text style={styles.screenTextStyle}>Explorar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.navigateToScreen("Schedule")}>
              <Image source={iconSchedule} style={styles.sizeIcons} />
              <Text style={[styles.screenTextStyle, { borderBottomWidth: 0 }]}>
                Agenda
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <ModalComingSoon
          onTouchOutside={() => this.closeModal()}
          onClose={() => this.closeModal()}
          visible={visible}
          onSwipeOut={() => this.setState({ bottomModalAndTitle: false })}
        />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%"
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    height: "8%",
    width: "90%"
  },
  screenContainer: {
    width: "90%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "75%",
    top: "-11.5%"
  },
  nickNameContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: "-45%"
  },
  sizeIcons: {
    width: dimensions(55),
    height: dimensions(55)
  },
  screenTextStyle: {
    fontSize: dimensions(14),
    fontFamily: "SegoeUI",
    textAlign: "center",
    color: "#FFF"
  },
  containerIcons: {
    width: "70%",
    height: "25%",
    alignItems: "center",
    borderBottomColor: "#865FC0",
    borderBottomWidth: 2,
    marginBottom: "18%"
  }
});
