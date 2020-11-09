import moment from "moment";
import { validateCPF } from "~/shared/helpers/validate/ValidateCpfCnpj";
class FormRules {
  static required(rule, key, labeled, value, params, errors) {
    if (!value || value === "" || value === {}) {
      errors[key] =
        labeled && labeled[key]
          ? labeled[key]
          : `${key.toUpperCase()}_REQUIRED`;
    }
    return errors;
  }
  static min(rule, key, labeled, value, params, errors) {
    if (params.length > 0) {
      const minLength = params[0];
      if (!value || value.length < minLength) {
        errors[key] =
          labeled && labeled[key]
            ? labeled[key]
            : `${key.toUpperCase()}_MIN_LENGTH`;
      }
    }
    return errors;
  }

  static max(rule, key, labeled, value = "", params, errors) {
    if (params.length > 0) {
      const maxLength = params[0];
      if (value) {
        if (value.length > maxLength) {
          errors[key] =
            labeled && labeled[key]
              ? labeled[key]
              : `${key.toUpperCase()}_MAX_LENGTH`;
        }
      }
    }
    return errors;
  }

  static email(rule, key, labeled, value, params, errors) {
    const expression = /^(([^<>()\\[\]\\.,;:\s@\\"]+(\.[^<>()\\[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\]\\.,;:\s@\\"]+\.)+[^<>()[\]\\.,;:\s@\\"]{2,})$/i;
    const isInvalid = expression.test(value) === false;
    if (isInvalid) {
      errors[key] =
        labeled && labeled[key]
          ? labeled[key]
          : `${key.toUpperCase()}_INVALID_EMAIL`;
    }
    return errors;
  }

  static date(rule, key, labeled, value, params, errors) {
    const isInValid = moment(value).isValid() === false;

    if (isInValid) {
      errors[key] =
        labeled && labeled[key]
          ? labeled[key]
          : `${key.toUpperCase()}_INVALID_DATE`;
    }

    return errors;
  }

  static number(rule, key, labeled, value, params, errors) {
    if (value && isNaN(value)) {
      errors[key] =
        labeled && labeled[key]
          ? labeled[key]
          : `${key.toUpperCase()}_INVALID_NUMBER`;
    }
    return errors;
  }

  static unsigned(rule, key, labeled, value, params, errors) {
    if (value && value < 0) {
      errors[key] =
        labeled && labeled[key]
          ? labeled[key]
          : `${key.toUpperCase()}_INVALID_POSITIVE_NUMBER`;
    }
    return errors;
  }

  static cnpj(rule, key, labeled, value, params, errors) {
    const regex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;
    if (regex.test(value) === false) {
      errors[key] =
        labeled && labeled[key]
          ? labeled[key]
          : `${key.toUpperCase()}_INVALID_CNPJ_NUMBER`;
    }
  }

  static cpf(rule, key, labeled, value, params, errors) {
    const CPF =  value.replace(/[\(\)\.\s-]+/g, "");
    if (validateCPF(CPF) === false) {
      errors[key] =
        labeled && labeled[key]
          ? labeled[key]
          : `${key.toUpperCase()}_INVALID_CPF_NUMBER`;
    }
  }
}

export default FormRules;
