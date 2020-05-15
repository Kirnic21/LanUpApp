import React, { Component } from "react";
import { TouchableOpacity, StyleSheet, View, Text, Modal } from "react-native";
import DatePicker from "react-native-date-picker";
import Input from "~/shared/components/InputDate";
import moment from "moment";
import dimensions, { calcWidth } from "~/assets/Dimensions/index";
import ModalComponent from "./ModalComponent";
import ButtonComponent from "./ButtonCompoent";

export default class DateInputField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      date: new Date(),
      visible: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

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
    const { mode, input, meta, ...inputProps } = this.props;
    return (
      <TouchableOpacity onPress={this.showDateTimePicker}>
        <Text
          style={{
            color: "white",
            fontSize: dimensions(12),
            fontFamily: "HelveticaNowMicro-Regular",
          }}
        >
          {this.props.title}
        </Text>
        <ModalComponent
          visible={this.state.visible}
          onClose={() => this.setState({ visible: false })}
        >
          <View style={{ top: calcWidth(10), alignItems: "center" }}>
            <DatePicker
              mode={mode}
              locale="pt"
              style={{}}
              fadeToColor="#000"
              textColor="#FFFFFF"
              date={input.value || date}
              onDateChange={(date) => this.handleChange(date)}
            />
            <View style={{ top: calcWidth(10) }}>
              <ButtonComponent
                onPress={() => this.setState({ visible: false })}
                title="Okay"
                isSelected
                selectedColor="#7541BF"
              />
            </View>
          </View>
        </ModalComponent>

        <Input
          editable={false}
          enabled={false}
          label={this.props.label}
          style={[
            this.props.style,
            {
              top: "-46%",
              marginBottom: dimensions(-15),
              height: dimensions(43),
              textAlignVertical: "center",
              paddingVertical: "3%",
              borderRadius: 50,
            },
          ]}
          placeholder={this.props.placeholder}
          onClick={() => this.setState({ visible: true })}
          value={
            input.value !== ""
              ? this.getFormatByMode(input.value, inputProps.mode)
              : ""
          }
        />
      </TouchableOpacity>
    );
  }
}
