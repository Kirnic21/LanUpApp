import { StyleSheet } from "react-native";
import dimensions, { calcWidth, adjust } from "~/assets/Dimensions/index";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#18142F",
    width: "100%",
    alignItems: "center",
  },
  ScrollView: {
    width: "100%",
    paddingHorizontal: "5%",
  },
  containerAvatar: {
    alignItems: "center",
    marginTop: calcWidth(3),
  },
  informationProfile: {
    backgroundColor: "#24203B",
    padding: "5%",
    borderRadius: 15,
    paddingBottom: "18%",
  },
  containerSwitch: {
    flexDirection: "row",
    width: "92%",
  },
  containerLocation: {
    backgroundColor: "#24203B",
    marginTop: "3%",
    padding: "5%",
    borderRadius: 15,
  },
  containerPresentationPhoto: {
    backgroundColor: "#24203B",
    marginTop: "3%",
    padding: "5%",
    borderRadius: 15,
  },
  containerModalBank: {
    justifyContent: "center",
    flex: 1,
    marginTop: Platform.OS == "ios" ? 30 : 0,
  },
  thumbnail: {
    width: dimensions(57),
    height: dimensions(55),
    paddingVertical: "1%",
    marginRight: "4%",
  },
  photo: {
    width: dimensions(57),
    height: dimensions(55),
    borderColor: "#FFF",
    borderWidth: 2,
    borderRadius: 5,
  },
  containerInformationPrivade: {
    backgroundColor: "#24203B",
    marginTop: "3%",
    padding: "5%",
    borderRadius: 15,
  },
  containerInformationBank: {
    backgroundColor: "#24203B",
    marginTop: "3%",
    padding: "5%",
    borderRadius: 15,
  },
  containerBtn: {
    width: "100%",
    alignItems: "center",
    marginTop: "3%",
    padding: "5%",
  },
  containerManequim: {
    width: "32%",
    borderRadius: 25,
    position: "absolute",
    left: "68%",
    height: dimensions(43),
    top: dimensions(18),
  },
  containerGender: {
    borderColor: "#FFF",
    borderWidth: 2,
    width: "47%",
    position: "absolute",
    borderRadius: 25,
    height: dimensions(43),
    top: dimensions(18),
    left: "53%",
  },
  Avatar: {
    width: dimensions(90),
    height: dimensions(90),
    borderRadius: dimensions(50),
    borderColor: "#FFB72B",
    borderWidth: 2,
  },
  textArea: {
    width: "100%",
    height: dimensions(120),
    borderRadius: 30,
    textAlignVertical: "top",
    paddingVertical: "5%",
  },
  textStyle: {
    fontFamily: "HelveticaNowMicro-Regular",
    padding: 10,
    color: "#FFF",
  },
  TitleInformation: {
    color: "#FFFFFF",
    fontSize: adjust(12),
    paddingBottom: "9%",
    fontFamily: "HelveticaNowMicro-Regular",
  },
  btn: {
    borderColor: "#FFF",
    borderWidth: 2,
    padding: 24,
    width: "70%",
    alignItems: "center",
    borderRadius: 25,
  },
  iconAvatar: {
    width: dimensions(20),
    height: dimensions(20),
    top: "-18%",
    left: "70%",
  },
  btnBank: {
    borderColor: "#FFF",
    borderWidth: 2,
    height: dimensions(43),
    borderRadius: 25,
    width: "45%",
    justifyContent: "center",
    marginBottom: "2%",
  },
  FieldRequired: {
    color: "#F13567",
  },
});

export default styles;
