import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';

@Component({
  selector: 'wf-data-table-pagination',
  templateUrl: './data-table-pagination.component.html',
  styleUrls: ['./data-table-pagination.component.scss']
})
export class DataTablePaginationComponent implements OnChanges {

  @Input() itensPorPagina: number = 0;
  @Input() totalRegistros: number = 0;

  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  paginaAtual: number = 1;
  paginaFinal: number = 1;
  totalPaginas: number[] = [];

  constructor() { }

  ngOnChanges(): void {
    const moduloTotalPaginas = (this.totalRegistros % this.itensPorPagina);
    const divisaoTotalPaginas = (this.totalRegistros / this.itensPorPagina);

    this.paginaFinal = (moduloTotalPaginas > 0)
      ? Math.floor(divisaoTotalPaginas + 1)
      : Math.floor(divisaoTotalPaginas);

    this.totalPaginas = [...Array(this.paginaFinal).keys()];
  }

  onPageChange(pagina: number) {
    if (pagina) {
      this.paginaAtual = pagina;
      this.pageChange.emit(this.paginaAtual);
    }
  }

  anterior() {
    if (this.paginaAtual > 0) {
      this.paginaAtual--;
      this.onPageChange(this.paginaAtual);
    }
  }

  proximo() {
    if (this.paginaAtual < this.paginaFinal) {
      this.paginaAtual++;
      this.onPageChange(this.paginaAtual);
    }
  }

}
