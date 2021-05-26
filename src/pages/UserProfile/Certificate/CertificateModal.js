import React, { useRef, Fragment, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight
} from "react-native";

import { calcWidth, adjust } from "~/assets/Dimensions";
import DropDown from "~/shared/components/DropDown";
import ImageSelector from "~/shared/components/ImageSelector";
import InputField from "~/shared/components/InputField";
import ExclusionModal from "~/shared/components/ExclusionModal";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { setCertificate } from "~/store/ducks/Certificate/certificate.actions";
import FormValidator from "~/shared/services/validator";

import Icon from "react-native-vector-icons/MaterialIcons";
import { AlertHelper } from "~/shared/helpers/AlertHelper";

import {
  addCertificate,
  updateCertificate,
  deleteCertificate
} from "~/shared/services/certificates.http";
import RoundButton from "~/shared/components/RoundButton";
import ButtonLoading from "~/shared/components/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const formRules = FormValidator.make(
  {
    name: "required",
    issuer: "required",
    conclusionYear: "number|min:4"
  },
  {
    name: "Nome do curso é obrigatório",
    issuer: "Nome da Instituição é obrigatório",
    conclusionYear: "Ano de conclusão inválido"
  }
);

const CertificateModal = ({
  navigation,
  handleSubmit,
  invalid,
  setCertificate
}) => {
  const { viewCerticates, item } = navigation.state.params;
  const [ViewCerticates, setViewCerticates] = useState(viewCerticates);
  const [isEditing, setIsEditing] = useState(false);
  const FuchsiaBlueColor = "#7541BF";
  const ImageSelectorRef = useRef(null);
  const [picture, setPicture] = useState({ image: "", data: "" });
  const [visible, setVisible] = useState(false);
  const [errorType, setErrorType] = useState("");
  const [loading, setLoading] = useState(false);

  const Type = {
    1: "Curso Técnico",
    2: "Curso Livre",
    3: "Graduação",
    4: "Pós graduação",
    5: "MBA"
  };

  const content = [
    {
      title: "Tipo",
      subTitle: Type[item?.type]
    },
    { title: "Nome do curso/treinamento", subTitle: item?.name },
    { title: "Instituição", subTitle: item?.issuer },
    { title: "Ano de Formação", subTitle: item?.conclusionYear }
  ];

  const handleOnPictureAdd = () => {
    const { ActionSheet } = ImageSelectorRef.current;
    ActionSheet.show();
  };

  const onImageSelected = picture => {
    setPicture({ image: picture.uri, data: picture.data });
  };

  const AddCertificates = async form => {
    const { type, name, issuer, conclusionYear } = form;
    const year = Number(conclusionYear);
    try {
      await addCertificate({
        certificateImage: picture.data,
        type,
        name,
        issuer,
        conclusionYear: year
      });
      await setCertificate();
      await navigation.navigate("Certificates");
    } catch (error) {
      setLoading(false);
      AlertHelper.show("error", "Erro", error.response.data.errorMessage);
    }
  };

  const UpdateCertificates = async form => {
    const { type, name, issuer, conclusionYear } = form;
    const year = Number(conclusionYear);
    try {
      await updateCertificate({
        id: item.id,
        certificateImage: picture.image,
        type,
        name,
        issuer,
        conclusionYear: year
      });
      await setCertificate();
      await navigation.navigate("Certificates");
    } catch (error) {
      setLoading(false);
      AlertHelper.show("error", "Erro", error.response.data.errorMessage);
    }
  };

  const validation = form => {
    setLoading(true);
    form.type !== undefined && form.type !== null
      ? isEditing
        ? UpdateCertificates(form)
        : AddCertificates(form)
      : (setErrorType("Tipo é obrigatório"), setLoading(false));
  };

  const RemoveCertificates = async () => {
    try {
      await deleteCertificate(item.id);
      await setCertificate();
      navigation.navigate("Certificates");
    } catch (error) {
      AlertHelper.show("error", "Erro", error.response.data.errorMessage);
    } finally {
      setVisible(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#23203F" }}>
      <View style={styles.buttonClose}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Certificates");
          }}
        >
          <Icon name="close" size={calcWidth(9)} color={"#FFFFFF"} />
        </TouchableOpacity>
      </View>

      {ViewCerticates ? (
        <>
          <View
            style={[styles.containerImage, { marginBottom: calcWidth(10) }]}
          >
            <Image
              source={{ uri: item.certificateImage }}
              resizeMode="contain"
              style={{ width: "100%", height: 250, borderRadius: 5 }}
            />
          </View>
          {content.map((x, i) => (
            <View key={i}>
              <Text style={styles.title}>{x.title}</Text>
              <Text style={styles.subTitle}>{x.subTitle}</Text>
            </View>
          ))}
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "center"
            }}
          >
            <RoundButton
              name="Alterar"
              width={calcWidth(30)}
              onPress={() => {
                setViewCerticates(false);
                setPicture({ image: item.certificateImage });
                setIsEditing(true);
              }}
              style={{ backgroundColor: "#7541BF" }}
            />
            <RoundButton
              name="Deletar"
              onPress={() => setVisible(true)}
              width={calcWidth(30)}
              style={{ borderWidth: 2, borderColor: "#FFFFFF" }}
            />
          </View>
        </>
      ) : (
        <KeyboardAwareScrollView style={{ flex: 1 }}>
          <>
            {picture.image ? (
              <TouchableHighlight
                onPress={() => handleOnPictureAdd()}
                style={styles.containerImage}
              >
                <Image
                  source={{ uri: picture.image }}
                  resizeMode="contain"
                  style={{ width: "100%", height: 250 }}
                />
              </TouchableHighlight>
            ) : (
              <TouchableOpacity
                style={styles.containerImage}
                onPress={() => handleOnPictureAdd()}
              >
                <Icon name="photo-camera" size={50} color="#FFF" />
                <Text style={styles.legend}>Adicionar Imagem</Text>
              </TouchableOpacity>
            )}
          </>
          <View
            style={{
              marginHorizontal: calcWidth(10),
              marginTop: calcWidth(-5)
            }}
          >
            <Field
              title="Tipo"
              error={errorType}
              component={DropDown}
              name={"type"}
              items={[
                { label: "Curso Técnico", value: 1 },
                { label: "Curso Livre", value: 2 },
                { label: "Graduação", value: 3 },
                { label: "Pós graduação", value: 4 },
                { label: "MBA", value: 5 }
              ]}
            />
            <Field
              title="Nome do curso/treinamento"
              component={InputField}
              name={"name"}
              isfocused={FuchsiaBlueColor}
            />
            <Field
              title="Instituição"
              component={InputField}
              name={"issuer"}
              isfocused={FuchsiaBlueColor}
            />
            <Field
              title="Ano de formação"
              component={InputField}
              name={"conclusionYear"}
              isfocused={FuchsiaBlueColor}
              maxLength={4}
              keyboardType="numeric"
            />
            <View style={{ alignItems: "center", marginTop: calcWidth(3) }}>
              <ButtonLoading
                disabled={invalid || !picture.image}
                loading={!loading}
                color={FuchsiaBlueColor}
                cliclButtonColor="#EB4886"
                name={isEditing ? "Salvar" : "Adicionar"}
                size="small"
                onPress={handleSubmit(data => validation(data))}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      )}
      <ExclusionModal
        visible={visible}
        onClose={() => setVisible(false)}
        onPress={() => RemoveCertificates()}
        title="Deseja realmente excluir este certificado ?"
      />
      <ImageSelector
        onImageSelected={onImageSelected}
        width={3000}
        height={2250}
        ref={ImageSelectorRef}
      />
    </View>
  );
};

