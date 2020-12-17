import {Pessoa} from "../pessoas/pessoa.model";
import {Categoria} from "../categorias/categoria.model";

export type Lancamento = {
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

export type TipoLancamento = {
  valor: string;
  label: string;
  classCss: string;
}

export const DESPESA: TipoLancamento = { valor: 'DESPESA', label: 'Despesa', classCss: 'text-danger'};
export const RECEITA: TipoLancamento = { valor: 'RECEITA', label: 'Receita', classCss: 'text-success' };
