import {notUndefined} from "./object-utils";

export const notEmpty = (array: any []): boolean => {
  return notUndefined(array) && array.length > 0;
};

export const isEmpty = (array: any []): boolean => {
  return notUndefined(array) && array.length === 0;
};
