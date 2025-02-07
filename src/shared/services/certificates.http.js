import { HTTP } from "./http.base";

const addCertificate = (data) => HTTP.post(`/freelaCertificates`, data);

const getCertificate = (data) =>
  HTTP.get(
    `/freelaCertificates?page=${data.page}&pageSize=${data.pageSize}`,
    data
  );

const updateCertificate = (data) =>
  HTTP.put(`/freelaCertificates/${data.id}`, data);

const deleteCertificate = (id) => HTTP.delete(`/freelaCertificates/${id}`);

export { addCertificate, getCertificate, updateCertificate, deleteCertificate };
