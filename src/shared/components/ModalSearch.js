import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Platform } from "react-native";
import { adjust, calcHeight, calcWidth } from "~/assets/Dimensions";
import InputSearch from "~/shared/components/InputSearch";

import Lottie from "lottie-react-native";
import loadingSpinner from "~/assets/loadingSpinner.json";

import ModalComponent from "./ModalComponent";

export default ModalSearch = ({
  handleOnSearch,
  debounceTime,
  load,
  data,
  EmptyText,
  placeHolder,
  onlyId,
  label,
  style,
  input: { value, onChange, ...input },
  meta: { touched, error },
}) => {
  const [visible, setVisible] = useState(false);
  return (
    <View>
      <Text
        style={{
          color: "white",
          fontSize: adjust(10),
          top: "-5%",
          fontFamily: "HelveticaNowMicro-Regular",
        }}
      >
        {label}
      </Text>
      <TouchableOpacity
        onPress={() => setVisible(true)}
        style={[
          styles.inputStyles,
          style,
          touched && error && { borderColor: "#F13567" },
        ]}
      >
        {onlyId ? (
          <Text
            style={[
              styles.textInput,
              !value?.id && { color: "rgba(255, 255, 255, 0.6)" },
            ]}
          >
            {value?.id || placeHolder}
          </Text>
        ) : (
          <Text
            style={[
              styles.textInput,
              !value?.name && { color: "rgba(255, 255, 255, 0.6)" },
            ]}
          >
            {value?.name || placeHolder}
          </Text>
        )}
      </TouchableOpacity>
      {touched && error && (
        <Text
          style={{
            color: "#F13567",
            fontSize: adjust(9),
            fontFamily: "HelveticaNowMicro-Regular",
          }}
        >
          {error}
        </Text>
      )}
      <ModalComponent
        heightModal={Platform.OS === "ios" ? calcHeight(85) : "auto"}
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <View style={styles.inputContainer}>
          <InputSearch
            handleOnSearch={handleOnSearch}
            debounceTime={debounceTime}
          />
        </View>
        <View style={styles.container}>
          <FlatList
            ListEmptyComponent={
              <View style={styles.containerEmpty}>
                {load ? (
                  <Lottie
                    autoSize
                    style={{
                      height: calcWidth(14),
                      width: calcWidth(14),
                    }}
                    resizeMode="cover"
                    source={loadingSpinner}
                    loop
                    autoPlay
                  />
                ) : (
                  <Text style={[styles.text, { borderBottomWidth: 0 }]}>
                    {EmptyText}
                  </Text>
                )}
              </View>
            }
            data={data || []}
            renderItem={({ item }) => (
              <TouchableOpacity
                {...input}
                onPress={() => {
                  onChange(item);
                  setVisible(false);
                }}
                style={{}}
              >
                <Text style={styles.text}>{item.name}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={() => Math.random().toString()}
          />
        </View>
      </ModalComponent>
    </View>
  );
};

const styles = {
  text: {
    color: "#FFF",
    fontSize: adjust(12),
    fontFamily: "HelveticaNowMicro-Regular",
    padding: "3%",
    borderBottomWidth: 1,
    borderBottomColor: "#FFFF",
  },
  container: {
    backgroundColor: "#18142F",
    padding: "5%",
    maxHeight: "60%",
    borderRadius: 15,
    marginTop: "5%",
  },
  containerEmpty: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: "10%",
  },

  inputContainer: {
    marginTop: "5%",
  },

  inputContainer: {
    marginTop: "5%",
  },

  inputStyles: {
    height: 50,
    width: "100%",
    borderRadius: 50,
    borderWidth: 2,
    paddingHorizontal: "7%",
    borderColor: "#FFFFFF",
    display: "flex",
    justifyContent: "center",
  },
  textInput: {
    color: "#FFFFFF",
    fontFamily: "HelveticaNowMicro-Regular",
    fontSize: adjust(10),
    textAlignVertical: "center",
  },
};
