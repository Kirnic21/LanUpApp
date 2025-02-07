import React, { useEffect, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AlertHelper } from "~/shared/helpers/AlertHelper";
import { decodeToken } from "~/shared/services/decode";
import {
  deitailsVacancies,
  deitailsVacanciesSchedules,
  acceptInvite,
  acceptInvitations,
  vacanciesEmergencyAccept,
  deleteVacancies,
} from "~/shared/services/vacancy.http";
import { validateBankInformation } from "~/shared/services/freela.http";

import Details from "./Details";

const VacanciesDetails = ({ route, navigation }) => {
  const { params } = route;
  const { replace, navigate } = navigation;

  const [details, setDetails] = useState({});
  const [shift, setShift] = useState({});
  const [loading, setLoading] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);

  useEffect(() => {
    const { status, job, getDeitails } = params;

    if (status === 0) getPublicVacancyDetails(job);
    else if (status === 1) setDetails(getDeitails);
    else getInvitationVacancyDetails(job);
  }, [params]);

  const toggleLoading = () => setLoading((prev) => !prev);

  const fetchDetails = async (fetchFunction, args) => {
    toggleLoading();
    try {
      const { data } = await fetchFunction(args);
      setDetails(data.result);
    } catch (error) {
      AlertHelper.show("error", "Erro", error.response?.data?.errorMessage || "Erro desconhecido");
    } finally {
      toggleLoading();
    }
  };

  const getPublicVacancyDetails = useCallback((job) => {
    fetchDetails(deitailsVacancies, { id: job.id, service: job.job, day: job.jobDate.substr(0, 10) });
  }, []);

  const getInvitationVacancyDetails = useCallback((job) => {
    fetchDetails(deitailsVacanciesSchedules, { id: job.id, serviceId: job.serviceId, day: job.jobDate.substr(0, 10) });
  }, []);

  const acceptPublicVacancyOrInvitation = useCallback(async () => {
    try {
      toggleLoading();
      const freelaId = decodeToken(await AsyncStorage.getItem("API_TOKEN")).id;
      await acceptInvite({ ...params.job, ...shift, freelaId, isInvite: params.isInvite });
      params.isInvite ? replace("Schedule") : navigate("Schedule");
    } catch (error) {
      AlertHelper.show("error", "Erro", error.response?.data?.errorMessage || "Erro desconhecido");
    } finally {
      toggleLoading();
    }
  }, [shift, params]);

  const acceptInvitationVacancy = useCallback(async () => {
    try {
      toggleLoading();
      await acceptInvitations(params.job.id);
      replace("Schedule");
    } catch (error) {
      AlertHelper.show("error", "Erro", error.response?.data?.errorMessage || "Erro desconhecido");
    } finally {
      toggleLoading();
    }
  }, [params]);

  const acceptEmergencyVacancy = useCallback(async () => {
    try {
      toggleLoading();
      await vacanciesEmergencyAccept(params.job);
      navigate("NextEvent");
    } catch (error) {
      AlertHelper.show("error", "Erro", error.response?.data?.errorMessage || "Erro desconhecido");
    } finally {
      toggleLoading();
    }
  }, [params]);

  const leaveVacancy = useCallback(async () => {
    try {
      toggleLoading();
      await deleteVacancies({ id: params.job.id });
      replace("Schedule");
    } catch (error) {
      AlertHelper.show("error", "Erro", error.response?.data?.errorMessage || "Erro desconhecido");
    } finally {
      toggleLoading();
    }
  }, [params]);

  const actionHandlers = {
    8: acceptInvitationVacancy,
    0: acceptPublicVacancyOrInvitation,
    1: acceptEmergencyVacancy,
  };

  const handleAcceptance = async () => {
    if (!details?.requiresFullProfile) return actionHandlers[params.status]?.();

    toggleLoading();
    try {
      const res = await validateBankInformation();
      if (!res.value) return setShowWarningModal(true);
      actionHandlers[params.status]?.();
    } catch (error) {
      AlertHelper.show("error", "Erro", error.response?.data?.errorMessage || "Erro desconhecido");
    } finally {
      toggleLoading();
    }
  };

  return (
    <Details
      openWarningModal={showWarningModal}
      params={params}
      details={details}
      loading={loading}
      onPressAccept={handleAcceptance}
      onPressLeave={leaveVacancy}
      selectShift={setShift}
      onPressCloseWarningModal={() => setShowWarningModal(false)}
      onPressWarningModal={() => {
        setShowWarningModal(false);
        replace("AboutMe", { goBackVacancyDetails: params }, "Schedule");
      }}
    />
  );
};

export default VacanciesDetails;
