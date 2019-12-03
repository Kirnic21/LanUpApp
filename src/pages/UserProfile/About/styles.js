import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#18142F",
    width: "100%",
    alignItems: "center"
  },
  ScrollView: {
    width: "100%",
    paddingHorizontal: "5%"
  },
  containerAvatar: {
    alignItems: "center"
  },
  informationProfile: {
    backgroundColor: "#24203B",
    padding: "5%",
    borderRadius: 15,
    paddingBottom: "18%"
  },
  containerSwitch: {
    flexDirection: "row",
    width: "92%"
  },
  containerLocation: {
    backgroundColor: "#24203B",
    marginTop: "3%",
    padding: "5%",
    borderRadius: 15
  },
  containerPresentationPhoto: {
    backgroundColor: "#24203B",
    marginTop: "3%",
    padding: "7%",
    borderRadius: 15
  },
  thumbnail: {
    width: "22%",
    height: 65,
    paddingVertical: "1%",
    marginRight: "4%"
  },
  photo: {
    width: "100%",
    height: "100%",
    borderColor: "#FFF",
    borderWidth: 2,
    borderRadius: 5
  },
  containerInformationPrivade: {
    backgroundColor: "#24203B",
    marginTop: "3%",
    padding: "5%",
    borderRadius: 15
  },
  containerInformationBank: {
    backgroundColor: "#24203B",
    marginTop: "3%",
    padding: "5%",
    borderRadius: 15
  },
  containerBtn: {
    width: "100%",
    alignItems: "center",
    marginTop: "3%",
    padding: "5%"
  },
  containerManequim: {
    borderColor: "#FFF",
    borderWidth: 2,
    width: "32%",
    borderRadius: 25,
    position: "absolute",
    left: "68%",
    height: 46,
    top: 20
  },
  containerGender: {
    borderColor: "#FFF",
    borderWidth: 2,
    width: "47%",
    position: "absolute",
    borderRadius: 25,
    height: 45,
    top: 20,
    left: "53%"
  },
  Avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: "#FFB72B",
    borderWidth: 2
  },
  textArea: {
    width: "100%",
    height: 140,
    borderRadius: 30,
    textAlignVertical: "top",
    paddingVertical: "5%"
  },
  btn: {
    borderColor: "#FFF",
    borderWidth: 2,
    padding: 24,
    width: "70%",
    alignItems: "center",
    borderRadius: 25
  }
});

export default styles;
