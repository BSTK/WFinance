import {notNull} from "../../utils/object-utils";
import {DataSourceTable} from "./data-source.model";
import {EventEmitter, Input, OnChanges, Output} from '@angular/core';

export abstract class DataTableComponent<T = any> implements OnChanges {

  @Input() public page = 0;
  @Input() public itensPorPagina = 0;
  @Input() public totalRegistros = 0;
  @Input() public dataSource: DataSourceTable<T> = new DataSourceTable<T>();

  @Output() readonly eventEditar: EventEmitter<T> = new EventEmitter<T>();
  @Output() readonly eventExcluir: EventEmitter<T> = new EventEmitter<T>();
  @Output() readonly eventPaginacao: EventEmitter<number> = new EventEmitter<number>();

  public dados: T[] = [];

  ngOnChanges() {
    if (notNull(this.dataSource.conteudo)) {
      this.page = this.dataSource.pagina;
      this.dados = this.dataSource.conteudo;
      this.totalRegistros = this.dataSource.totalRegistros;
      this.itensPorPagina = this.dataSource.totalItensPagina;
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
