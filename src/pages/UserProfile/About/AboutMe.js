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

import Modal from "./modalFilter";
import styles from "./styles";

import ProfileInformation from "./ProfileInformation";
import AdditionalInformation from "./AdditionalInformation";
import BankInformations from "./BankInformations";
import {
  validateCPF,
  validateCNPJ
} from "~/shared/helpers/validate/ValidateCpfCnpj";
import DropdownAlert from "react-native-dropdownalert";
import normalize from "~/assets/FontSize/index";

import { reduxForm } from "redux-form";
import AsyncStorage from "@react-native-community/async-storage";
import { getAbout, decodeToken, aboutMe } from "~/shared/services/freela.http";
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
        const { email } = token;
        // photos: null,
        const get = data.result.value;
        this.setState({ avatar: get.image, email, bankCode: get.bankCode });
        this.props.initialize({
          fullName: get.name,
          nickName: get.nickName,
          description: get.description,
          height:
            get.height === 0
              ? ""
              : get.height.toString().replace(/(\d)(?=(\d{2})+(?!\d))/g, "$1,"),
          weight: get.weight === 0 ? "" : get.weight.toString(),
          clothingsSizes: get.clothingsSizes,
          professionalClothing: get.professionalClothing,
          ownTransport: get.ownTransport,
          healthProblem: get.healthProblem,
          smoke: get.smoke,
          email,
          phone: get.phone,
          birthday:
            get.birthday === "0001-01-01T00:00:00Z"
              ? new Date()
              : new Date(get.birthday),
          gender: get.gender,
          bankBranch: get.bankBranch,
          bankAccount: get.bankAccount,
          cpfCnpj: get.cpf === null ? get.cnpj : get.cpf,
          owner: get.owner
        });
        console.log(data);
        debugger;
      })
      .catch(error => {
        console.log(error.response.data);
      });
    const { handleSubmit } = this.props;
    await this.props.navigation.setParams({
      handleSave: handleSubmit(data => this.UpdateAboutMe(data))
    });
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
    debugger;
    const h = height === "" ? 0 : Number(height.replace(",", ""));
    const w = weight === "" ? 0 : Number(weight);
    debugger;
    const { avatarUrl, bankCode } = this.state;
    const request = {
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
      cnpj: cpfCnpj.length < 14 ? null : cpfCnpj,
      cpf: cpfCnpj.length > 11 ? null : cpfCnpj,
      owner,
      lat: "-23.993860",
      long: "-46.255959",
      // photos,
      email,
      phone,
      birthday,
      gender
    };
    const validate = cpfCnpj.replace(/[\(\)\.\s-]+/g, "");
    const teste =
      validate.length > 11 ? validateCNPJ(validate) : validateCPF(validate);
    if (teste === false) {
      this.dropDownAlertRef.alertWithType(
        "error",
        "Erro",
        "Cpf/Cnpj inválido."
      );
    } else {
      aboutMe(request)
        .then(({ data }) => {
          if (data.isSuccess) {
            this.dropDownAlertRef.alertWithType(
              "success",
              "Sucesso",
              "Informações salvas com sucesso."
            );
          }
        })
        .catch(error => {
          console.log(error.response.data);
        });
    }
  };

  handleOnPictureAdd = () => {
    this.ImageSelector.ActionSheet.show();
  };
  handleOnPictureAddPhotos = () => {
    this.ImageSelectorPhotos.ActionSheet.show();
  };

  onPictureAdd = picture => {
    this.setState({ avatar: picture.uri, avatarUrl: picture.data });
  };

  // onPhotosAdd = picture => {
  //   this.setState({ photos: [picture] });
  //   debugger;
  // };

  bankCode = item => {
    this.setState({ bankCode: item });
  };

  render() {
    const { avatar, BoxItem, visible, bankCode } = this.state;
    return (
      <View style={styles.container}>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            position: "absolute",
            marginTop: "-14%"
          }}
        >
          <DropdownAlert
            ref={ref => (this.dropDownAlertRef = ref)}
            closeInterval={200}
          />
        </View>
        <ScrollView
          style={styles.ScrollView}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="on-drag"
        >
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
              <Text
                style={{ fontSize: normalize(14), color: "#FFF", top: "-1%" }}
              >
                Banco
              </Text>
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
          cropperCircleOverlay={true}
          width={1500}
          height={1500}
          ref={o => (this.ImageSelector = o)}
        />
        <ImageSelector
          onImageSelected={this.onPhotosAdd}
          width={1280}
          height={1000}
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
