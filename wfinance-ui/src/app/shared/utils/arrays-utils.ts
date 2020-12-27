import {notNull} from "./object-utils";

export const notEmpty = (array: any []): boolean => {
  return notNull(array) && array.length > 0;
};

export const isEmpty = (array: any []): boolean => {
  return notNull(array) && array.length === 0;
};
