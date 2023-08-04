import React, { Fragment, useCallback, useEffect, useState } from "react";

import { AlertHelper } from "~/shared/helpers/AlertHelper";

import { decodeToken } from "~/shared/services/decode";
import { deitailsVacancies } from "~/shared/services/events.http";
import {
  acceptInvite,
  deleteVacancies,
  deitailsVacanciesSchedules,
  acceptInvitations,
  vacanciesEmergencyAccept,
} from "~/shared/services/vacancy.http";

import AsyncStorage from "@react-native-community/async-storage";

import Details from "./Details";
import { validateBankInformation } from "~/shared/services/freela.http";

const VacanciesDeitails = ({
  navigation: {
    state: { params },
    replace,
    navigate,
    push,
  },
}) => {
  const [details, setDetails] = useState({});
  const [shift, setShift] = useState({});
  const [loading, setLoading] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);

  useEffect(() => {
    const { status, job, getDeitails } = params;

    (async () => {
      status === 0
        ? getPublicVacancyDetails(job)
        : status === 1
          ? setDetails(getDeitails)
          : getInvitationVacancyDetails(job);
    })();
  }, []);

  const getPublicVacancyDetails = useCallback(
    ({ id, job: service, jobDate }) => {
      setLoading((prevState) => !prevState);

      deitailsVacancies({ id, service, day: jobDate.substr(0, 10) })
        .then(({ data }) => data)
        .then(({ result }) => setDetails(result))
        .catch((error) =>
          AlertHelper.show("error", "Erro", error.response.data.errorMessage)
        )
        .finally(() => setLoading((prevState) => !prevState));
    },
    []
  );

  const getInvitationVacancyDetails = useCallback(
    ({ id, serviceId, jobDate }) => {
      setLoading((prevState) => !prevState);
      deitailsVacanciesSchedules({ id, serviceId, day: jobDate.substr(0, 10) })
        .then(({ data }) => data)
        .then(({ result }) => setDetails(result))
        .catch((error) =>
          AlertHelper.show("error", "Erro", error.response.data.errorMessage)
        )
        .finally(() => setLoading((prevState) => !prevState));
    },
    []
  );

  const acceptPublicVacancyOrInvitation = useCallback(async () => {
    const { checkin, checkout } = shift;

    const {
      job: { id: eventId, jobDate: day, job: jobToDo, serviceId },
      isInvite,
    } = params;

    const { id: freelaId } = decodeToken(
      await AsyncStorage.getItem("API_TOKEN")
    );

    setLoading((prevState) => !prevState);

    acceptInvite({
      freelaId,
      eventId,
      day,
      checkout,
      checkin,
      jobToDo,
      serviceId,
      isInvite,
    })
      .then(() => {
        isInvite ? replace("Schedule") : navigate("Schedule");
      })
      .catch((error) => {
        AlertHelper.show("error", "Erro", error.response.data.errorMessage);
      })
      .finally(() => setLoading((prevState) => !prevState));
  }, [shift, params, loading]);

  const acceptInvitationVacancy = useCallback(() => {
    const {
      job: { id: vacancyId },
    } = params;

    setLoading((prevState) => !prevState);

    acceptInvitations(vacancyId)
      .then(() => replace("Schedule"))
      .catch((error) =>
        AlertHelper.show("error", "Erro", error.response.data.errorMessage)
      )
      .finally(() => setLoading((prevState) => !prevState));
  }, [params, loading]);

  const acceptEmergencyVacancy = useCallback(() => {
    const {
      job: { eventId, job: jobToDo, start: checkin, end: checkout, day },
    } = params;

    setLoading((prevState) => !prevState);

    vacanciesEmergencyAccept({
      eventId,
      jobToDo,
      checkout,
      checkin,
      day,
    })
      .then(() => navigate("NextEvent"))
      .catch((error) =>
        AlertHelper.show("error", "Erro", error.response.data.errorMessage)
      )
      .finally(() => setLoading((prevState) => !prevState));
  }, [params, loading]);

  const leaveVacancy = useCallback(() => {
    const {
      job: { id },
    } = params;

    setLoading((prevState) => !prevState);

    deleteVacancies({ id })
      .then(() => replace("Schedule"))
      .catch((error) =>
        AlertHelper.show("error", "Erro", error.response.data.errorMessage)
      )
      .finally(() => setLoading((prevState) => !prevState));
  }, [params, loading]);

  const _handleClick = {
    8: () => acceptInvitationVacancy(),
    0: () => acceptPublicVacancyOrInvitation(),
    1: () => acceptEmergencyVacancy(),
  };

  const hasBankDetails = () => {

    if (!details?.requiresFullProfile) {
      return _handleClick[params.status]();
    }

    setLoading((prevState) => !prevState);
    validateBankInformation()
      .then((data) => data)
      .then((res) => {
        if (!res.value) {
          return setShowWarningModal(true);
        }
        _handleClick[params.status]();
      })
      .catch((error) =>
        AlertHelper.show("error", "Erro", error.response.data.errorMessage)
      )
      .finally(() => setLoading((prevState) => !prevState));
  };

  const goAboutMe = () => {
    setShowWarningModal(false)
    replace("AboutMe", { goBackVacancyDetails: params }, "Schedule");
  };

  const _renderComponent = () => {
    return (
      <Details
        openWarningModal={showWarningModal}
        params={params}
        details={details}
        loading={loading}
        onPressAccept={() => hasBankDetails()}
        onPressLeave={() => leaveVacancy()}
        selectShift={(value) => setShift(value)}
        onPressCloseWarningModal={() => setShowWarningModal(false)}
        onPressWarningModal={() => goAboutMe()}
      />
    );
  };

  return <Fragment>{_renderComponent()}</Fragment>;
};

export default VacanciesDeitails;
