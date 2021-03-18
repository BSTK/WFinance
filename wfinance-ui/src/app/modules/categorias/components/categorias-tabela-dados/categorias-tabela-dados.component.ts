import {Component} from '@angular/core';
import {Categoria} from '../../services/categoria.model';
import {DataTableComponent} from '../../../../shared/components';
import {AutenticadorService} from '../../../seguranca/services/autenticador.service';

@Component({
  selector: 'wf-categorias-tabela-dados',
  templateUrl: './categorias-tabela-dados.component.html',
  styleUrls: ['./categorias-tabela-dados.component.scss']
})
export class CategoriasTabelaDadosComponent extends DataTableComponent<Categoria> {
  
  constructor(public readonly autenticadorService: AutenticadorService) {
    super();
  }
}
