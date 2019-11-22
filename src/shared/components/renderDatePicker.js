import React from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import DatePicker from "react-native-datepicker";

export default renderDateTimePicker = ({
  input: { onChange, value },
  showTime,
  mode,
  showIcon,
  onDateChange,
  date
}) => (
  <DatePicker
    onChange={onChange}
    format="DD MMM YYYY"
    time={showTime}
    mode={mode}
    date={date}
    onDateChange={onDateChange}
    showIcon={showIcon}
    // value={!value ? null : new Date(value)}
  />
);
