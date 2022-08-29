import {
  validateCPF,
  validateCNPJ,
} from "~/shared/helpers/validate/ValidateCpfCnpj";
import { validatePixKey } from "~/shared/helpers/validate/validate";

const bankNumberIsValid = (bankNumber) => {
  return /^([0-9A-Za-x]{3,5})$/.test(bankNumber);
};

const agencyNumberIsValid = (agencyNumber) => {
  return /^[0-9]{1,5}$/.test(agencyNumber) && parseInt(agencyNumber) > 0;
};

const accountNumberIsValid = (accountNumber) => {
  return /^[0-9]{1,12}$/.test(accountNumber) && parseInt(accountNumber) > 0;
};

export const validate = (values) => {
  const errors = {};
  values = values;

  !values?.address?.latitude && (errors.address = "Campo obrigatório.");
  !values?.fullName && (errors.fullName = "Campo obrigatório.");
  !values?.birthday && (errors.birthday = "Campo obrigatório.");
  !values.owner && (errors.owner = "Campo obrigatório.");
  !values.bankAccountType && (errors.bankAccountType = "Campo obrigatório.");
  !values.bankCode?.id && (errors.bankCode = "Campo obrigatório.");
  !values.bankBranch && (errors.bankBranch = "Campo obrigatório.");
  !values.bankAccount && (errors.bankAccount = "Campo obrigatório.");
  !values.cpfCnpj && (errors.cpfCnpj = "Campo obrigatório.");
  !values.pixType && (errors.pixType = "Campo obrigatório.");
  !values.pixKey && (errors.pixKey = "Campo obrigatório.");

  values.pixKey &&
    !validatePixKey(values.pixKey, (type = values.pixType || "default")) &&
    (errors.pixKey = "Chave inválida");
  values.bankCode?.id &&
    !bankNumberIsValid(values.bankCode?.id) &&
    (errors.bankCode = "banco inválido.");
  values.bankBranch &&
    !agencyNumberIsValid(values.bankBranch) &&
    (errors.bankBranch = "agência inválida.");
  values.bankAccount &&
    !accountNumberIsValid(values.bankAccount) &&
    (errors.bankAccount = "conta inválida.");
  values.cpfCnpj &&
    !(validateCPF(values.cpfCnpj) || validateCNPJ(values.cpfCnpj)) &&
    (errors.cpfCnpj = "CPF ou CNPJ inválido");

  return errors;
};
