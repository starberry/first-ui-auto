import Cookies from 'universal-cookie';

const cookies = new Cookies();
const utmList = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']

export const getAllCookie = () => {
  return cookies.getAll();
}

export const getQueryVariable = (variable) => {
  const search = typeof window !== 'undefined' ? window.location.search : '';
  var query = search.substring(1), vars = query.split('&'), pair, i = 0;
  for (i = 0; i < vars.length; i++) {
    pair = vars[i].split('=');
    if (decodeURIComponent(pair[0]) === variable) {
      return decodeURIComponent(pair[1]);
    }
  }
  if (cookies.get(variable) == undefined) {
    if (variable == "utm_source") {
      return 'Direct';
    }
    return 'notSet';
  }
  return null;
}


export const setUtmCookie = () => {
  var param = [], c = 0;
  for (c = 0; c < utmList.length; c++) {
    param[c] = getQueryVariable(utmList[c]);
    if (typeof param[c] === 'string') {
      document.cookie = utmList[c] + "=" + param[c] + "; path=/";
      cookies.set(utmList[c], param[c]);
    }
  }
}
