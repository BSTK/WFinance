import {notEmpty} from "../../utils/arrays-utils";
import {EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {DataSourceTable} from "../../utils/tables/data-source-table.model";

export abstract class DataTableComponent<T = any> implements OnChanges {

  @Input() public page = 0;
  @Input() public pageSize = 0;
  @Input() public collectionSize = 0;
  @Input() public dataSource: DataSourceTable<T> = new DataSourceTable<T>();

  @Output() readonly eventEditar: EventEmitter<any> = new EventEmitter<any>();
  @Output() readonly eventExcluir: EventEmitter<any> = new EventEmitter<any>();
  @Output() readonly eventPaginacao: EventEmitter<any> = new EventEmitter<any>();

  public dados: T[] = [];

  protected constructor() { }

  ngOnChanges() {
    if (notEmpty(this.dataSource.conteudo)) {
      this.page = this.dataSource.pagina;
      this.pageSize = this.dataSource.totalItensPagina;
      this.collectionSize = this.dataSource.totalRegistros;
      this.dados = this.dataSource.conteudo;
    }
  }

  excluir(valor: T) {
    if (valor) {
      this.eventExcluir.emit(valor);
    }
  }

  editar(valor: T) {
    if (valor) {
      this.eventEditar.emit(valor);
    }
  }

  paginacao(pagina: number) {
    if (pagina) {
      this.eventPaginacao.emit(pagina);
    }
  }

}
