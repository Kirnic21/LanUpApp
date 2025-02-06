import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import * as Animatable from "react-native-animatable";
import Icon from "react-native-vector-icons/MaterialIcons";
import dimensions, { calcWidth, adjust } from "~/assets/Dimensions";
import debounceButton from "~/shared/helpers/debounce";

const Button = debounceButton(TouchableOpacity);

const ButtonPulse = ({
  circleStyle,
  titleStyle,
  title,
  styleButton,
  startAnimations,
  iconColor,
  onPress,
  size="small",
  color,
  icon,
  titleColor,
  disabled,
}) => {
  const fadeIn = {
    from: {
      scale: 1,
    },
    to: {
      scale: 1.1,
    },
  };


  const ButtonSize = () =>
    ({
      small: {
        height: calcWidth(20),
        width: calcWidth(20),
        backgroundColor: color || "#FFF",
      },
      normal: [
        {
          height: calcWidth(32),
          width: calcWidth(32),
          backgroundColor: color || "#FFF",
        },
        styles.titleNormal,
      ],
    }[size]);

  const circleSize = () =>
    ({
      small: {
        height: calcWidth(22),
        width: calcWidth(22),
        opacity: 0.5,
        backgroundColor: color || "#FFF",
      },
      normal: [
        {
          height: calcWidth(35),
          width: calcWidth(35),
          opacity: 0.5,
          backgroundColor: color || "#FFF",
        },
      ],
    }[size]);

  return (
    <View style={styles.container}>
      {startAnimations ? (
        <Animatable.View
          animation={fadeIn}
          iterationCount="infinite"
          delay={1}
          style={[styles.circle, circleStyle, circleSize()]}
          direction="alternate-reverse"
          useNativeDriver={false}
        />
      ) : (
        <View
          style={[
            styles.circle,
            size !== "small" ? styles.animationOff : styles.animationOffSmall,
            { backgroundColor: color },
          ]}
        />
      )}
      <View style={{ position: "absolute" }}>
        <Button
          style={[styles.btn, styleButton, ButtonSize()]}
          onPress={onPress}
          disabled={disabled}
        >
          {icon !== undefined ? (
            <Icon
              name={icon}
              size={size !== "small" ? calcWidth(12) : calcWidth(8.5)}
              color={"#FFF" || iconColor}
            />
          ) : (
            <></>
          )}
          <Text
            allowFontScaling={false}
            style={[
              titleStyle,
              styles.fontFamilyHR,
              { color: titleColor !== undefined ? titleColor : "#FFF" },
              size !== "small" ? styles.titleNormal : styles.titleSmall,
            ]}
          >
            {title}
          </Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    backgroundColor: "#FFF",
    height: calcWidth(35),
    width: calcWidth(35),
    borderRadius: dimensions(200),
  },
  btn: {
    backgroundColor: "#FFF",
    borderRadius: dimensions(150),
    justifyContent: "center",
    alignItems: "center",
    height: calcWidth(32),
    width: calcWidth(32),
  },
  titleNormal: {
    fontSize: adjust(12),
  },
  titleSmall: {
    fontSize: adjust(7),
  },
  fontFamilyHR: {
    fontFamily: "HelveticaNowMicro-Regular",
  },
  animationOff: {
    opacity: 0.5,
    height: calcWidth(37),
    width: calcWidth(37),
  },
  animationOffSmall: {
    opacity: 0.5,
    height: calcWidth(22.5),
    width: calcWidth(22.5),
  },
});

export default ButtonPulse;