const styles = {
  containerImage: {
    backgroundColor: "#18142f",
    height: calcWidth(60),
    margin: calcWidth(10),
    marginTop: calcWidth(15),
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  legend: {
    color: "#7541bf",
    fontSize: adjust(14)
  },
  title: {
    color: "#865FC0",
    fontFamily: "HelveticaNowMicro-Regular",
    fontSize: adjust(13),
    marginBottom: calcWidth(5),
    marginLeft: calcWidth(11)
  },
  subTitle: {
    color: "#FFFFFF",
    fontFamily: "HelveticaNowMicro-Regular",
    fontSize: adjust(11),
    marginBottom: calcWidth(5),
    marginLeft: calcWidth(11)
  },
  buttonClose: {
    zIndex: 2,
    margin: calcWidth(15),
    marginLeft: calcWidth(3),
    marginBottom: calcWidth(-10),
    flexDirection: "row",
    justifyContent: "space-between"
  }
};

const mapStateToProps = (state, ownProps) => {
  const { item, viewCerticates } = ownProps.navigation.state.params;

  const initialValues = viewCerticates
    ? {
        type: item?.type,
        name: item?.name,
        issuer: item?.issuer,
        conclusionYear: item?.conclusionYear.toString()
      }
    : {};

  return {
    initialValues
  };
};

const mapActionToProps = dispatch =>
  bindActionCreators({ setCertificate }, dispatch);

export default connect(
  mapStateToProps,
  mapActionToProps
)(
  reduxForm({
    form: "CertificateModal",
    validate: formRules,
    enableReinitialize: true,
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true
  })(CertificateModal)
);
