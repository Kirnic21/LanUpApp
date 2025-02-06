import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { CheckBox } from "react-native-elements";
import { Field, reduxForm } from "redux-form";

import { calcWidth, adjust } from "~/assets/Dimensions";
import logoRating from "~/assets/images/logo-rating.png";
import
ButtonComponent from "~/shared/components/ButtonCompoent";
import InputField from "~/shared/components/InputField";
import RatingStar from "~/shared/components/RatingStar";
import SpinnerComponent from "~/shared/components/SpinnerComponent";
import { AlertHelper } from "~/shared/helpers/AlertHelper";
import { ratingHirer } from "~/shared/services/hirer.http";
import { ratingAgency } from "~/shared/services/agency.http";

class Rating extends React.Component {
  state = {
    isSelected: false,
    food: 0,
    managment: 0,
    structure: 0,
    hasRecommendation: false,
    spinner: false,
  };

  selectedStar = (rating) => {
    this.setState(rating);
    return;
  };

  sendRatings = async (form) => {
    const { title, description } = form;
    const { food, managment, structure, hasRecommendation } = this.state;
    const { hirerId, agencyId } = this.props.navigation.state.params;

    this.setState({ spinner: true });

    const request = {
      food,
      managment,
      structure,
      description,
      title,
      hasRecommendation,
    };

    try {
      if (agencyId) {
        await ratingAgency({ ...request, id: agencyId });
      }
      if (!agencyId) {
        await ratingHirer({ ...request, id: hirerId });
      }
      AlertHelper.show("success", "Sucesso", "Sua avaliação foi enviada");
      this.props.navigation.navigate("UserProfile");
    } catch (error) {
      AlertHelper.show("error", "Erro", error.response.data.errorMessage);
    } finally {
      this.setState({ spinner: false });
    }
  };

  render() {
    const { food, managment, structure, hasRecommendation, spinner } =
      this.state;
    const { handleSubmit } = this.props;
    const { agencyName, hirerName } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <SpinnerComponent loading={spinner} />
        <ScrollView
          style={{ flex: 1, marginHorizontal: calcWidth(7) }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.perfilContainer}>
            <Image
              source={logoRating}
              style={{ height: calcWidth(20), width: calcWidth(20) }}
            />
            <Text style={[styles.fontHelveticaRegular, styles.titleName]}>
              {agencyName && agencyName}
              {!agencyName && hirerName}
            </Text>
            <Text style={[styles.fontHelveticaRegular, styles.subtitle]}>
              Avalie sua experiência
            </Text>
          </View>
          <View>
            <RatingStar
              rating={managment}
              title="Gestão*"
              selectedStar={(rating) =>
                this.selectedStar({ managment: rating })
              }
            />
            <RatingStar
              rating={food}
              title="Alimentação*"
              selectedStar={(rating) => this.selectedStar({ food: rating })}
            />
            <RatingStar
              rating={structure}
              title="Estrutura*"
              selectedStar={(rating) =>
                this.selectedStar({ structure: rating })
              }
            />
            <Text style={[styles.subtitle, { color: "#9C94CB" }]}>
              * campos obrigatórios
            </Text>
          </View>
          <View>
            <Field
              isfocused="#8A98BA"
              placeholder="Titulo"
              placeholderTextColor="#8A98BA"
              style={styles.inputBackgroundColor}
              component={InputField}
              name={"title"}
            />
            <Field
              isfocused="#8A98BA"
              placeholder="Conte sua experiência"
              placeholderTextColor="#8A98BA"
              multiline={true}
              numberOfLines={10}
              style={[styles.inputBackgroundColor, styles.textArea]}
              component={InputField}
              name={"description"}
            />
            <CheckBox
              title="Recomendo trabalhar junto"
              textStyle={[
                styles.fontHelveticaRegular,
                { color: "#8A98BA", fontSize: adjust(12) },
              ]}
              checkedIcon="check-square"
              uncheckedIcon="square-o"
              uncheckedColor="#8A98BA"
              checkedColor="#C5B9EE"
              containerStyle={styles.containerCheckbox}
              checked={hasRecommendation}
              onPress={() =>
                this.setState({ hasRecommendation: !hasRecommendation })
              }
            />
            <View style={{ paddingBottom: calcWidth(5), alignItems: "center" }}>
              <ButtonComponent
                title="concluir"
                isSelected={food && structure && managment > 0 ? true : false}
                onPress={handleSubmit((data) => this.sendRatings(data))}
                unSelectedColor="#A893F229"
                selectedColor="#7541BF"
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#18142F",
    justifyContent: "space-between",
  },
  fontHelveticaRegular: {
    fontFamily: "HelveticaNowMicro-Regular",
  },
  perfilContainer: {
    alignItems: "center",
    padding: calcWidth(5),
  },
  titleName: {
    color: "#865FC0",
    fontSize: adjust(15),
    padding: calcWidth(2.5),
  },
  subtitle: {
    color: "#8391B2",
    fontSize: adjust(12),
  },
  textArea: {
    height: calcWidth(50),
    borderRadius: calcWidth(10),
    textAlignVertical: "top",
    paddingTop: calcWidth(5),
    paddingHorizontal: calcWidth(5),
  },
  inputBackgroundColor: {
    backgroundColor: "#23203F",
  },
  containerCheckbox: {
    backgroundColor: "transparent",
    borderWidth: 0,
    top: calcWidth(-2),
  },
  Btn: {
    width: "60%",
    height: "33%",
    borderRadius: calcWidth(30),
    alignItems: "center",
    justifyContent: "center",
  },
  textBtn: {
    color: "#18142F",
    fontSize: adjust(10),
    fontFamily: "HelveticaNowMicro-Regular",
  },
});

export default Rating = reduxForm({
  form: "Rating",
  enableReinitialize: true,
})(Rating);
