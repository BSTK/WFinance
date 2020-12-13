import {Endereco} from "./endereco.model";

export interface Pessoa {
  id: number;
  nome: string;
  ativo: boolean;
  endereco: Endereco
}
