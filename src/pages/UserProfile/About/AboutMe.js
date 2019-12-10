import React, { Component } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
  TouchableHighlightComponent
} from "react-native";

import ImageBody from "~/assets/images/icon_addbody.png";
import ImageSelf from "~/assets/images/icon_addselfie.png";
import AddIcon from "~/assets/images/icon_add.png";
import ImageSelector from "~/shared/components/ImageSelector";

import InputField from "~/shared/components/InputField";
import Input from "~/shared/components/InputLabel";

import Modal from "./modalFilter";
import styles from "./styles";

import ProfileInformation from "./ProfileInformation";
import AdditionalInformation from "./AdditionalInformation";
import BankInformations from "./BankInformations";

import { Field, reduxForm } from "redux-form";
import AsyncStorage from "@react-native-community/async-storage";
import { getAbout, decodeToken, aboutMe } from "~/shared/services/freela.http";
import moment from "moment";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { setAbout } from "~/store/ducks/aboutMe/about.actions";

class AboutMe extends Component {
  state = {
    visible: false,
    bankCode: "",
    BoxItem: [
      {
        id: 1,
        icon: ImageSelf,
        onPress: () => this.handleOnPictureAddPhotos()
      },
      {
        id: 2,
        icon: ImageSelf,
        onPress: this.SelectedInput
      },
      {
        id: 3,
        icon: ImageBody,
        onPress: this.SelectedInput
      },
      {
        id: 4,
        icon: ImageBody,
        onPress: this.SelectedInput
      }
    ],
    avatar: null
  };

