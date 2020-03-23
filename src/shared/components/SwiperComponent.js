import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import Swiper from "react-native-swiper";
import dimensions, { calcWidth } from "~/assets/Dimensions";
import Lottie from "lottie-react-native";
import loadingSpinner from "~/assets/loadingSpinner.json";

const SwiperComponent = ({ list, loading }) => {
  const data = list || [{ month: "----", valueMonth: "----" }];
  return (
    <Swiper
      style={styles.wrapper}
      showsButtons
      showsPagination={false}
      buttonWrapperStyle={styles.buttonWrapper}
      nextButton={<Text style={styles.buttonText}>›</Text>}
      prevButton={<Text style={styles.buttonText}>‹</Text>}
    >
      {loading ? (
        <View style={styles.slide}>
          <Lottie
            autoSize
            style={{
              height: calcWidth(30),
              width: calcWidth(30)
            }}
            resizeMode="cover"
            source={loadingSpinner}
            loop
            autoPlay
          />
        </View>
      ) : (
        <View>
          {data.map(({ month, valueMonth }, id) => (
            <View key={id} style={styles.slide}>
              <Text
                style={[
                  styles.title,
                  styles.fontHNM_regular,
                  { paddingBottom: calcWidth(5) }
                ]}
              >
                {month}
              </Text>
              <Text
                style={[
                  styles.title,
                  styles.fontHNM_regular,
                  { fontSize: dimensions(14) }
                ]}
              >
                Ganhei este mês
              </Text>
              <Text
                style={[
                  styles.title,
                  styles.fontHNM_regular,
                  { color: "#46C5F3" }
                ]}
              >
                R$ {valueMonth}
              </Text>
            </View>
          ))}
        </View>
      )}
    </Swiper>
  );
};

const styles = {
  wrapper: {},
  slide: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#24203B",
    padding: calcWidth(5)
  },
  fontHNM_regular: {
    fontFamily: "HelveticaNowMicro-Regular"
  },
  title: {
    color: "#fff",
    fontSize: dimensions(20)
  },
  buttonWrapper: {
    top: calcWidth(-2),
    height: calcWidth(20),
    paddingHorizontal: calcWidth(10)
  },
  buttonText: {
    color: "#9b99a5",
    fontSize: dimensions(35)
  }
};

export default SwiperComponent;
