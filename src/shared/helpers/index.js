import moment from "moment";
import momentPTBR from "moment/src/locale/pt-br";
const initMomentPtBr = () => {
  function prepareLocale(locale) {
    for (const key in locale) {
      if (locale.hasOwnProperty(key)) {
        // remove first character underscore fom key, i.e. '_calendar' => 'calendar'
        locale[key.substring(1)] = locale[key];
      }
    }
    return locale;
  }

  moment.defineLocale("pt-br", prepareLocale(momentPTBR));
};

export {
    initMomentPtBr
};