  async componentDidMount() {
    const token = decodeToken(await AsyncStorage.getItem("API_TOKEN"));
    getAbout(token.id)
      .then(({ data }) => {
        const { email, avatarUrl } = token;
        // photos: null,
        // latitude: null
        // longitude: null
        this.setState({ avatar: avatarUrl, email });
        const get = data.result.value;
        this.props.initialize({
          fullName: get.name,
          nickName: get.nickName,
          description: get.description,
          height: get.height.toString(),
          weight: get.weight.toString(),
          clothingsSizes: get.clothingsSizes,
          professionalClothing: get.professionalClothing,
          ownTransport: get.ownTransport,
          healthProblem: get.healthProblem,
          smoke: get.smoke,
          email,
          phone: get.phone,
          birthday: new Date(get.birthday),
          gender: get.gender,
          bankBranch: get.bankBranch,
          bankAccount: get.bankAccount,
          cpfCnpj: get.cnpj || get.cpf,
          owner: get.owner
        });
        debugger;
        console.log(data);
      })
      .catch(error => {
        debugger;
        console.log(error.response.data);
      });
    const { handleSubmit } = this.props;
    await this.props.navigation.setParams({
      handleSave: handleSubmit(data => this.UpdateAboutMe(data))
    });
    debugger;
  }

  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    return {
      headerRight: (
        <TouchableOpacity
          onPress={() => state.params.handleSave()}
          style={{
            paddingHorizontal: 29,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text style={{ color: "#FFF" }}>Salvar</Text>
        </TouchableOpacity>
      )
    };
  };

  UpdateAboutMe = async form => {
    const token = decodeToken(await AsyncStorage.getItem("API_TOKEN"));
    const {
      fullName,
      nickName,
      description,
      height,
      weight,
      clothingsSizes,
      professionalClothing,
      ownTransport,
      healthProblem,
      smoke,
      phone,
      birthday,
      email,
      gender,
      bankBranch,
      bankAccount,
      cpfCnpj,
      owner
    } = form;
    const h = Number(height);
    const w = Number(weight);
    debugger;
    const { avatarUrl, bankCode } = this.state;
    aboutMe({
      freelaId: token.id,
      avatar: avatarUrl,
      fullName,
      nickName,
      description,
      height: h,
      weight: w,
      clothingsSizes,
      professionalClothing,
      ownTransport,
      healthProblem,
      smoke,
      bankCode,
      bankBranch,
      bankAccount,
      cnpj: cpfCnpj,
      cpf: cpfCnpj,
      owner,
      // lat,
      // long,
      // photos,
      email,
      phone,
      birthday,
      gender
    })
      .then(({ data }) => {
        debugger;
        if (data.isSuccess) {
          console.log(data);
        }
      })
      .catch(error => {
        debugger;
        console.log(error.response.data);
      });
    debugger;
  };

  handleOnPictureAdd = () => {
    this.ImageSelector.ActionSheet.show();
  };
  handleOnPictureAddPhotos = () => {
    this.ImageSelectorPhotos.ActionSheet.show();
  };

  onPictureAdd = picture => {
    this.setState({ avatar: picture.uri, avatarUrl: picture.data });
    debugger;
  };

  onPhotosAdd = picture => {
    this.setState({ photos: [picture] });
    debugger;
  };

  bankCode = item => {
    this.setState({ bankCode: item });
    debugger;
  };

  render() {
    const { avatar, BoxItem, visible, bankCode } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.ScrollView}>
          <View style={styles.containerAvatar}>
            <TouchableOpacity
              style={{ width: 100 }}
              onPress={this.handleOnPictureAdd}
            >
              <Image source={{ uri: avatar }} style={styles.Avatar} />
              <Image source={AddIcon} style={styles.iconAvatar} />
            </TouchableOpacity>
          </View>
          <ProfileInformation />
          {/* <View style={styles.containerLocation}>
            <Text style={{ color: "#FFF", fontSize: 16, paddingBottom: "7%" }}>
              Localização
            </Text>
            <Field
              style={{ width: "100%" }}
              component={InputField}
              name={"location"}
            />
          </View> */}
          {/* <View style={styles.containerPresentationPhoto}>
            <Text style={{ color: "#FFF", fontSize: 16, paddingBottom: "3%" }}>
              Fotos de apresentação
            </Text>
            <Text style={{ color: "#ffffffad", paddingBottom: "6%" }}>
              2 de perfil (sozinho) e 2 de corpo inteiro
            </Text>
            <View style={{ flexDirection: "row" }}>
              {BoxItem.map(({ icon, id, onPress }) => (
                <TouchableOpacity
                  key={id}
                  onPress={onPress}
                  style={styles.thumbnail}
                >
                  <Image source={icon} style={styles.photo} />
                </TouchableOpacity>
              ))}
            </View>
          </View> */}
          <AdditionalInformation />
          <BankInformations>
            <View>
              <Text style={{ fontSize: 15, color: "#FFF" }}>Banco</Text>
              <TouchableOpacity
                style={styles.btnBank}
                onPress={() => {
                  this.setState({ visible: true });
                }}
              >
                <Text style={{ color: "#FFF", paddingHorizontal: "15%" }}>
                  {bankCode}
                </Text>
                <Modal
                  onPress={item => {
                    this.bankCode(item);

                    this.setState({ visible: false });
                  }}
                  onTouchOutside={() => {
                    this.setState({ visible: false });
                  }}
                  visible={visible}
                />
              </TouchableOpacity>
            </View>
          </BankInformations>
        </ScrollView>
        <ImageSelector
          onImageSelected={this.onPictureAdd}
          width={1280}
          height={720}
          ref={o => (this.ImageSelector = o)}
        />
        <ImageSelector
          onImageSelected={this.onPhotosAdd}
          width={1280}
          height={720}
          ref={o => (this.ImageSelectorPhotos = o)}
        />
      </View>
    );
  }
}

(mapDispatchToProps = dispatch => bindActionCreators({ setAbout }, dispatch)),
  connect(null, mapDispatchToProps)(AboutMe);

AboutMe = reduxForm({ form: "AboutMe" })(AboutMe);

export default AboutMe;
