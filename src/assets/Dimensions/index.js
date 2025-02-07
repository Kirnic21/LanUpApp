import React from "react";
import { PixelRatio, Dimensions, Platform } from "react-native";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");
const pixelRatio = PixelRatio.get();

// based on iphone 5s's scale
const scale = Math.round(deviceWidth / 320);

export default function dimensions(size) {
  const newSize = size * scale;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}


export const calcHeight = x =>
  PixelRatio.roundToNearestPixel((deviceHeight * x) / 100);
export const calcWidth = x =>
  PixelRatio.roundToNearestPixel((deviceWidth * x) / 100);


  export const adjust = (size) => {
    if (pixelRatio >= 2 && pixelRatio < 3) {
        // iphone 5s and older Androids
        if (deviceWidth < 360) {
            return size * 0.95;
        }
        // iphone 5
        if (deviceHeight < 667) {
            return size;
            // iphone 6-6s
        } if (deviceHeight >= 667 && deviceHeight <= 735) {
            return size * 1.15;
        }
        // older phablets
        //Use o Math.Round, pois da um erro de Precision Error Float
        return Math.round(size * 1.27);
    } if (pixelRatio >= 3 && pixelRatio < 3.5) {
        // catch Android font scaling on small machines
        // where pixel ratio / font scale ratio => 3:3
        if (deviceWidth <= 360) {
            return size;
        }
        // Catch other weird android width sizings
        if (deviceHeight < 667) {
            return size * 1.15;
            // catch in-between size Androids and scale font up
            // a tad but not too much
        }
        if (deviceHeight >= 667 && deviceHeight <= 735) {
            return size * 1.2;
        }
        // catch larger devices
        // ie iphone 6s plus / 7 plus / mi note 等等
        return size * 1.27;
    } if (pixelRatio >= 3.5) {
        // catch Android font scaling on small machines
        // where pixel ratio / font scale ratio => 3:3
        if (deviceWidth <= 360) {
            return size;
            // Catch other smaller android height sizings
        }
        if (deviceHeight < 667) {
            return size * 1.2;
            // catch in-between size Androids and scale font up
            // a tad but not too much
        }
        if (deviceHeight >= 667 && deviceHeight <= 735) {
            return size * 1.25;
        }
        // catch larger phablet devices
        return size * 1.4;
    } return size;
};


