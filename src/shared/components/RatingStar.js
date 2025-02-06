import React from "react";
import { View, Text } from "react-native";
import StarRating from "react-native-star-rating-widget";
import { calcWidth } from "~/assets/Dimensions";

const RatingStar = ({ title, rating, selectedStar }) => {
  return (
    <View>
      <Text
        style={{
          fontFamily: "HelveticaNowMicro-Regular",
          fontSize: calcWidth(3.5),
          color: "#FFFFFF",
          padding: calcWidth(1)
        }}
      >
        {title}
      </Text>
      <View
        style={{
          backgroundColor: "#24203B",

          padding: calcWidth(2.5),
          paddingHorizontal: calcWidth(5),
          borderRadius: calcWidth(15),
          marginBottom: calcWidth(4)
        }}
      >
        <StarRating
          disabled={false}
          maxStars={5}
          emptyStarColor="#C5B9EE"
          fullStarColor="#FFCC00"
          rating={rating}
          starSize={calcWidth(14)}
          selectedStar={selectedStar}
        />
      </View>
    </View>
  );
};

export default RatingStar;
