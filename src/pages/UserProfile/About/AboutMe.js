import React, { Component } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
  Platform
} from "react-native";
import ImageProfile from "~/assets/images/backgroud.png";
import ImageBody from "~/assets/images/icon_addbody.png";
import ImageSelf from "~/assets/images/icon_addselfie.png";
import InputField from "~/shared/components/InputField";
import InputMask from "~/shared/components/InputMask";
import Input from "~/shared/components/InputLabel";
import DateTimePicker from "@react-native-community/datetimepicker";
import AddIcon from "~/assets/images/icon_add.png";
import { bindActionCreators } from "redux";
import { Field, reduxForm } from "redux-form";
import FormValidator from "~/shared/services/validator";
import AsyncStorage from "@react-native-community/async-storage";
import { getAbout, decodeToken, aboutMe } from "~/shared/services/freela.http";
import Modal from "./modalFilter";
import moment from "moment";
import styles from "./styles";
import ImageSelector from "~/shared/components/ImageSelector";
import { connect } from "react-redux";
import ProfileInformation from "./ProfileInformation";
import AdditionalInformation from "./AdditionalInformation";
import BankInformations from "./BankInformations";
import PickerComponent from "~/shared/components/PickerComponent";
import DateInputField from "~/shared/components/DateInputField";

import { setAbout } from "~/store/ducks/aboutMe/about.actions";

const formRules = FormValidator.make({
  FullName: "required"
});

class AboutMe extends Component {
  state = {
    date: new Date(),
    mode: "date",
    show: false,
    visible: false,
    gender: 0,
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
    ]
  };

  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    debugger;
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
          <Text style={styles.counter}>Salvar</Text>
        </TouchableOpacity>
      )
    };
  };

  async componentDidMount() {
    const token = decodeToken(await AsyncStorage.getItem("API_TOKEN"));
    getAbout(token.id)
      .then(({ data }) => {
        const email = token.email;
        const {
          bankAccount,
          bankBranch,
          birthday,
          clothingsSizes,
          cnpj,
          cpf,
          description,
          drink,
          gender,
          hasChildren,
          hasTattoo,
          height,
          latitude,
          longitude,
          name,
          nickName,
          ownTransport,
          owner,
          phone,
          photos,
          professionalClothing,
          smoke,
          weight
        } = data.result.value;
        this.props.initialize({
          fullName: name,
          nickName,
          description,
          height,
          weight,
          email,
          phone,
          bankBranch,
          bankAccount,
          cpfCnpj: cpf,
          owner,
          smoke,
          clothingsSizes
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

  bankCode = item => {
    this.setState({ code: item });
    console.log(this.state.code);
    debugger;
  };

  UpdateAboutMe = async form => {
    const token = decodeToken(await AsyncStorage.getItem("API_TOKEN"));
    const {
      fullName,
      nickName,
      description,
      height,
      weight,
      phone,
      cpfCnpj,
      bankBranch,
      bankAccount,
      owner,
      smoke,
      clothingsSizes,
      consignment_date
    } = form;
    debugger;
    const { date, size, code, avatar, gender } = this.state;
    const birthday = date;
    aboutMe({
      freelaId: token.id,
      avatar: avatar.data,
      fullName,
      nickName,
      description,
      height: 0,
      weight: 0,
      clothingsSizes: size,
      professionalClothing: true,
      ownTransport: true,
      healthProblem: true,
      smoke: true,
      // lat:,
      // long:,
      // photos:
      phone,
      birthday: birthday,
      gender,
      bankCode: code,
      bankBranch,
      bankAccount,
      cpf: cpfCnpj,
      cnpj: cpfCnpj,
      owner
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
    this.setState({ avatar: picture });
    debugger;
  };

  onPhotosAdd = picture => {
    this.setState({ photos: [picture] });
    debugger;
  };

  render() {
    const {
      show,
      date,
      mode,
      professionalClothing,
      ownTransport,
      healthProblem,
      smoke,
      avatar,
      BoxItem
    } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.ScrollView}>
          <View style={styles.containerAvatar}>
            <TouchableOpacity
              style={{ width: 100 }}
              onPress={this.handleOnPictureAdd}
            >
              <Image source={ImageProfile} style={styles.Avatar} />
              <Image
                source={AddIcon}
                style={{ width: 25, height: 25, top: "-18%", left: "70%" }}
              />
            </TouchableOpacity>
          </View>
          <ProfileInformation />
          <View style={styles.containerLocation}>
            <Text style={{ color: "#FFF", fontSize: 16, paddingBottom: "7%" }}>
              Localização
            </Text>
            <Field
              style={{ width: "100%" }}
              component={InputField}
              name={"location"}
            />
          </View>
          <View style={styles.containerPresentationPhoto}>
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
          </View>
          <AdditionalInformation />
          <BankInformations />
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
mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setAbout
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(
  reduxForm({
    form: "AboutMe"
    // validate: formRules
  })(AboutMe)
);
