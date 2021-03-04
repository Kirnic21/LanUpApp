import { format, parseISO } from "date-fns";
import eoLocale from "date-fns/locale/pt-BR";

const formatDate = (date) => {
  return format(parseISO(date), "dd/MM/yyyy HH:mm", {
    locale: eoLocale
  })
};

export default formatDate;
