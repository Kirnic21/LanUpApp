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
  function Item({
    title,
    address,
    picture,
    amount,
    workShiftQuantity,
    totalVacancy,
    jobDate,
    job,
    start,
    end,
    eventCreationDate
  }) {
    formatDate = (date, form) => {
      return moment(date.substr(0, 10)).format(form);
    };
    // const a = moment(new Date());
    // const b = moment(eventCreationDate);
    // console.log(a.diff(b, "hours"));
    return (
      <TouchableOpacity
        onPress={e => onPress(job)}
        style={styles.containerCard}
      >
        <View style={{ justifyContent: "center", width: "33%" }}>
          {picture !== null && picture !== undefined ? (
            <View style={styles.imgCard}>
              <FastImage
                source={{ uri: picture.url }}
                resizeMode="cover"
                style={{
                  height: dimensions(116),
                  borderBottomRightRadius: dimensions(15),
                  borderTopRightRadius: dimensions(15)
                }}
              />
            </View>
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
            top: "-1.5%"
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FastImage
              resizeMode="contain"
              source={backWhite}
              style={{ height: dimensions(20), width: dimensions(20) }}
            />
            <Text style={[styles.name, styles.HelveticaNowDisplayRegular]}>
              Allison Ackerman -{" "}
              <Text style={{ fontSize: dimensions(10) }}>
                {moment(eventCreationDate)
                  .startOf("hour")
                  .fromNow()}
              </Text>
            </Text>
          </View>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[styles.nameEvent, styles.HelveticaNowDisplayRegular]}
          >
            {title}
          </Text>
          <View
            style={[
              styles.containerDate,
              title.length < 14 ? { marginTop: "0.5%" } : { marginTop: "3.4%" }
            ]}
          >
            <View style={styles.date}>
              <View style={{ alignItems: "center", top: "12%" }}>
                <Text style={styles.textDate}>
                  {formatDate(jobDate, "ddd")}
                </Text>
                <Text
                  style={[
                    styles.textDate,
                    {
                      fontSize: dimensions(20),
                      marginVertical: "-14%",
                      top: "2.8%"
                    }
                  ]}
                >
                  {formatDate(jobDate, "DD")}
                </Text>
                <Text style={styles.textDate}>
                  {formatDate(jobDate, "MMM")}
                </Text>
              </View>
            </View>
            <View style={styles.containerVancancy}>
              <View style={{ width: "100%" }}>
                <Text
                  ellipsizeMode="tail"
                  numberOfLines={1}
                  style={styles.TextVacancy}
                >
                  {start === undefined ? (
                    <Text>
                      {workShiftQuantity} turnos e {totalVacancy} vagas{"\n"}
                    </Text>
                  ) : (
                    <Text>
                      {start.substr(0, 5)} - {end.substr(0, 5)}
                    </Text>
                  )}
                </Text>
                <Text numberOfLines={1} style={styles.TextVacancy}>
                  {address}
                </Text>
              </View>
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
                marginLeft: "-2%",
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
            picture={item.picture}
            job={item}
            eventCreationDate={item.eventCreationDate}
            start={item.start}
            end={item.end}
          />
        )}
        keyExtractor={item => item.id}
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
    backgroundColor: "#FFFFFF85",
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
    marginTop: "3.4%",
    justifyContent: "space-between",
    width: "100%"
  },
  date: {
    backgroundColor: "#FFFFFF85",
    alignItems: "center",
    height: dimensions(62),
    width: dimensions(50),
    marginRight: "4%",
    top: "2.6%",
    borderRadius: dimensions(10)
  },
  textDate: {
    color: "#18142F",
    fontFamily: "HelveticaNowMicro-Bold",
    fontSize: dimensions(12)
  },
  containerVancancy: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "50%",
    top: "1%"
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
