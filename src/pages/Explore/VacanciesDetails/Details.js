import React, { useCallback, useMemo, useState } from "react";
import {
  View,
  StatusBar,
  StyleSheet,
  ScrollView,
  Text,
  Linking,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import formatDate from "~/shared/helpers/formatDate";
import { calcWidth, adjust } from "~/assets/Dimensions";
import debounceButton from "~/shared/helpers/debounce";
import { AlertHelper } from "~/shared/helpers/AlertHelper";

import SpinnerComponent from "~/shared/components/SpinnerComponent";
import SelectComponent from "~/shared/components/SelectComponent";
import ButtonComponent from "~/shared/components/ButtonCompoent";
import ButtonLeave from "~/shared/components/RoundButton";

import CardImageVacancies from "./CardImageVacancies";
import ShiftCard from "./ShiftCard";
import CardDeitailsVacancies from "./CardDeitailsVacancies";

const Button = debounceButton(ButtonComponent);

import HTML from "react-native-render-html";
import RNFS from "react-native-fs";
import FileViewer from "react-native-file-viewer";
import Icon from "react-native-vector-icons/MaterialIcons";

const Details = ({
  details: {
    workshiftsQuantity,
    location,
    image,
    isHomeOffice,
    hasSecurityProtocol,
    payment,
    vacancyQuantity,
    serviceDetail,
    eventDescription,
    previewResponsabilities,
    responsabilities,
    checkListCheckinPreview,
    checkListCheckoutPreview,
    checkListAtCheckin,
    checkListAtCheckout,
  },
  selectShift = () => ({}),
  onPressAccept = () => ({}),
  onPressLeave = () => ({}),
  loading,
  params: {
    job: { status, start, end, eventName, job: service, jobDate, day },
  },
}) => {
  const [selectedShift, setSelectedShift] = useState(false);
  const [terms, setTerms] = useState(false);

  const url =
    "https://drive.google.com/uc?id=1KS3Gha7epmpV0Yc3zLyrctMSgBppiz_f&export=download";
  const localFile = `${RNFS.DocumentDirectoryPath}/Termos de Segurança.docx`;

  const parseCheckin = useMemo(() => {
    return formatDate(start);
  }, [start]);
  const parseCheckout = useMemo(() => {
    return formatDate(end);
  }, [end]);

  const _workshiftsQuantity =
    status === 0 || status === 8
      ? `${workshiftsQuantity}turnos`
      : `${parseCheckin} - ${parseCheckout}`;

  const openTerms = () => {
    const options = {
      fromUrl: url,
      toFile: localFile,
    };
    RNFS.downloadFile(options)
      .promise.then(() => FileViewer.open(localFile))
      .catch((error) =>
        AlertHelper.show("error", "Erro", error.response.data.errorMessage)
      );
  };

  const validationButton = useCallback(() => {
    if (hasSecurityProtocol) {
      return status === 0 && terms ? selectedShift : terms;
    }

    if (!hasSecurityProtocol) {
      return status === 0 ? selectedShift : true;
    }
  }, [hasSecurityProtocol, status, terms, selectedShift]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor="#00000060"
        translucent={true}
        barStyle="light-content"
      />

      <SpinnerComponent loading={loading} />
      <ScrollView style={{ flex: 1 }}>
        <View>
          <CardImageVacancies
            title={`${eventName}`}
            shift={`${_workshiftsQuantity}`}
            location={`${location ? location : "Evento Home office"}`}
            eventDate={jobDate || day}
            picture={image}
            isHomeOffice={isHomeOffice}
          />
        </View>
        <View style={{ marginHorizontal: "5%" }}>
          <ShiftCard
            title={`${service}`}
            subTitle={
              status === 1 ? (
                <Text style={styles.textVacancy}>vaga urgente</Text>
              ) : (
                `${vacancyQuantity} vagas`
              )
            }
            value={`${payment}`}
            content={status === 0 || status === 8 ? serviceDetail : null}
            status={status === 5}
          />
          <CardDeitailsVacancies
            title="Briefing"
            contentTextStyle={styles.colorWhite}
            isModalOn={false}
          >
            <HTML
              baseFontStyle={styles.colorWhite}
              html={`<Div>${eventDescription}</Div>`}
              onLinkPress={(event, href) => {
                Linking.openURL(href);
              }}
            />
          </CardDeitailsVacancies>
          <View>
            <CardDeitailsVacancies
              title="Deveres"
              contentTextStyle={styles.colorWhite}
              isModalOn={true}
              previewContent={previewResponsabilities}
              content={responsabilities}
            />
            {status === 5 ? (
              <CardDeitailsVacancies
                title="Benefícios"
                contentTextStyle={styles.colorWhite}
                isModalOn={false}
              >
                <Text
                  style={[
                    styles.colorWhite,
                    {
                      fontSize: adjust(10),
                      fontFamily: "HelveticaNowMicro-Regular",
                    },
                  ]}
                >
                  (VR 40,00 c/ desconto de 20% +VT + AM s/ desconto e não
                  extensiva)
                </Text>
              </CardDeitailsVacancies>
            ) : (
              <View>
                <CardDeitailsVacancies
                  title="Check In"
                  contentTextStyle={styles.colorWhite}
                  isModalOn={true}
                  previewContent={checkListCheckinPreview}
                  content={checkListAtCheckin}
                />
                <CardDeitailsVacancies
                  title="Check Out"
                  contentTextStyle={styles.colorWhite}
                  isModalOn={true}
                  previewContent={checkListCheckoutPreview}
                  content={checkListAtCheckout}
                />
              </View>
            )}
          </View>
        </View>
        <View style={{ marginHorizontal: "5%", paddingVertical: "5%" }}>
          {status === 0 && (
            <SelectComponent
              label="Turnos disponíveis"
              onSelect={(value) => {
                selectShift(value);
                setSelectedShift(!!value);
              }}
              options={serviceDetail?.map((x) => ({
                label: `${formatDate(x.checkin)} - ${formatDate(x.checkout)}`,
                value: x,
              }))}
            />
          )}
          {hasSecurityProtocol && [0, 1, 8].includes(status) && (
            <View style={styles.containerCheckbox}>
              <TouchableOpacity onPress={() => setTerms((prev) => !prev)}>
                <Icon
                  name={terms ? "check-box" : "check-box-outline-blank"}
                  size={calcWidth(8)}
                  color="#46C5F3"
                />
              </TouchableOpacity>
              <Text style={styles.titleCheckbox}>
                Declaro que li e concordo com os termos de segurança.{" "}
                <Text
                  dataDetectorType="link"
                  onPress={() => openTerms()}
                  style={{
                    fontSize: adjust(14),
                    textDecorationLine: "underline",
                    color: "#46C5F3",
                  }}
                >
                  Ver termos
                </Text>
              </Text>
            </View>
          )}
        </View>
        <View
          style={{
            marginHorizontal: calcWidth(25),
            paddingBottom: calcWidth(6),
          }}
        >
          {[0, 1, 8].includes(status) && (
            <Button
              title={
                status === 1 ? "Aceitar vaga urgente" : "Aceitar esta vaga"
              }
              isSelected={validationButton()}
              unSelectedColor="#A893F229"
              selectedColor={status === 1 ? "#EB4886" : "#865FC0"}
              onPress={() => onPressAccept()}
            />
          )}
          {[2, 3].includes(status) && (
            <ButtonLeave
              width={calcWidth(45)}
              style={styles.buttonVacancies}
              name="Desitir da vaga"
              onPress={() => onPressLeave()}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#18142F",
    flexDirection: "column",
  },
  colorWhite: {
    color: "#FFFFFF",
  },
  textVacancy: {
    color: "#EB4886",
    fontFamily: "HelveticaNowMicro-Regular",
    fontSize: adjust(18),
  },
  buttonVacancies: {
    borderColor: "#FFFFFF",
    borderWidth: 2,
  },
  containerCheckbox: {
    alignItems: "center",
    flexDirection: "row",
    paddingTop: "5%",
    paddingBottom: "1%",
    width: "95%",
  },
  titleCheckbox: {
    fontFamily: "HelveticaNowMicro-Regular",
    fontSize: adjust(13),
    paddingLeft: "4%",
    color: "#FFFFFF",
  },
});

export default Details;
