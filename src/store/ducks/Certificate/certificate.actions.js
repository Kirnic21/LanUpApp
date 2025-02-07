import { LOAD_CERTIFICATE } from "../action.types";
import { getCertificate } from "~/shared/services/certificates.http";
import { AlertHelper } from "~/shared/helpers/AlertHelper";



const getDataCertificate = (certificate) => {
  return {
    type: LOAD_CERTIFICATE,
    certificate,
  };
};

export const setCertificate = () => {
  return (dispatch) => {
    getCertificate({ page: 1, pageSize: 20 })
      .then(({ data }) => data)
      .then(({ result }) => {
        dispatch(getDataCertificate(result.content));
      })
      .catch((error) => {
        AlertHelper.show("error", "Erro", error.response.data.errorMessage);
      });
  };
};
