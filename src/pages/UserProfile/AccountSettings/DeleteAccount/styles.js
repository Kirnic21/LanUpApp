import { StyleSheet } from "react-native";
import { adjust, calcWidth } from "~/assets/Dimensions";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#18142F",
    padding: calcWidth(5),
    justifyContent: "space-between",
    width: "100%",
  },
  titleModal: {
    color: "#FFF",
    fontSize: adjust(15),
    textAlign: "center",
    fontFamily: "HelveticaNowMicro-Medium",
    marginBottom: adjust(5),
  },
  textBody: {
    color: "#FFFFFF",
    fontSize: adjust(11),
    lineHeight: calcWidth(5),
    fontFamily: "HelveticaNowMicro-Regular",
    textAlign: "justify",
  },
  warningText: {
    fontFamily: "HelveticaNowMicro-Medium",
    textAlign: "left",
    color: "#F13567",
    fontSize: adjust(11),
    lineHeight: calcWidth(5),
    marginBottom: calcWidth(2),
  },
  textCheckbox: {
    color: "#FFFFFF",
    fontSize: adjust(12),
    lineHeight: calcWidth(5),
    fontFamily: "HelveticaNowMicro-Regular",
    flexWrap: "wrap",
  },
  wrapper: {
    marginBottom: calcWidth(5),
  },
  buttonCancel: {
    backgroundColor: "#46C5F3",
    marginBottom: calcWidth(4),
  },
  buttonNext: {
    borderColor: "#FFFFFF",
    borderWidth: 2,
  },
  buttonDelete: {
    borderColor: "#F13567",
    borderWidth: 2,
  },

  item: {
    fontFamily: "HelveticaNowDisplay-Regular",
    fontSize: adjust(12),
    color: "#F13567",
    width: "80%",
    fontWeight: "normal",
  },
  lists: {
    flexDirection: "row",
    paddingVertical: calcWidth(1),
    alignItems: "center",
  },
  title: {
    color: "#FFFFFF",
    fontSize: adjust(12),
    fontFamily: "HelveticaNowMicro-Bold",
  },
});
