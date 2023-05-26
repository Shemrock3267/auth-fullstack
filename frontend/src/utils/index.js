import constants from '../constants/defaultLocales';

function $locale(key) {
  if (constants.hasOwnProperty(key)) {
    return constants[key];
  } else {
    throw new Error(`Key '${key}' not found in constants object.`);
  }
}

export { $locale };