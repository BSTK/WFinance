import {Component} from '@angular/core';
import {DataTableComponent} from "../../../../shared";
import {Lancamento} from "../../domain/lancamento.model";
import {AutenticadorService} from "../../../seguranca/domain/autenticador.service";

@Component({
  selector: 'wf-lancamentos-tabela-dados',
  templateUrl: './lancamentos-tabela-dados.component.html',
  styleUrls: ['lancamentos-tabela-dados.component.scss']
})
export class LancamentosTabelaDadosComponent extends DataTableComponent<Lancamento> {

  constructor(public readonly autenticadorService: AutenticadorService) {
    super();
  }

}
