export const isNull = (object: any): boolean => {
  return object === undefined || object === null;
};

export const notNull = (object: any): boolean => {
  return object !== undefined && object !== null;
};

export const notEmpty = (oString: string): boolean => {
  return notNull(oString) && oString !== '';
};

export const isEmpty = (oString: string): boolean => {
  return notNull(oString) && oString === '';
};
