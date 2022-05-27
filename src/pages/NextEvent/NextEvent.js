import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { SafeAreaView, ImageBackground, StatusBar, View } from "react-native";

import { differenceInHours, isBefore, parseISO, isPast } from "date-fns";

import ImgBackground from "~/assets/images/Grupo_518.png";
import { AlertHelper } from "~/shared/helpers/AlertHelper";
import SpinnerComponent from "~/shared/components/SpinnerComponent";
import ButtonPulse from "~/shared/components/ButtonPulse";
import { calcWidth } from "~/assets/Dimensions";
import RoundButton from "~/shared/components/RoundButton";
import ModalComingSoon from "~/shared/components/ModalComingSoon";

import styles from "./styles";
import TitleEvent from "./TitleEvent";
import OnTheWay from "./OnTheWay/index";
import Checkin from "./CheckinAndCheckout/Checkin";
import CheckinCheckoutQrCode from "./CheckinAndCheckout/CheckinCheckoutQrCode";
import Checkout from "./CheckinAndCheckout/Checkout";
import Occurrence from "./Occurrence/index";
import ModalDuties from "./ModalDuties";
import Pause from "./Pause/index";

import { workdays } from "~/shared/services/freela.http";
import { operationsStatus } from "~/shared/services/operations.http";

const noJobToday = () => {
  return (
    <Fragment>
      <ButtonPulse
        title={`Iniciar${"\n"}Trabalho`}
        titleStyle={styles.textBtnPulse}
        titleColor="#24203B"
        size="normal"
        color="#4F4D65"
      />
    </Fragment>
  );
};

const components = {
  0: () => noJobToday(),
  1: OnTheWay,
  2: OnTheWay,
  3: Checkin,
  4: Checkin,
  5: Checkout,
  6: Checkout,
  8: Occurrence,
};

