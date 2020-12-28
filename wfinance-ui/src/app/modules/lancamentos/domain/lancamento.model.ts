import {Pessoa} from "../../pessoas/domain/pessoa.model";
import {Categoria} from "../../categorias/domain/categoria.model";

export class Lancamento {
  id: number;
  tipo: string;
  valor: number;
  descricao: string;
  observacao: string;
  dataPagamento: string;
  dataVencimento: string;
  pessoa: Pessoa = new Pessoa();
  categoria: Categoria = new Categoria()
}

export type TipoLancamento = {
  valor: string;
  label: string;
  classCss: string;
}

export const DESPESA: TipoLancamento = { valor: 'DESPESA', label: 'Despesa', classCss: 'text-danger'};
export const RECEITA: TipoLancamento = { valor: 'RECEITA', label: 'Receita', classCss: 'text-success' };
