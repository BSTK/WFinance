export enum ConfirmDialogConfigTipo {
  INLUSAO,
  EXCLUSAO,
}

export type ConfirmDialogConfig = {
  titulo: string;
  texto: string;
  tipo: ConfirmDialogConfigTipo;
}
