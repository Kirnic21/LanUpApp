import React, { Component } from "react";
import { CommonActions } from "@react-navigation/native";
import { DrawerActions } from '@react-navigation/drawer';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import imgTitle from "~/assets/images/imgDrawer.png";
import imgBack from "~/assets/images/drawerBack.png";
import IconMenu from "~/assets/images/icon_menu.png";
import iconNextEvent from "~/assets/images/iconNextEvent.png";
import iconExplore from "~/assets/images/iconExplore.png";
import iconSchedule from "~/assets/images/iconSchedule.png";
import { connect } from "react-redux";
import dimensions, { adjust } from "~/assets/Dimensions/index";

class DrawerContentComponents extends Component {
  state = { visible: false };

  navigateToScreen = (route) => () => {
    const navigateAction = CommonActions.navigate({
      name: route,
    });
    this.props.navigation.dispatch(navigateAction);
  };

  render() {
    const { image, nickName } = this.props;
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
          borderRightWidth: 2,
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
                height: dimensions(30),
              }}
            />
            <TouchableOpacity
              style={{ left: "-10%" }}
              onPress={() => {
                this.props.navigation.dispatch(DrawerActions.closeDrawer());
              }}
              testID="br.com.lanup.app:id/menu-icon"
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
                fontSize: adjust(11),
                fontFamily: "HelveticaNowMicro-Regular",
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
                marginBottom: "18%",
              }}
              testID="br.com.lanup.app:id/perfil"
            >
              <Image
                source={{ uri: image }}
                style={[
                  {
                    borderRadius: 40,
                    borderColor: "#865FC0",
                    borderWidth: 2,
                  },
                  styles.sizeIcons,
                ]}
              />
              <Text style={styles.screenTextStyle}>Perfil</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={this.navigateToScreen("NextEvent")}
              style={styles.containerIcons}
              testID="br.com.lanup.app:id/estou-a-caminho"
            >
              <Image source={iconNextEvent} style={styles.sizeIcons} />
              <Text
                style={styles.screenTextStyle}
              >{`Estou${"\n"}a${"\n"}caminho`}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={this.navigateToScreen("ToExplore")}
              style={[styles.containerIcons, { height: "22%" }]}
              testID="br.com.lanup.app:id/vagas"
            >
              <Image source={iconExplore} style={styles.sizeIcons} />
              <Text style={styles.screenTextStyle}>Vagas</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={this.navigateToScreen("Schedule")}
              testID="br.com.lanup.app:id/escalas"
            >
              <Image source={iconSchedule} style={styles.sizeIcons} />
              <Text style={[styles.screenTextStyle, { borderBottomWidth: 0 }]}>
                Escalas
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
    width: "100%",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    height: "8%",
    width: "90%",
  },
  screenContainer: {
    width: "90%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "75%",
    top: "-11.5%",
  },
  nickNameContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: "-50%",
  },
  sizeIcons: {
    width: dimensions(55),
    height: dimensions(55),
  },
  screenTextStyle: {
    fontSize: adjust(12),
    fontFamily: "SegoeUI",
    textAlign: "center",
    color: "#FFF",
  },
  containerIcons: {
    width: "70%",
    height: "25%",
    alignItems: "center",
    borderBottomColor: "#865FC0",
    borderBottomWidth: 2,
    marginBottom: "18%",
  },
});

const mapStateToProps = (state) => {
  const {
    about: { nickName, image },
  } = state.aboutMe;
  return {
    nickName,
    image,
  };
};

export default connect(mapStateToProps, null)(DrawerContentComponents);
