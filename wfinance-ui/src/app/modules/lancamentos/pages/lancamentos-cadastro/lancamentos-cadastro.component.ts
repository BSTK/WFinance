import {Component, OnInit} from '@angular/core';
import {NgbCalendar, NgbDateAdapter} from "@ng-bootstrap/ng-bootstrap";
import {TipoLancamento} from "../../tipo-lancamento";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'wf-lancamentos-cadastro',
  templateUrl: './lancamentos-cadastro.component.html',
  styleUrls: ['./lancamentos-cadastro.component.scss']
})
export class LancamentosCadastroComponent implements OnInit {

  tipoLancamentoReceita = TipoLancamento.RECEITA;
  tipoLancamentoDespesa = TipoLancamento.DESPESA;

  tipoLancamentoSelecionado = TipoLancamento.RECEITA;

  constructor(private ngbCalendar: NgbCalendar,
              private dateAdapter: NgbDateAdapter<string>) { }

  ngOnInit(): void {
  }

  salvar(ngForm: NgForm) {
    console.log('Formulario valido: ', ngForm.valid);
  }
}
