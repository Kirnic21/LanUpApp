import React from "react";
import { PixelRatio, Dimensions, Platform } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

export default function dimensions(size) {
  const newSize = size * scale;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

export const deviceWidth = Dimensions.get("window").width;
export const deviceHeight = Dimensions.get("window").height;
export const calcHeight = x =>
  PixelRatio.roundToNearestPixel((deviceHeight * x) / 100);
export const calcWidth = x =>
  PixelRatio.roundToNearestPixel((deviceWidth * x) / 100);
