import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Lottie from "lottie-react-native";
import loadingSpinner from "~/assets/loadingSpinner.json";
import { calcWidth, adjust } from "~/assets/Dimensions";

const ButtonLoading = ({
  loading,
  size,
  color,
  name,
  disabled,
  onPress,
  cliclButtonColor,
}) => {
  const buttonSize = size === "small" ? 40 : size === "large" ? 70 : 55;
  const buttonColor = disabled ? "#6C757D" : color || "#FFFFFF";

  const [animation_login, setAnimation_login] = useState(
    new Animated.Value(calcWidth(buttonSize))
  );
  const [backgroundColor, setBackgroundcolor] = useState(new Animated.Value(0));

  const _animation = () => {
    Animated.sequence([
      Animated.timing(backgroundColor, {
        toValue: 1,
        duration: 300,
      }),
      Animated.timing(animation_login, {
        toValue: calcWidth(5),
        duration: 550,
        delay: 100,
      }),
    ]).start();

    setTimeout(() => {
      setAnimation_login(new Animated.Value(calcWidth(buttonSize)));
      setBackgroundcolor(new Animated.Value(0));
    }, 800);
  };
  return (
    <View>
      <TouchableOpacity
        onPress={() =>
          !_animation()
            ? setTimeout(() => {
                onPress();
              }, 800)
            : null
        }
        disabled={disabled}
      >
        <View
          pointerEvents={loading ? "none" : "auto"}
          style={styles.button_container}
        >
          {loading ? (
            <Animated.View
              style={[
                styles.animation,
                {
                  width: animation_login,
                  height: calcWidth(13),
                  backgroundColor: backgroundColor.interpolate({
                    inputRange: [0, 1],
                    outputRange: [buttonColor, cliclButtonColor || "#FFFFFF"],
                  }),
                },
              ]}
            >
              {loading && <Text style={styles.textButton}>{name}</Text>}
            </Animated.View>
          ) : (
            <View>
              <Lottie
                autoSize
                style={{
                  height: calcWidth(16),
                  width: calcWidth(16),
                }}
                resizeMode="cover"
                source={loadingSpinner}
                loop
                autoPlay
              />
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const width = Dimensions.get("screen").width;

var styles = StyleSheet.create({
  button_container: {
    alignItems: "center",
    justifyContent: "center",
  },
  animation: {
    paddingVertical: calcWidth(3.1),
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  textButton: {
    color: "#FFF",
    fontSize: adjust(10),
    fontFamily: "HelveticaNowMicro-Regular",
  },
});

export default ButtonLoading;
