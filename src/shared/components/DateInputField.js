import React, { Component } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import Input from "~/shared/components/InputLabel";
import moment from "moment";

export default class DateInputField extends Component {
  constructor(props) {
    super(props);
    this.state = { isDateTimePickerVisible: false };
    this.handleChange = this.handleChange.bind(this);
  }

  getFormatByMode = (value, mode = "date") => {
    const dateTime = value ? new Date(value) : new Date();

    const format = mode === "time" ? "HH:mm" : "DD/MM/YYYY";

    return moment(dateTime).format(format);
  };

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };
  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };
  handleChange = date => {
    this.setState({ isDateTimePickerVisible: false });
    this.props.input.onChange(date);
  };
  render() {
    const { input, meta, ...inputProps } = this.props;
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={this.showDateTimePicker}
      >
        <DateTimePicker
          style={this.props.style}
          date={input.value || new Date()} //date is transformed from input
          onDateChange={this.handleChange}
          mode={inputProps.mode || "date"}
          cancelTextIOS="Cancelar"
          confirmTextIOS="Confirmar"
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleChange}
          onCancel={() => this.setState({ isDateTimePickerVisible: false })}
        />
        <Input
          editable={false}
          enabled={false}
          label={this.props.label}
          style={this.props.style}
          title={this.props.title}
          placeholder={this.props.placeholder}
          onClick={this.showDateTimePicker}
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
export const styles = StyleSheet.create({
  container: {},

  input: {
    // flex: 1,
    // color: "red",
    // height: 50,
    // borderWidth: 0,
    // borderBottomWidth: 1
  }
});
