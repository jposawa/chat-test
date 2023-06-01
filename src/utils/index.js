export const cloneObject = (obj) => {
  return JSON.parse(JSON.stringify(obj));
}

export const isObjEqual = (obj1, obj2) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

export const saveSessionStorage = (key, value, shouldParse) => {
  const finalValue = shouldParse ? JSON.stringify(value) : value;

  sessionStorage.setItem(key, finalValue);
}

export const loadSessionStorage = (key, shouldParse) => {
  const rawValue = sessionStorage.getItem(key);

  return shouldParse ? JSON.parse(rawValue) : rawValue;
}