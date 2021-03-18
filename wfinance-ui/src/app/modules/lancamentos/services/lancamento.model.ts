import {notNull} from '../../../shared/utils/object-utils';

export class Lancamento {
  id: number;
  tipo: string;
  valor: number;
  descricao: string;
  observacao: string;
  dataPagamento: string;
  dataVencimento: string;
  pessoa: LancamentoPessoa = new LancamentoPessoa();
  categoria: LancamentoCategoria = new LancamentoCategoria();
}

export class LancamentoPessoa {
  id: string;
  nome: string;
}

export class LancamentoCategoria {
  id: string;
  nome: string;
}

export class TipoLancamento {
  valor: string;
  label: string;
  classCss: string;
}

export const DESPESA: TipoLancamento = {valor: 'DESPESA', label: 'Despesa', classCss: 'text-danger'};
export const RECEITA: TipoLancamento = {valor: 'RECEITA', label: 'Receita', classCss: 'text-success'};
