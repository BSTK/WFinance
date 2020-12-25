export const isUndefined = (object: any): boolean => {
  return object === undefined || object === null;
};

export const notUndefined = (object: any): boolean => {
  return object !== undefined && object !== null;
};

export const notEmpty = (oString: string): boolean => {
  return notUndefined(oString) && oString !== '';
};

export const isEmpty = (oString: string): boolean => {
  return notUndefined(oString) && oString === '';
};
