export const formataComZero = (valor: number) => {
  return valor < 10 ? '0' + valor : valor;
};
