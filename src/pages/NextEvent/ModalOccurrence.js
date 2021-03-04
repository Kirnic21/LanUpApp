import React, { useState, useRef } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "~/shared/components/ModalComponent";
import dimensions, { calcHeight, calcWidth, adjust } from "~/assets/Dimensions/index";
import InputLabel from "~/shared/components/InputLabel";
import cameraPlus from "~/assets/images/camera-plus.png";
import Icon from "react-native-vector-icons/MaterialIcons";
import ImageSelector from "~/shared/components/ImageSelector";

import debounceButton from "~/shared/helpers/debounce";

const Button = debounceButton(TouchableOpacity);

const ModalOccurrence = ({
  visible,
  onClose,
  onChangeText,
  sendOcurrence,
  onPressSend,
  onImageSelected,
  loading,
  valueInput,
  picture,
}) => {
  const ImageSelectorRef = useRef(null);

  const handleOnPictureAdd = () => {
    const { ActionSheet } = ImageSelectorRef.current;
    ActionSheet.show();
  };
  const [height, setHeight] = useState(0);
  const updateSize = (height) => {
    setHeight(height);
  };

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      loading={loading}
      heightModal={picture ? dimensions(450) : calcWidth(90)}
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
            style={[
              styles.textInput,
              { height: Math.max(35, height > 125 ? 125 : height) },
            ]}
            value={valueInput}
            multiline={true}
            editable={loading ? false : true}
            onContentSizeChange={(e) => {
              updateSize(e.nativeEvent.contentSize.height);
            }}
          />
          <View
            pointerEvents={loading ? "none" : "auto"}
            style={styles.containerIcon}
          >
            <Button
              style={[
                styles.icon,
                sendOcurrence ? { left: calcWidth(0) } : { left: calcWidth(7) },
              ]}
              onPress={() => handleOnPictureAdd()}
            >
              <Image
                source={cameraPlus}
                style={{ height: calcWidth(7), width: calcWidth(7) }}
              />
            </Button>
            {sendOcurrence ? (
              <Button
                onPress={() => {
                  onPressSend(), updateSize(calcWidth(13));
                }}
                style={{ left: calcWidth(2) }}
              >
                <Icon size={calcWidth(7)} name="send" color="#46C5F3" />
              </Button>
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
        ref={ImageSelectorRef}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  title: {
    color: "#FFF",
    fontSize: adjust(20),
    fontFamily: "HelveticaNowMicro-Medium",
  },
  subTitle: {
    color: "#FFF",
    fontSize: adjust(15),
    fontFamily: "HelveticaNowMicro-Regular",
  },
  textInput: {
    backgroundColor: "#3f3d58",
    width: calcWidth(80),
    paddingRight: calcWidth(21),
    paddingVertical: calcWidth(3),
    maxHeight: calcWidth(40),
    fontSize: adjust(10),
    fontFamily: "HelveticaNowMicro-Regular",
  },
  containerIcon: {
    position: "relative",
    flexDirection: "row",
    top: calcWidth(-14),
    left: calcWidth(60),
  },
  img: {
    height: dimensions(150),
    width: calcWidth(75),
    borderRadius: calcWidth(5),
  },
  loading: {
    height: calcWidth(20),
    width: calcWidth(20),
    position: "absolute",
  },
});

export default ModalOccurrence;