const NextEvent = (props) => {
  const [spinner, setSpinner] = useState(false);
  const [workday, setWorkday] = useState({});
  const [statusOperation, setStatusOperation] = useState(0);
  const [openModalDuties, setOpenModalDuties] = useState(false);
  const [isLate, setIslate] = useState(false);
  const [openModalComingSoon, setOpenModalComingSoon] = useState(false);
  const [openQrCheckout, setOpenQrCheckout] = useState(false);

  const Buttons = components[statusOperation];

  useEffect(() => {
    getWorkDetails();
  }, []);

  const getWorkDetails = () => {
    setSpinner(true);
    workdays()
      .then(({ data }) => data)
      .then(async ({ result: { value } }) => {
        setWorkday(value ? value : {});
        value && getStatusOperation(value);
      })
      .catch((error) => {
        AlertHelper.show("error", "Erro", error.response.data.errorMessage);
      })
      .finally(() => setSpinner(false));
  };

  const getStatusOperation = ({
    operationId: id,
    freelaId,
    isHomeOffice,
    checkout,
  }) => {
    operationsStatus({ id, freelaId, isHomeOffice })
      .then(({ data }) => data)
      .then(async ({ result: { value } }) => {
        const checkoutParse = parseISO(checkout);
        const dateStatus = isBefore(new Date(), checkoutParse);
        setStatusOperation(value > 4 && value < 7 && dateStatus ? 8 : value);
        if(value === 6) {
          setOpenQrCheckout(true)
        }
      })
      .catch((error) =>
        AlertHelper.show("error", "Erro", error.response.data.errorMessage)
      );
  };

  useEffect(() => {
    const SECOND = 15;
    const MILLISECOND = SECOND * 1000;
    if (workday.hasCheckinQrCode || workday.hasCheckoutQrCode) {
      const interval = setInterval(() => {
        if ([3, 4, 6, 7, 8].includes(statusOperation)) {
          getStatusOperation(workday);
        }
      }, MILLISECOND);
      return () => clearInterval(interval);
    }
  }, [statusOperation, workday]);

  useEffect(() => {
    const interval = setInterval(() => {
      const { checkout } = workday;
      const checkoutParse = parseISO(checkout);
      const dateStatus = isPast(checkoutParse);
      if (statusOperation > 4) {
        setStatusOperation(
          !dateStatus && openQrCheckout === false ? 8 : statusOperation
        );
        setIslate(differenceInHours(new Date(), parseISO(checkout)));
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [statusOperation, workday, openQrCheckout]);

  const Operations = () => {
    return (
      <ImageBackground source={ImgBackground} style={{ flex: 1 }}>
        <SpinnerComponent loading={spinner} />
        <SafeAreaView style={styles.container}>
          <StatusBar backgroundColor="transparent" translucent />
          <TitleEvent {...workday} status={statusOperation} />
          <View style={{ alignItems: "center" }}>
            <View style={styles.borderCircle}>
              <Buttons
                size="normal"
                load={(value) => setSpinner(value)}
                openQrCheckout={(value) => setOpenQrCheckout(value)}
                action={getStatusOperation}
                {...props}
                {...workday}
                {...styles}
                statusOperation={statusOperation}
              />
              {statusOperation > 4 && (
                <Fragment>
                  <View style={styles.buttonCenter}>
                    {statusOperation !== 8 ? (
                      <Occurrence
                        {...props}
                        {...workday}
                        {...styles}
                        size="small"
                        isLate={isLate}
                      />
                    ) : (
                      <Checkout
                        {...props}
                        {...workday}
                        {...styles}
                        load={(value) => setSpinner(value)}
                        openQrCheckout={(value) => setOpenQrCheckout(value)}
                        size="small"
                        statusOperation={statusOperation}
                      />
                    )}
                  </View>
                  <View style={styles.buttonLeft}>
                    <ButtonPulse
                      icon="assistant"
                      title="Deveres"
                      size="small"
                      color="#46C5F3"
                      onPress={() => setOpenModalDuties(true)}
                    />
                  </View>
                  <View style={styles.buttonRight}>
                    <Pause {...props} {...workday} />
                  </View>
                </Fragment>
              )}
            </View>
          </View>
          <View style={styles.containerBtn}>
            {statusOperation === 0 ? (
              <RoundButton
                width={calcWidth(55)}
                name="Encontrar mais vagas"
                style={styles.btn}
                onPress={() => props.navigation.navigate("ToExplore")}
              />
            ) : statusOperation === 1 || statusOperation === 2 ? (
              <RoundButton
                width={calcWidth(55)}
                name="Ver regras e check list"
                style={styles.btn}
                onPress={() => setOpenModalComingSoon(true)}
              />
            ) : (
              <RoundButton
                width={calcWidth(55)}
                name="Minhas Atividades"
                style={styles.btn}
                onPress={() => setOpenModalComingSoon(true)}
              />
            )}
          </View>
          <ModalDuties
            visible={openModalDuties}
            responsabilities={workday.responsabilities}
            onClose={() => setOpenModalDuties(false)}
          />
          <ModalComingSoon
            onClose={() => setOpenModalComingSoon(false)}
            visible={openModalComingSoon}
          />
        </SafeAreaView>
      </ImageBackground>
    );
  };

  const _renderComponent = () => {
    const { isHomeOffice, hasCheckinQrCode } = workday;
    if (
      (statusOperation === 3 || statusOperation === 4) &&
      !isHomeOffice &&
      hasCheckinQrCode
    ) {
      return (
        <CheckinCheckoutQrCode
          {...props}
          {...workday}
          statusOperation={statusOperation}
          action={getStatusOperation}
        />
      );
    }

    if (openQrCheckout) {
      return (
        <CheckinCheckoutQrCode
          {...props}
          {...workday}
          statusOperation={statusOperation}
          action={getStatusOperation}
          openQrCheckout={(value) => setOpenQrCheckout(value)}
        />
      );
    }

    return <Operations />;
  };

  return <Fragment>{_renderComponent()}</Fragment>;
};

export default NextEvent;
