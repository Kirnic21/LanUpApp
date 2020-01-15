import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
  FlatList
} from "react-native";
import {} from "react-native-gesture-handler";
import audienceBand from "~/assets/images/audience-band.png";
import backWhite from "~/assets/images/black-and-white.png";
import FastImage from "react-native-fast-image";
import dimensions from "~/assets/Dimensions/index";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const VancancyCard = ({}) => {
  const DATA = [
    {
      id: "1",
      title: "Balada TheWeek"
    },
    {
      id: "2",
      title: "Balada TheWeek"
    },
    {
      id: "3",
      title: "Balada TheWeek"
    },
    {
      id: "4",
      title: "Balada TheWeek"
    }
  ];
  function Item({ id, title, selected, onSelect }) {
    return (
      <View
        style={{
          backgroundColor: "#23203F",
          flexDirection: "row",
          marginLeft: "5%",
          height: dimensions(150),
          width: "100%",
          borderBottomLeftRadius: dimensions(15),
          borderTopLeftRadius: dimensions(15),
          marginTop: "5%"
        }}
      >
        <View
          style={{
            justifyContent: "center",
            width: "33%"
          }}
        >
          <FastImage
            source={audienceBand}
            style={{
              height: dimensions(120),
              width: dimensions(120),
              left: "-20%"
            }}
          />
        </View>
        <View
          style={{
            marginVertical: dimensions(22),
            width: "67%"
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FastImage
              source={backWhite}
              style={{ height: dimensions(20), width: dimensions(20) }}
            />
            <Text
              style={{
                fontFamily: "HelveticaNowDisplay-Regular",
                fontSize: dimensions(12),
                color: "#FFF",
                left: "10%"
              }}
            >
              Allison Ackerman -{" "}
              <Text style={{ fontSize: dimensions(10) }}>à 4h atrás</Text>
            </Text>
          </View>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              fontFamily: "HelveticaNowDisplay-Regular",
              color: "#FFF",
              fontSize: dimensions(24),
              width: "85%"
            }}
          >
            {title}
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: "2%",
              justifyContent: "space-between",
              width: "100%"
            }}
          >
            <View
              style={{
                backgroundColor: "#FFFFFF85",
                width: "20%",
                borderRadius: dimensions(10),
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text
                style={{
                  color: "#18142F",
                  fontFamily: "HelveticaNowMicro-Bold",
                  fontSize: dimensions(12),
                  paddingHorizontal: "4%"
                }}
              >
                SÁB{"\n"}
                <Text style={{ fontSize: dimensions(20) }}>10</Text>
                {"\n"}OUT
              </Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                justifyContent: "space-between",
                width: "50%"
              }}
            >
              <Text
                style={{
                  fontSize: dimensions(12),
                  color: "#FFF",
                  lineHeight: dimensions(18)
                }}
              >
                3 turnos e 4 vagas{"\n"}Jardim Paulista, SP
              </Text>
              <Text
                style={{
                  fontFamily: "HelveticaNowDisplay-Regular",
                  fontSize: dimensions(12),
                  color: "#FFF"
                }}
              >
                Valor total:
                <Text
                  style={{
                    fontFamily: "HelveticaNowDisplay-Regular",
                    color: "#46C5F3"
                  }}
                >
                  R$<Text style={{ fontSize: dimensions(20) }}>140,</Text>00
                </Text>
              </Text>
            </View>
            <TouchableOpacity
              style={{
                width: "26%",
                marginTop: "-5%"
              }}
            >
              <Icon
                color={"#FFF"}
                name={"chevron-right"}
                size={dimensions(45)}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => <Item id={item.id} title={item.title} />}
        keyExtractor={item => item.id}
        // extraData={selected}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default VancancyCard;
