import {Pessoa} from "../../services/pessoa.model";
import {Component, EventEmitter, Output} from '@angular/core';
import {DataTableComponent} from "../../../../shared/components";
import {AutenticadorService} from "../../../seguranca/services/autenticador.service";

@Component({
  selector: 'wf-pessoas-tabela-dados',
  templateUrl: './pessoas-tabela-dados.component.html',
  styleUrls: ['./pessoas-tabela-dados.component.scss']
})
export class PessoasTabelaDadosComponent extends DataTableComponent<Pessoa> {

  @Output() readonly eventAtivar: EventEmitter<Pessoa> = new EventEmitter<Pessoa>();

  constructor(public readonly autenticadorService: AutenticadorService) {
    super();
  }

  ativar(pessoa: Pessoa) {
    if (pessoa) {
      this.eventAtivar.emit(pessoa);
    }
  }
}
