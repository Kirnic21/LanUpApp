import React, { Component } from "react";
import { TouchableOpacity, View, Text, Platform } from "react-native";
import DatePicker from "react-native-date-picker";
import moment from "moment";
import { adjust } from "~/assets/Dimensions/index";
import ModalComponent from "./ModalComponent";
import ButtonComponent from "./ButtonCompoent";

export default class DateInputField extends Component {
  state = {
    isDateTimePickerVisible: false,
    date: new Date(),
    visible: false,
  };

  getFormatByMode = (value, mode = "date") => {
    const dateTime = value ? new Date(value) : new Date();

    const format = mode === "time" ? "HH:mm" : "DD/MM/YYYY";

    return moment(dateTime).format(format);
  };

  handleChange = (date) => {
    this.props.input.onChange(date);
  };
  render() {
    const { date } = this.state;
    const { placeholder, style, mode, input, meta, ...inputProps } = this.props;
    return (
      <TouchableOpacity
        style={style}
        onPress={() => this.setState({ visible: true })}
      >
        <Text
          style={{
            color: "white",
            fontSize: adjust(10),
            fontFamily: "HelveticaNowMicro-Regular",
            bottom: "3%",
          }}
        >
          {this.props.title}
        </Text>
        <ModalComponent
          visible={this.state.visible}
          onClose={() => this.setState({ visible: false })}
        >
          <View style={{ alignItems: "center" }}>
            <View style={{ marginVertical: "10%" }}>
              <DatePicker
                mode={mode}
                locale="pt"
                style={{}}
                fadeToColor="#23203F"
                textColor="#FFFFFF"
                date={!!input.value ? new Date(input.value) : date}
                onDateChange={(date) => this.handleChange(date)}
              />
            </View>
            <View style={{ marginVertical: "5%" }}>
              <ButtonComponent
                onPress={() => this.setState({ visible: false })}
                title="Okay"
                isSelected
                selectedColor="#7541BF"
              />
            </View>
          </View>
        </ModalComponent>
        <Text
          style={[
            styles.input,
            !input.value && { color: "rgba(255, 255, 255, 0.6)" },
            meta.touched && meta.error && { borderColor: "#F13567" },
          ]}
        >
          {input.value !== ""
            ? this.getFormatByMode(input.value, inputProps.mode)
            : placeholder}
        </Text>
        {meta.touched && meta.error && (
          <Text
            style={{
              color: "#F13567",
              fontSize: adjust(9),
              fontFamily: "HelveticaNowMicro-Regular",
            }}
          >
            {meta.error}
          </Text>
        )}
      </TouchableOpacity>
    );
  }
}

const styles = {
  input: {
    height: 50,
    width: "100%",
    borderRadius: Platform.OS === "ios" ? 25 : 50,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    ...Platform.select({
      ios: {
        lineHeight: 45,
      },
      android: {
        textAlignVertical: "center",
      },
    }),
    paddingHorizontal: "15%",
    color: "#FFF",
    fontSize: adjust(10),
    fontFamily: "HelveticaNowMicro-Regular",
  },
};
