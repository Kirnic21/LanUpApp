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

  getFormatByMode = (value, mode = 'date') => {
    const dateTime = value
      ? new Date(value)
      : new Date

    const format = mode === 'time'
      ? 'hh:mm'
      : 'DD/MM/YYYY'

    return moment(dateTime).format(format)
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
    debugger
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.showDateTimePicker}>
          <DateTimePicker
            style={styles.label}
            date={input.value || new Date()} //date is transformed from input
            onDateChange={this.handleChange}
            mode={inputProps.mode || "date"}
            cancelTextIOS="Annulla"
            confirmTextIOS="Conferma"
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
            value={this.getFormatByMode(input.value, inputProps.mode)}
          />
        </TouchableOpacity>
      </View>
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
