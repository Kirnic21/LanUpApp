import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Platform
} from "react-native";
import Modal, { ModalContent } from "react-native-modals";
import bank from "./bank";
import { SearchBar } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class ModalFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, search: "", bottomModalAndTitle: true };
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

  render() {
    const { search } = this.state;
    return (
      <View>
        <Modal.BottomModal
          visible={this.props.visible}
          onTouchOutside={this.props.onTouchOutside}
          height={0.5}
          width={1}
          modalStyle={{ backgroundColor: "transparent" }}
          onSwipeOut={() => this.setState({ bottomModalAndTitle: false })}
        >
          <ModalContent
            style={{
              flex: 1,
              backgroundColor: "#23203F",
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40
            }}
          >
            <View style={styles.viewStyle}>
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
                        this.setState({ search: "" });
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
          </ModalContent>
        </Modal.BottomModal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  viewStyle: {
    justifyContent: "center",
    flex: 1,
    marginTop: Platform.OS == "ios" ? 30 : 0
  },
  textStyle: {
    padding: 10,
    color: "#FFF"
  }
});
