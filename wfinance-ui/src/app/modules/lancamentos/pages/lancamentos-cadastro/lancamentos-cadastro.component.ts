import {NgForm} from "@angular/forms";
import {Component, OnInit} from '@angular/core';
import {DESPESA, RECEITA, TipoLancamento} from "../../domain/lancamento.model";

@Component({
  selector: 'wf-lancamentos-cadastro',
  templateUrl: './lancamentos-cadastro.component.html',
  styleUrls: ['./lancamentos-cadastro.component.scss']
})
export class LancamentosCadastroComponent implements OnInit {

  tipoLancamentoReceita: TipoLancamento = RECEITA;
  tipoLancamentoDespesa: TipoLancamento = DESPESA;

  tipoLancamentoSelecionado: TipoLancamento = RECEITA;

  constructor() { }

  ngOnInit(): void {
  }

  salvar(ngForm: NgForm) {
    console.log('Formulario valido: ', ngForm.valid);
  }
}
