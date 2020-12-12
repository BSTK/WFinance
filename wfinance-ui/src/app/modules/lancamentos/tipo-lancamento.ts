export class TipoLancamento {

  static readonly RECEITA = new TipoLancamento('RECEITA', 'Receita', 'text-success');
  static readonly DESPESA = new TipoLancamento('DESPESA', 'Despesa', 'text-danger');

  constructor(public valor: string,
              public label: string,
              public classCss: string) { }
}

