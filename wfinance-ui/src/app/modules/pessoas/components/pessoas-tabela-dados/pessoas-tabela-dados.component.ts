import {Component} from '@angular/core';
import {Pessoa} from "../../domain/pessoa.model";
import {DataTableComponent} from "../../../../shared/components";

@Component({
  selector: 'wf-pessoas-tabela-dados',
  templateUrl: './pessoas-tabela-dados.component.html',
  styleUrls: ['./pessoas-tabela-dados.component.scss']
})
export class PessoasTabelaDadosComponent extends DataTableComponent<Pessoa> {

  constructor() {
    super();
  }
}
