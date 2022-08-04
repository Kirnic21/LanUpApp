import { validateCNPJ, validateCPF } from "./ValidateCpfCnpj";

const removeMask = (value) => value?.replace(/\D/g, "");

const validateEmail = (value) => {
  const expression =
    /^(([^<>()\\[\]\\.,;:\s@\\"]+(\.[^<>()\\[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\]\\.,;:\s@\\"]+\.)+[^<>()[\]\\.,;:\s@\\"]{2,})$/i;
  return expression.test(value);
};

const validatePhoneNumber = (value) => {
  value = removeMask(value);
  const rex = /(\d{2})(\d{5})(\d{4})/;
  return rex.test(value);
};

const validateRandomKey = (value) => {
  const regexExp =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

  return regexExp.test(value);
};

const validateDefault = () => false;

const validatePixKey = (key, type) => {
  return {
    CPF: validateCPF,
    CNPJ: validateCNPJ,
    EMAIL: validateEmail,
    TELEFONE: validatePhoneNumber,
    CHAVE_ALEATORIA: validateRandomKey,
    default: validateDefault,
  }[type](key);
};

export {
  validateEmail,
  validatePhoneNumber,
  validateRandomKey,
  validatePixKey,
};
