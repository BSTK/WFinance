import {Component, OnInit} from '@angular/core';
import {Lancamento} from "../../lancamento.model";
import {LancamentosFiltro} from "../../componentes/lancamentos-pesquisa/lancamentos-filtro.model";

@Component({
  selector: 'app-lancamentos',
  templateUrl: './lancamentos.component.html'
})
export class LancamentosComponent implements OnInit {

  lancamentos: Lancamento[] = [];

  constructor() { }

  ngOnInit() {
    this.lancamentos = this.dadosServico();
  }

  buscarLancamentos(filtro: LancamentosFiltro) {
    if (filtro) {
      console.log('Buscando dados para filtro: ', filtro);
      this.lancamentos = this.dadosServico().filter((lancamento: Lancamento) => {
        return lancamento.descricao === filtro.descricao;
      });

      console.log('Filtrados: ', this.lancamentos);
    }
  }

  private dadosServico(): Lancamento[] {
    return [
      { tipo: 'DESPESA', descricao: 'Compra de pão', dataVencimento: '30/06/2017',
        dataPagamento: null, valor: 4.55, pessoa: 'Padaria do José' },
      { tipo: 'RECEITA', descricao: 'Venda de software', dataVencimento: '10/06/2017',
        dataPagamento: '09/06/2017', valor: 80000, pessoa: 'Atacado Brasil' },
      { tipo: 'DESPESA', descricao: 'Impostos', dataVencimento: '20/07/2017',
        dataPagamento: null, valor: 14312, pessoa: 'Ministério da Fazenda' },
      { tipo: 'DESPESA', descricao: 'Mensalidade de escola', dataVencimento: '05/06/2017',
        dataPagamento: '30/05/2017', valor: 800, pessoa: 'Escola Abelha Rainha' },
      { tipo: 'RECEITA', descricao: 'Venda de carro', dataVencimento: '18/08/2017',
        dataPagamento: null, valor: 55000, pessoa: 'Sebastião Souza' },
      { tipo: 'DESPESA', descricao: 'Aluguel', dataVencimento: '10/07/2017',
        dataPagamento: '09/07/2017', valor: 1750, pessoa: 'Casa Nova Imóveis' },
      { tipo: 'DESPESA', descricao: 'Mensalidade musculação', dataVencimento: '13/07/2017',
        dataPagamento: null, valor: 180, pessoa: 'Academia Top' },
      { tipo: 'DESPESA', descricao: 'Mensalidade musculação', dataVencimento: '13/07/2017',
        dataPagamento: null, valor: 180, pessoa: 'Academia Top' },
      { tipo: 'DESPESA', descricao: 'Mensalidade musculação', dataVencimento: '13/07/2017',
        dataPagamento: null, valor: 180, pessoa: 'Academia Top' },
      { tipo: 'RECEITA', descricao: 'Mensalidade musculação', dataVencimento: '13/07/2017',
        dataPagamento: null, valor: 180, pessoa: 'Academia Top' },
      { tipo: 'DESPESA', descricao: 'Mensalidade musculação', dataVencimento: '13/07/2017',
        dataPagamento: null, valor: 180, pessoa: 'Academia Top' },
      { tipo: 'RECEITA', descricao: 'Mensalidade musculação', dataVencimento: '13/07/2017',
        dataPagamento: null, valor: 180, pessoa: 'Academia Top' },
      { tipo: 'RECEITA', descricao: 'Mensalidade musculação', dataVencimento: '13/07/2017',
        dataPagamento: null, valor: 180, pessoa: 'Academia Top' }
    ];
  }

}