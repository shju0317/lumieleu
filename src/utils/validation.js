export function emailReg(text) {
  const RegExr =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return RegExr.test(String(text).toLowerCase());
}

export function pwReg(text) {
  const RegExr = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{8,25}$/;
  return RegExr.test(String(text).toLowerCase());
}

export function userNameReg(text) {
  const RegExr = /^[a-zA-Z0-9].{1,9}$/;
  return RegExr.test(String(text).toLowerCase());
}

export function CheckNumeric(value) {
  return value.replace(/\D/g, '');
}

export function hasNumber(text) {
  if (typeof text !== 'string') {
    return false;
  }

  const regex = /\d/;
  return regex.test(text);
}
