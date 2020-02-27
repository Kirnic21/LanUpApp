import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity
} from "react-native";
import logoRating from "~/assets/images/logo-rating.png";
import { calcWidth } from "~/assets/Dimensions";
import RatingStar from "~/shared/components/RatingStar";
import InputLabel from "~/shared/components/InputLabel";
import { CheckBox } from "react-native-elements";
import ButtonComponent from "~/shared/components/ButtonCompoent";

export default class Rating extends React.Component {
  state = {
    isSelected: false
  };

  render() {
    const { isSelected } = this.state;
    return (
      <View style={styles.container}>
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
              Cláudia
            </Text>
            <Text style={[styles.fontHelveticaRegular, styles.subtitle]}>
              Avalie sua experiência
            </Text>
          </View>
          <View>
            <RatingStar title="Gestão*" />
            <RatingStar title="Alimentação*" />
            <RatingStar title="Estrutura*" />
            <Text style={[styles.subtitle, { color: "#9C94CB" }]}>
              * campos obrigatórios
            </Text>
          </View>
          <View>
            <InputLabel
              isfocused="#8A98BA"
              placeholder="Titulo"
              placeholderTextColor="#8A98BA"
              style={styles.inputBackgroundColor}
            />
            <InputLabel
              isfocused="#8A98BA"
              placeholder="Conte sua experiência"
              placeholderTextColor="#8A98BA"
              multiline={true}
              numberOfLines={10}
              style={[styles.inputBackgroundColor, styles.textArea]}
            />
            <CheckBox
              title="Recomendo trabalhar junto"
              textStyle={[
                styles.fontHelveticaRegular,
                { color: "#8A98BA", fontSize: calcWidth(3.5) }
              ]}
              checkedIcon="check-square"
              uncheckedIcon="square-o"
              uncheckedColor="#8A98BA"
              checkedColor="#C5B9EE"
              containerStyle={styles.containerCheckbox}
              checked={true}
            />
            <View style={{ paddingBottom: calcWidth(5), alignItems: "center" }}>
              <ButtonComponent
                title="concluir"
                isSelected={true}
                unSelectedColor="#A893F229"
                selectedColor="#7541BF"
                textStyle={{ color: "#FFFFFF" }}
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
    justifyContent: "space-between"
  },
  fontHelveticaRegular: {
    fontFamily: "HelveticaNowMicro-Regular"
  },
  perfilContainer: {
    alignItems: "center",
    padding: calcWidth(5)
  },
  titleName: {
    color: "#865FC0",
    fontSize: calcWidth(5),
    padding: calcWidth(2.5)
  },
  subtitle: {
    color: "#8391B2",
    fontSize: calcWidth(3.5)
  },
  textArea: {
    height: calcWidth(50),
    borderRadius: calcWidth(10),
    textAlignVertical: "top",
    paddingTop: calcWidth(5),
    paddingHorizontal: calcWidth(5)
  },
  inputBackgroundColor: {
    backgroundColor: "#23203F"
  },
  containerCheckbox: {
    backgroundColor: "transparent",
    borderWidth: 0,
    top: calcWidth(-2)
  },
  Btn: {
    width: "60%",
    height: "33%",
    borderRadius: calcWidth(30),
    alignItems: "center",
    justifyContent: "center"
  },
  textBtn: {
    color: "#18142F",
    fontSize: calcWidth(12),
    fontFamily: "HelveticaNowMicro-Regular"
  }
});
