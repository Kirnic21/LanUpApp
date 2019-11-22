import React, { Component } from "react";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar
} from "react-native";

import { Field, reduxForm } from "redux-form";

class Agencies extends Component {
  state = {
    visible: false
  };

  render() {
    const { handleSubmit, invalid } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            <Text>aaaaa</Text>
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
    width: "100%",
    alignItems: "center"
  }
});

export default Agencies = reduxForm({
  form: "Agencies",
  enableReinitialize: true
})(Agencies);
