import React from "react";
import { View, Text, ScrollView, Image } from "react-native";
import Logo from "~/assets/images/logo_lanup.png";
import { Field, reduxForm } from "redux-form";
import { calcWidth } from "~/assets/Dimensions";
import SelectPicker from "~/shared/components/SelectPicker";
import ButtonComponent from "~/shared/components/ButtonCompoent";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const CertificateModal = ({ navigation }) => {
  const FuchsiaBlueColor = "#7541BF";
  return (
    <View style={{ flex: 1, backgroundColor: "#23203F" }}>
      <ScrollView>
        <View
          style={{
            margin: calcWidth(2),
            marginLeft: calcWidth(3),
            marginBottom: calcWidth(-10),
          }}
        >
          <Icon
            name="close"
            onPress={() => {
              navigation.navigate("Certificates");
            }}
            size={calcWidth(9)}
            color={"#FFFFFF"}
          />
        </View>
        <View style={styles.containerImage}>
          <Image
            source={Logo}
            resizeMode="contain"
            style={{ width: "100%", height: 250 }}
          />
        </View>
        <View
          style={{ marginHorizontal: calcWidth(10), marginTop: calcWidth(-5) }}
        >
          <Field title="Tipo" component={SelectPicker} name={"type"} />
          <Field
            title="Nome do curso/treinamento"
            component={InputField}
            name={"course"}
            isfocused={FuchsiaBlueColor}
          />
          <Field
            title="Instituição"
            component={InputField}
            name={"Institution"}
            isfocused={FuchsiaBlueColor}
          />
          <Field
            title="Ano de formação"
            component={InputField}
            name={"YearOfFormation"}
            isfocused={FuchsiaBlueColor}
          />
          <Field title="Serviço" component={SelectPicker} name={"service"} />
          <View style={{ alignItems: "center", marginBottom: calcWidth(5) }}>
            <ButtonComponent
              title="Adicionar"
              isSelected={true}
              selectedColor={FuchsiaBlueColor}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = {
  containerImage: {
    backgroundColor: "#FFFFFF",
    height: calcWidth(60),
    margin: calcWidth(10),
    marginTop: calcWidth(15),
    borderRadius: 10,
  },
};

export default reduxForm({ form: "CertificateModal" })(CertificateModal);
