import { format, parseISO } from "date-fns";
import eoLocale from "date-fns/locale/pt-BR";

const formatDate = (date) => {
  const _date = new Date().toISOString();
  return format(parseISO(date || _date), "dd/MM/yyyy HH:mm", {
    locale: eoLocale,
  });
};

export default formatDate;
