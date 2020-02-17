import React from "react";
import { View, Text, StyleSheet } from "react-native";
import dimensions, { calcWidth } from "~/assets/Dimensions";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Animatable from "react-native-animatable";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const ButtonPulse = ({
  circleStyle,
  titleStyle,
  title,
  styleButton,
  startAnimations,
  iconColor,
  onPress,
  size,
  color,
  icon,
  titleColor
}) => {
  const fadeIn = {
    from: {
      scale: 1
    },
    to: {
      scale: 1.1
    }
  };

  ButtonPulse.defaultProps = {
    size: "small"
  };

  const ButtonSize = () => {
    return {
      small: {
        height: calcWidth(20),
        width: calcWidth(20),
        backgroundColor: color || "#FFF"
      },
      normal: [
        {
          height: calcWidth(32),
          width: calcWidth(32),
          backgroundColor: color || "#FFF"
        },
        styles.titleNormal
      ]
    }[size];
  };

  const circleSize = () => {
    return {
      small: {
        height: calcWidth(22),
        width: calcWidth(22),
        opacity: 0.5,
        backgroundColor: color || "#FFF"
      },
      normal: [
        {
          height: calcWidth(35),
          width: calcWidth(35),
          opacity: 0.5,
          backgroundColor: color || "#FFF"
        }
      ]
    }[size];
  };

  return (
    <View style={styles.container}>
      {startAnimations ? (
        <Animatable.View
          animation={fadeIn}
          iterationCount="infinite"
          delay={1}
          style={[styles.circle, circleStyle, circleSize()]}
          direction="alternate-reverse"
        ></Animatable.View>
      ) : (
        <View
          style={[
            styles.circle,
            size !== "small" ? styles.animationOff : styles.animationOffSmall,
            { backgroundColor: color }
          ]}
        />
      )}
      <View style={{ position: "absolute" }}>
        <TouchableOpacity
          style={[styles.btn, styleButton, ButtonSize()]}
          onPress={onPress}
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
            style={[
              titleStyle,
              styles.fontFamilyHR,
              { color: titleColor !== undefined ? titleColor : "#FFF" },
              size !== "small" ? styles.titleNormal : styles.titleSmall
            ]}
          >
            {title}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  circle: {
    backgroundColor: "#FFF",
    height: calcWidth(35),
    width: calcWidth(35),
    borderRadius: dimensions(200)
  },
  btn: {
    backgroundColor: "#FFF",
    borderRadius: dimensions(150),
    justifyContent: "center",
    alignItems: "center",
    height: calcWidth(32),
    width: calcWidth(32)
  },
  titleNormal: {
    fontSize: calcWidth(4.3)
  },
  titleSmall: {
    fontSize: calcWidth(2.6)
  },
  fontFamilyHR: {
    fontFamily: "HelveticaNowMicro-Regular"
  },
  animationOff: {
    opacity: 0.5,
    height: calcWidth(37),
    width: calcWidth(37)
  },
  animationOffSmall: {
    opacity: 0.5,
    height: calcWidth(22.5),
    width: calcWidth(22.5)
  }
});

export default ButtonPulse;
