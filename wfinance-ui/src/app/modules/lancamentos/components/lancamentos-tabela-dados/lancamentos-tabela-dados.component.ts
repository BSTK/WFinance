import {Component} from '@angular/core';
import {Lancamento} from "../../domain/lancamento.model";
import {DataTableComponent} from "../../../../shared/components/data-table/data-table.component";

@Component({
  selector: 'wf-lancamentos-tabela-dados',
  templateUrl: './lancamentos-tabela-dados.component.html',
  styleUrls: ['lancamentos-tabela-dados.component.scss']
})
export class LancamentosTabelaDadosComponent extends DataTableComponent<Lancamento> {

  constructor() {
    super();
  }

}
