import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Platform
} from "react-native";
import Modal from "~/shared/components/ModalComponent";
import bank from "./bank";
import { SearchBar } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import styles from "./styles";

export default class ModalFilterBank extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      search: "",
      bottomModalAndTitle: true,
      visible: false,
      code: ""
    };
    this.arrayholder = [];
  }

  SearchFilterFunction(text) {
    const newData = bank.filter(function(item) {
      const itemData = item.description
        ? item.description.toUpperCase()
        : "".toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      dataSource: newData,
      search: text
    });
  }

  search = text => {
    this.setState({ text });
    console.log(text);
  };
  clear = () => {
    this.search.clear();
  };

  bank = e => {
    this.setState({ code: e });
  };

  render() {
    const { search, visible, code } = this.state;
    const { bankCode } = this.props;
    return (
      <View>
        <TouchableOpacity
          style={styles.btnBank}
          onPress={() => this.setState({ visible: true })}
        >
          <Text style={{ color: "#FFF", paddingLeft: "15%" }}>
            {code.length ? code : bankCode}
          </Text>
        </TouchableOpacity>
        <Modal
          onClose={() => this.setState({ visible: false })}
          onTouchOutside={() => this.setState({ visible: false })}
          visible={visible}
          onSwipeOut={() => this.setState({ bottomModalAndTitle: false })}
        >
          <View style={styles.containerModalBank}>
            <SearchBar
              round
              containerStyle={{
                backgroundColor: "#23203F",
                borderTopWidth: 0,
                borderBottomWidth: 0
              }}
              color={"#FFF"}
              inputContainerStyle={{ backgroundColor: "#FFF" }}
              inputStyle={{ color: "#000" }}
              searchIcon={{ size: 24, color: "#000" }}
              placeholderTextColor={"#000"}
              onChangeText={text => this.SearchFilterFunction(text)}
              onClear={text => this.SearchFilterFunction(text)}
              placeholder="Digite aqui..."
              value={search}
            />
            <FlatList
              data={this.state.dataSource}
              ItemSeparatorComponent={this.ListViewItemSeparator}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    this.props.onPress(item.id),
                      this.setState({ search: "", visible: false });
                    this.bank(item.id);
                  }}
                >
                  {search.length ? (
                    <Text style={styles.textStyle}>{item.description}</Text>
                  ) : (
                    <View></View>
                  )}
                </TouchableOpacity>
              )}
              enableEmptySections={true}
              style={{ marginTop: 10 }}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </Modal>
      </View>
    );
  }
}
