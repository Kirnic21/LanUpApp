import React, { Component } from "react";
import { View, TouchableOpacity, ScrollView, Text } from "react-native";

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
  validateCNPJ,
} from "~/shared/helpers/validate/ValidateCpfCnpj";
import { reduxForm } from "redux-form";
import AsyncStorage from "@react-native-community/async-storage";
import { decodeToken, aboutMe } from "~/shared/services/freela.http";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { setAbout } from "~/store/ducks/aboutMe/about.actions";
import OccupationArea from "./OccupationArea";
import PresentationPictures from "./PresentationPictures";
import FastImage from "react-native-fast-image";
import { AlertHelper } from "~/shared/helpers/AlertHelper";
import ButtonRightNavigation from "~/shared/components/ButtonRightNavigation";
import SpinnerComponent from "~/shared/components/SpinnerComponent";
class AboutMe extends Component {
  state = {
    visible: false,
    spinner: false,
    bankCode: "",
    address: "",
    BoxItem: [
      {
        id: 1,
        icon: ImageSelf,
      },
      {
        id: 2,
        icon: ImageSelf,
      },
      {
        id: 3,
        icon: ImageBody,
      },
      {
        id: 4,
        icon: ImageBody,
      },
    ],
    avatar: null,
    photos: [],
  };

