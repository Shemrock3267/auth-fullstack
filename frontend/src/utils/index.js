import constants from '../constants/defaultLocales';

function $locale(key) {
  // eslint-disable-next-line no-prototype-builtins
  if (constants.hasOwnProperty(key)) {
    return constants[key];
  } else {
    throw new Error(`Key '${key}' not found in constants object.`);
  }
}

export { $locale };