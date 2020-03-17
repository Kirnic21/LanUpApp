import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "~/shared/components/ModalComponent";
import { calcHeight, calcWidth } from "~/assets/Dimensions/index";
import InputLabel from "~/shared/components/InputLabel";
import cameraPlus from "~/assets/images/camera-plus.png";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ImageSelector from "~/shared/components/ImageSelector";
import Lottie from "lottie-react-native";
import loadingSpinner from "~/assets/loadingSpinner.json";
import { useState } from "react";

const ModalOccurrence = ({
  visible,
  onClose,
  onChangeText,
  sendOcurrence,
  onPressSend,
  onImageSelected,
  loading,
  valueInput,
  picture
}) => {
  const handleOnPictureAdd = () => {
    this.ImageSelector.ActionSheet.show();
  };
  const [height, setHeight] = useState(0);
  const updateSize = height => {
    setHeight(height);
  };

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      style={{ height: picture ? calcHeight(76) : calcWidth(90) }}
    >
      <View style={{ marginHorizontal: calcWidth(5) }}>
        <Text style={styles.title}>Ocorrência</Text>
        <View style={{ marginTop: calcHeight(4) }}>
          <Text style={styles.subTitle}>O que aconteceu?</Text>
          {picture ? (
            <View style={{ alignItems: "center", margin: calcWidth(3) }}>
              <Image source={{ uri: picture }} style={styles.img} />
            </View>
          ) : (
            <></>
          )}
          <InputLabel
            isfocused="#46C5F3"
            onChangeText={onChangeText}
            style={[styles.textInput, { height: Math.max(35, height) }]}
            value={valueInput}
            multiline={true}
            editable={loading ? false : true}
            onContentSizeChange={e => {
              if (height < 130) {
                updateSize(e.nativeEvent.contentSize.height);
              }
            }}
          />
          <View style={{ alignItems: "center" }}>
            {loading ? (
              <Lottie
                autoSize
                style={styles.loading}
                resizeMode="cover"
                source={loadingSpinner}
                loop
                autoPlay
              />
            ) : (
              <></>
            )}
          </View>
          <View
            pointerEvents={loading ? "none" : "auto"}
            style={styles.containerIcon}
          >
            <TouchableOpacity
              style={[
                styles.icon,
                sendOcurrence ? { left: calcWidth(0) } : { left: calcWidth(7) }
              ]}
              onPress={() => handleOnPictureAdd()}
            >
              <Image
                source={cameraPlus}
                style={{ height: calcWidth(7), width: calcWidth(7) }}
              />
            </TouchableOpacity>
            {sendOcurrence ? (
              <TouchableOpacity
                onPress={onPressSend}
                style={{ left: calcWidth(2) }}
              >
                <Icon size={calcWidth(7)} name="send" color="#46C5F3" />
              </TouchableOpacity>
            ) : (
              <></>
            )}
          </View>
        </View>
      </View>
      <ImageSelector
        onImageSelected={onImageSelected}
        width={2250}
        height={3000}
        ref={o => (this.ImageSelector = o)}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  title: {
    color: "#FFF",
    fontSize: calcWidth(8),
    fontFamily: "HelveticaNowMicro-Medium"
  },
  subTitle: {
    color: "#FFF",
    fontSize: calcWidth(5.5),
    fontFamily: "HelveticaNowMicro-Regular"
  },
  textInput: {
    backgroundColor: "#3f3d58",
    width: calcWidth(80),
    paddingRight: calcWidth(21),
    paddingVertical: calcWidth(3),
    maxHeight: calcWidth(40),
    fontSize: calcWidth(4),
    fontFamily: "HelveticaNowMicro-Regular"
  },
  containerIcon: {
    position: "relative",
    flexDirection: "row",
    top: calcWidth(-14),
    left: calcWidth(60)
  },
  img: {
    height: calcWidth(50),
    width: calcWidth(75),
    borderRadius: calcWidth(5)
  },
  loading: {
    height: calcWidth(20),
    width: calcWidth(20),
    position: "absolute"
  }
});

export default ModalOccurrence;
