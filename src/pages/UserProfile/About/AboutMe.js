import React, { Component } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
  FlatList,
  TouchableHighlightComponent
} from "react-native";

import ImageBody from "~/assets/images/icon_addbody.png";
import ImageSelf from "~/assets/images/icon_addselfie.png";
import AddIcon from "~/assets/images/icon_add.png";
import ImageSelector from "~/shared/components/ImageSelector";
import dimensions from "~/assets/Dimensions/index";

import styles from "./styles";

import ProfileInformation from "./ProfileInformation";
import AdditionalInformation from "./AdditionalInformation";
import BankInformations from "./BankInformations";
import {
  validateCPF,
  validateCNPJ
} from "~/shared/helpers/validate/ValidateCpfCnpj";
import DropdownAlert from "react-native-dropdownalert";

import { reduxForm, Field } from "redux-form";
import AsyncStorage from "@react-native-community/async-storage";
import { getAbout, decodeToken, aboutMe } from "~/shared/services/freela.http";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { setAbout } from "~/store/ducks/aboutMe/about.actions";
import OccupationArea from "./OccupationArea";
import PresentationPictures from "./PresentationPictures";
class AboutMe extends Component {
  state = {
    visible: false,
    bankCode: "",
    address: "",
    BoxItem: [
      {
        id: 1,
        icon: ImageSelf
      },
      {
        id: 2,
        icon: ImageSelf
      },
      {
        id: 3,
        icon: ImageBody
      },
      {
        id: 4,
        icon: ImageBody
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
        this.setState({
          avatar: get.image,
          email,
          bankCode: get.bankCode,
          address: get.address,
          lat: get.latitude,
          long: get.longitude
        });
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
              ? ""
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
    const h = height === "" ? 0 : Number(height.replace(",", ""));
    const w = weight === "" ? 0 : Number(weight);
    const {
      avatarUrl,
      bankCode,
      googleAddress,
      lat,
      long,
      address
    } = this.state;
    debugger;
    const latitude = lat === null ? lat : lat.toString();
    const longitude = long === null ? long : long.toString();

    debugger;
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
      address,
      lat: latitude,
      long: longitude,
      // photos,
      email,
      phone,
      birthday: birthday === "" ? "0001-01-01T00:00:00Z" : birthday,
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
            debugger;
            this.dropDownAlertRef.alertWithType(
              "success",
              "Sucesso",
              "Informações salvas com sucesso."
            );
          }
        })
        .catch(error => {
          debugger;
          this.dropDownAlertRef.alertWithType(
            "error",
            "Erro",
            "Área de atuação não informada."
          );
          console.log(error.response.data);
        });
    }
    debugger;
  };

  handleOnPictureAdd = () => {
    this.ImageSelector.ActionSheet.show();
  };
  handleOnPictureAddPhotos = (e, index) => {
    debugger;
    this.ImageSelectorPhotos.ActionSheet.show();
    const { BoxItem } = this.state;
    const img = BoxItem;
    const buttonSelected = index - 1;
    this.setState({ IconId: buttonSelected });
  };

  onPictureAdd = picture => {
    this.setState({ avatar: picture.uri, avatarUrl: picture.data });
  };

  onPhotosAdd = photo => {
    const { BoxItem, IconId } = this.state;

    debugger;
    BoxItem[IconId].icon = photo.uri;
    console.log("passou");
    this.setState({ photos: photo.uri });
  };

  xpto = e => {
    console.log(e);
    this.setState({
      googleAddress: e,
      address: e.address,
      lat: e.location.latitude,
      long: e.location.longitude
    });
  };

  // click = (e, index) => {

  //   // buttonSelected.isSelected = !buttonSelected.isSelected;
  //   // this.setState(prev => ({ ...prev, buttons }));

  //   // const name = buttons.filter(c => c.isSelected === true).map(c => c.name);
  //   // this.setState({ jobs: name });
  // };

  // onPhotosAdd = picture => {
  //   this.setState({ photos: [picture] });
  //   debugger;
  // };

  bankCode = item => {
    this.setState({ bankCode: item });
  };

  render() {
    const { avatar, BoxItem, visible, bankCode, address } = this.state;
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
              style={{ width: dimensions(90) }}
              onPress={this.handleOnPictureAdd}
            >
              <Image source={{ uri: avatar }} style={styles.Avatar} />
              <Image source={AddIcon} style={styles.iconAvatar} />
            </TouchableOpacity>
          </View>
          <ProfileInformation />
          <OccupationArea
            address={address}
            onPress={item => {
              this.xpto(item);
            }}
          />
          <PresentationPictures>
            {BoxItem.map(({ icon, id }) => (
              <TouchableOpacity
                key={id}
                onPress={e => this.handleOnPictureAddPhotos(e, id)}
                style={styles.thumbnail}
              >
                <Image source={icon} style={styles.photo} />
              </TouchableOpacity>
            ))}
          </PresentationPictures>
          <AdditionalInformation />
          <BankInformations
            bankCode={bankCode}
            onPress={item => {
              this.bankCode(item);
            }}
          />
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
