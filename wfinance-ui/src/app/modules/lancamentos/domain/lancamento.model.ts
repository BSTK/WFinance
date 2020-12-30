export class Lancamento {
  id: number;
  tipo: string;
  valor: number;
  descricao: string;
  observacao: string;
  dataPagamento: string;
  dataVencimento: string;
  pessoa: LancamentoPessoa;
  categoria: LancamentoCategoria
}

export type LancamentoPessoa = {
  id: string;
  nome: string;
}

export type LancamentoCategoria = {
  id: string;
  nome: string;
}

export type TipoLancamento = {
  valor: string;
  label: string;
  classCss: string;
}

export const DESPESA: TipoLancamento = { valor: 'DESPESA', label: 'Despesa', classCss: 'text-danger'};
export const RECEITA: TipoLancamento = { valor: 'RECEITA', label: 'Receita', classCss: 'text-success' };

export const tipoLancamento = (tipo: string) => {
  return tipo === DESPESA.valor
      ? DESPESA
      : RECEITA;
};
