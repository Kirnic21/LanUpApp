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
import Icon from "react-native-vector-icons/FontAwesome";
import { Avatar } from "react-native-elements";
import moment from "moment";

const VancancyCard = ({ onPress, listVacancy }) => {
  debugger;
  function Item({
    // id,
    title,
    // selected,
    // onSelect,
    address,
    picture,
    amount,
    workShiftQuantity,
    totalVacancy,
    jobDate
  }) {
    formatDate = (date, form) => {
      return moment(date).format(form);
    };
    // const a = moment(new Date());
    // const b = moment(eventCreationDate);
    // console.log(a.diff(b, "hours"));
    return (
      <TouchableOpacity onPress={onPress} style={styles.containerCard}>
        <View style={{ justifyContent: "center", width: "33%" }}>
          {picture !== undefined ? (
            <FastImage source={{ uri: picture }} style={styles.imgCard} />
          ) : (
            <View style={[styles.imgCard, styles.emptyImg]}>
              <Icon name="image" size={dimensions(35)} color="#23203F" />
            </View>
          )}
        </View>
        <View
          style={{
            marginVertical: dimensions(22),
            width: "67%",
            top: "-1%"
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FastImage
              source={backWhite}
              style={{ height: dimensions(20), width: dimensions(20) }}
            />
            <Text style={[styles.name, styles.HelveticaNowDisplayRegular]}>
              Allison Ackerman -{" "}
              <Text style={{ fontSize: dimensions(10) }}>à 4h atrás</Text>
            </Text>
          </View>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[styles.nameEvent, styles.HelveticaNowDisplayRegular]}
          >
            {title}
          </Text>
          <View style={styles.containerDate}>
            <View style={styles.date}>
              <Text style={styles.textDate}>
                {formatDate(jobDate, "ddd")}
                {"\n"}
                <Text style={{ fontSize: dimensions(20) }}>
                  {formatDate(jobDate, "DD")}
                </Text>
                {"\n"} {formatDate(jobDate, "MMM")}
              </Text>
            </View>
            <View style={styles.containerVancancy}>
              <Text
                ellipsizeMode="tail"
                numberOfLines={2}
                style={styles.TextVacancy}
              >
                {workShiftQuantity} turnos e {totalVacancy} vagas{"\n"}
                {address}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={[styles.textValue, styles.HelveticaNowDisplayRegular]}
                >
                  Valor total:
                </Text>
                <Text
                  ellipsizeMode="tail"
                  numberOfLines={1}
                  style={{
                    fontFamily: "HelveticaNowDisplay-Regular",
                    width: "70%",
                    color: "#46C5F3",
                    fontSize: dimensions(20)
                  }}
                >
                  <Text style={{ fontSize: dimensions(12) }}> R$</Text>
                  {amount}
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "26%",
                marginTop: "-5%",
                alignItems: "center"
              }}
            >
              <Icon color={"#FFF"} name={"angle-right"} size={dimensions(40)} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={listVacancy}
        renderItem={({ item }) => (
          <Item
            id={item.id}
            title={item.eventName}
            address={item.address}
            amount={item.amount}
            workShiftQuantity={item.workShiftQuantity}
            totalVacancy={item.totalVacancy}
            jobDate={item.jobDate}
          />
        )}
        keyExtractor={item => item.id}
        // extraData={selected}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerCard: {
    backgroundColor: "#23203F",
    flexDirection: "row",
    marginLeft: "5%",
    height: dimensions(150),
    width: "100%",
    borderBottomRightRadius: dimensions(15),
    borderTopRightRadius: dimensions(15),
    marginTop: "5%"
  },
  imgCard: {
    height: dimensions(120),
    top: "-2%",
    width: dimensions(120),
    left: "-20%"
  },
  emptyImg: {
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    borderBottomRightRadius: dimensions(15),
    borderTopRightRadius: dimensions(15)
  },
  name: {
    fontSize: dimensions(12),
    color: "#FFF",
    left: "10%"
  },
  nameEvent: {
    color: "#FFF",
    fontSize: dimensions(24),
    width: "85%"
  },
  containerDate: {
    flexDirection: "row",
    marginTop: "2%",
    justifyContent: "space-between",
    width: "100%"
  },
  date: {
    backgroundColor: "#FFFFFF85",
    width: "20%",
    borderRadius: dimensions(10),
    alignItems: "center",
    justifyContent: "center"
  },
  textDate: {
    color: "#18142F",
    fontFamily: "HelveticaNowMicro-Bold",
    fontSize: dimensions(12),
    paddingHorizontal: "4%"
  },
  containerVancancy: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "50%"
  },
  TextVacancy: {
    fontSize: dimensions(12),
    color: "#FFF",
    lineHeight: dimensions(18),
    width: "100%"
  },
  textValue: {
    fontSize: dimensions(12),
    color: "#FFF",
    textAlignVertical: "bottom",
    top: "-2%"
  },
  HelveticaNowDisplayRegular: {
    fontFamily: "HelveticaNowDisplay-Regular"
  }
});

export default VancancyCard;