  async componentDidMount() {
    const { Email } = decodeToken(await AsyncStorage.getItem("API_TOKEN"));
    const { BoxItem } = this.state;
    this.setState({ spinner: true }, () => {
      const {
        name: fullName,
        bankAccount,
        bankBranch,
        birthday,
        clothingsSizes,
        cpf,
        cnpj,
        description,
        nickName,
        height,
        weight,
        professionalClothing,
        ownTransport,
        healthProblem,
        smoke,
        phone,
        photos,
        image: avatar,
        bankCode,
        address,
        latitude: lat,
        longitude: long,
        gender,
        owner,
      } = this.props.aboutMe;

      this.props.initialize({
        fullName,
        bankAccount,
        bankBranch,
        birthday:
          birthday === "0001-01-01T00:00:00Z" ? null : new Date(birthday),
        clothingsSizes,
        cpfCnpj: cpf === null ? cnpj : cpf,
        description,
        nickName,
        height:
          height === 0
            ? ""
            : height.toString().replace(/(\d)(?=(\d{2})+(?!\d))/g, "$1,"),
        weight: weight === 0 ? "" : weight.toString(),
        professionalClothing,
        ownTransport,
        healthProblem,
        smoke,
        Email,
        phone,
        gender: gender !== null ? gender : 0,
        owner,
      });

      const getPhoto =
        photos !== null ? photos.map((item) => ({ uri: item.url })) : [];
      const photosGet =
        photos !== null ? photos.map((item) => ({ name: item.name })) : [];
      const mergeArr = (arr, inc) =>
        arr.map((item, key) => ({
          ...item,
          icon: inc[key] || item.icon,
        }));
      const getPictures = getPhoto.length
        ? mergeArr(BoxItem, getPhoto)
        : BoxItem;

      this.setState({
        avatar,
        bankCode,
        address,
        lat,
        long,
        photos: photosGet,
        BoxItem: getPictures,
        spinner: false,
      });
    });
    const { handleSubmit } = this.props;
    await this.props.navigation.setParams({
      handleSave: handleSubmit((data) => this.UpdateAboutMe(data)),
    });
  }

  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    return {
      headerRight: () => (
        <ButtonRightNavigation onPress={() => state.params.handleSave()} />
      ),
    };
  };

  saveAboutMe = (request) => {
    this.setState({ spinner: true }, () => {
      aboutMe(request)
        .then(({}) => {
          this.props.navigation.push("UserProfile");
        })
        .catch((error) => {
          AlertHelper.show("error", "Erro", error.response.data.errorMessage);
        })
        .finally(() => {
          this.setState({ spinner: false });
        });
    });
    return;
  };

  UpdateAboutMe = async (form) => {
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
      gender,
      bankBranch,
      bankAccount,
      cpfCnpj,
      owner,
    } = form;
    const h = height === "" ? 0 : Number(height.replace(",", ""));
    const w = weight === "" ? 0 : Number(weight);
    const { avatarUrl, bankCode, lat, long, address, photos } = this.state;
    const latitude = lat === null ? lat : lat.toString();
    const longitude = long === null ? long : long.toString();
    const replaceValidate =
      cpfCnpj !== null ? cpfCnpj.replace(/[\(\)\.\s-]+/g, "") : "";
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
      cnpj:
        replaceValidate !== null && replaceValidate.length === 14
          ? replaceValidate
          : null,
      cpf:
        replaceValidate !== null && replaceValidate.length === 11
          ? replaceValidate
          : null,
      owner,
      address,
      lat: latitude,
      long: longitude,
      photos,
      phone,
      birthday: birthday === null ? "0001-01-01T00:00:00Z" : birthday,
      gender,
    };

    const validateCpfCnpj =
      replaceValidate.length > 11
        ? validateCNPJ(replaceValidate)
        : validateCPF(replaceValidate);

    const validate =
      replaceValidate !== null && replaceValidate !== ""
        ? validateCpfCnpj
        : null;

    validate === false && validate !== null
      ? AlertHelper.show("error", "Erro", "Cpf/Cnpj inválido.")
      : latitude === null
      ? AlertHelper.show("error", "Erro", "Informe a região de atuação.")
      : this.saveAboutMe(request);
  };

  handleOnPictureAdd = () => {
    this.ImageSelector.ActionSheet.show();
  };
  handleOnPictureAddPhotos = (index) => {
    this.ImageSelectorPhotos.ActionSheet.show();
    const buttonSelected = index - 1;
    this.setState({ IconId: buttonSelected });
  };

  onPictureAdd = (picture) => {
    this.setState({ avatar: picture.uri, avatarUrl: picture.data });
  };

  onPhotosAdd = (photo) => {
    const { BoxItem, IconId, photos } = this.state;

    if (photos[IconId] !== undefined) {
      const photoRemove = photos[IconId].name;
      photos.splice(photos.indexOf(`${photoRemove}`), 1);
    }
    BoxItem[IconId] = {
      id: BoxItem[IconId].id,
      icon: { uri: photo.uri },
    };

    photos.length > 4
      ? (photos[IconId] = photo.data)
      : this.setState({
          photos: [
            ...photos,
            { content: photo.data, create: true, name: photo.name },
          ],
        });
  };

  location = (e) => {
    this.setState({
      address: e.address,
      lat: e.location.latitude,
      long: e.location.longitude,
    });
  };

  bankCode = (item) => {
    this.setState({ bankCode: item });
  };

  render() {
    const { avatar, BoxItem, bankCode, address, spinner } = this.state;
    return (
      <View style={styles.container}>
        <SpinnerComponent loading={spinner} />
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
              <FastImage source={{ uri: avatar }} style={styles.Avatar} />
              <FastImage source={AddIcon} style={styles.iconAvatar} />
            </TouchableOpacity>

            <Text style={[styles.TitleInformation, { textAlign: "center" }]}>
              Coloque a foto que te representa{"\n"} como profissional
            </Text>
          </View>
          <ProfileInformation />

          <OccupationArea
            address={address}
            onPress={(item) => {
              this.location(item);
            }}
          />
          <PresentationPictures
            BoxItem={BoxItem}
            onPress={(id) => {
              this.handleOnPictureAddPhotos(id);
            }}
          />

          <AdditionalInformation />
          <BankInformations
            bankCode={bankCode}
            onPress={(item) => {
              this.bankCode(item);
            }}
          />
        </ScrollView>
        <ImageSelector
          onImageSelected={this.onPictureAdd}
          cropperCircleOverlay={true}
          width={1500}
          height={1500}
          ref={(o) => (this.ImageSelector = o)}
        />
        <ImageSelector
          onImageSelected={this.onPhotosAdd}
          width={1500}
          height={2500}
          ref={(o) => (this.ImageSelectorPhotos = o)}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { aboutMe } = state;
  return {
    aboutMe,
  };
};

const mapActionToProps = (dispatch) =>
  bindActionCreators({ setAbout }, dispatch);

AboutMe = connect(mapStateToProps, mapActionToProps)(AboutMe);
AboutMe = reduxForm({ form: "AboutMe" })(AboutMe);

export default AboutMe;
