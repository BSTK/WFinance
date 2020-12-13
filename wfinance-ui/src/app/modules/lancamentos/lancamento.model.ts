import {Pessoa} from "../pessoas/pessoa.model";
import {Categoria} from "../categorias/categoria.model";

export interface Lancamento {
  id: number;
  tipo: string;
  valor: number;
  descricao: string;
  observacao: string;
  dataPagamento: string;
  dataVencimento: string;
  pessoa: Pessoa;
  categoria: Categoria
}
