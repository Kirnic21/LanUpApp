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
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { updateAbout } from "~/store/ducks/aboutMe/about.actions";
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
    photos: this.props.data.photos,
  };

  async componentDidMount() {
    const { BoxItem, photos } = this.state;
    this.props.initialize(this.props.data);

    const getPhoto =
      photos !== null ? photos.map((item) => ({ uri: item.url })) : [];
    const photosGet =
      photos !== null
        ? photos.map((item) => ({ name: item.name, url: item.url }))
        : [];
    const mergeArr = (arr, inc) =>
      arr.map((item, key) => ({
        ...item,
        icon: inc[key] || item.icon,
      }));
    const getPictures = getPhoto.length ? mergeArr(BoxItem, getPhoto) : BoxItem;

    this.setState({
      photos: photosGet,
      BoxItem: getPictures,
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
    const { about: value, updateAbout, navigation } = this.props;
    updateAbout({ value, request }).then(() => {
      navigation.push("UserProfile");
    });
    return;
  };

  UpdateAboutMe = async (form) => {
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
      address,
      bankCode,
      bankAccountType
    } = form;
    const h = height === "" ? 0 : Number(height.replace(",", ""));
    const w = weight === "" ? 0 : Number(weight);
    const { avatarUrl, photos } = this.state;
    const replaceValidate =
      cpfCnpj !== null ? cpfCnpj.replace(/[\(\)\.\s-]+/g, "") : "";
    const request = {
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
      bankCode: bankCode.id,
      bankBranch,
      bankAccount,
      bankAccountType,
      cnpj:
        replaceValidate !== null && replaceValidate.length === 14
          ? replaceValidate
          : null,
      cpf:
        replaceValidate !== null && replaceValidate.length === 11
          ? replaceValidate
          : null,
      owner,
      address: address.name,
      lat: address.latitude,
      long: address.longitude,
      photos,
      phone,
      birthday,
      gender: gender === null ? 0 : gender,
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
      : address.latitude === null
      ? AlertHelper.show("error", "Erro", "Informe a região de atuação.")
      : birthday === null
      ? AlertHelper.show("error", "Erro", "Informe sua data de nascimento.")
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

  render() {
    const { avatar, BoxItem } = this.state;
    const { loading, data } = this.props;
    const { image } = data;
    return (
      <View style={styles.container}>
        <SpinnerComponent loading={loading} />
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
              <FastImage
                source={{ uri: avatar || image }}
                style={styles.Avatar}
              />
              <FastImage source={AddIcon} style={styles.iconAvatar} />
            </TouchableOpacity>

            <Text style={[styles.TitleInformation, { textAlign: "center" }]}>
              Coloque a foto que te representa{"\n"} como profissional
            </Text>
          </View>
          <ProfileInformation />
          <OccupationArea />
          <PresentationPictures
            BoxItem={BoxItem}
            onPress={(id) => {
              this.handleOnPictureAddPhotos(id);
            }}
          />

          <AdditionalInformation />
          <BankInformations />
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
  const { about, loading } = state.aboutMe;
  return {
    data: {
      ...about,
      fullName: about.name,
      gender: about.gender === 0 ? null : about.gender,
      cpfCnpj: about.cpf === null ? about.cnpj : about.cpf,
      height:
        (about.height === 0 && "") ||
        about.height.toString().replace(/(\d)(?=(\d{2})+(?!\d))/g, "$1,"),
      weight: (about.weight === 0 && "") || about.weight.toString(),
      address: {
        name: about.address,
        latitude: about.latitude,
        longitude: about.longitude,
      },
      bankCode: { id: about.bankCode },
    },
    loading,
    about,
  };
};

const mapActionToProps = (dispatch) =>
  bindActionCreators({ updateAbout }, dispatch);

AboutMe = connect(mapStateToProps, mapActionToProps)(AboutMe);
AboutMe = reduxForm({ form: "AboutMe" })(AboutMe);

export default AboutMe;
