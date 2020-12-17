export const isUndefined = (object: any): boolean => {
  return object === undefined;
};

export const notUndefined = (object: any): boolean => {
  return object !== undefined;
};

export const notEmpty = (oString: string): boolean => {
  return notUndefined(oString) && oString !== '';
};

export const isEmpty = (oString: string): boolean => {
  return notUndefined(oString) && oString === '';
};
