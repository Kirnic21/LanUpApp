const maskCpfCnpj = (value) => {
  value = value.replace(/(\.|\/|\-)/g, "");
  value = value.length > 11 ? maskCnpj(value) : maskCpf(value);

  return value;
};

const maskCpf = (value) => {
  value = value
    .replace(/(\.|\/|\-)/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
  return value;
};

const maskCnpj = (value) => {
  value = value
    .replace(/(\.|\/|\-)/g, "")
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");

  return value;
};

const maskPhone = (value) => {
  value = value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{4})\d+?$/, "$1");

  return value;
};

const maskWeight = (value) => {
  value = value.replace(/\D/g, "");
  value =
    value.length > 3
      ? value
          .replace(/(\d{3})(\d{1,2})/, "$1,$2")
          .replace(/(,\d{1})\d+?$/, "$1")
      : value
          .replace(/(\d{2})(\d{1,2})/, "$1,$2")
          .replace(/(,\d{1})\d+?$/, "$1");

  return value;
};

const maskTall = (value) => {
  value = value
    .replace(/\D/g, "")
    .replace(/(\d{1})(\d{1,2})/, "$1,$2")
    .replace(/(,\d{2})\d+?$/, "$1");

  return value;
};

const maskTime = (value) => {
  if (value.length > 5) return value.substring(0, 5)
  if (value.length === 3 && value.indexOf(':') === -1) value = `${value[0]}${value[1]}:${value[2]}`
  return value;
}

const selectMask = (mask, value) => {
  return {
    cpf: maskCpf(value),
    cnpj: maskCnpj(value),
    cpfCnpj: maskCpfCnpj(value),
    phone: maskPhone(value),
    weight: maskWeight(value),
    tall: maskTall(value),
    time: maskTime(value)
  }[mask];
};

export default selectMask;
