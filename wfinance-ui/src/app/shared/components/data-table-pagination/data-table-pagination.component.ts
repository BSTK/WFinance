import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {isEmpty} from '../../utils/object-utils';

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
  
  constructor(private activatedRoute: ActivatedRoute) {
  }
  
  ngOnChanges(): void {
    const moduloTotalPaginas = (this.totalRegistros % this.itensPorPagina);
    const divisaoTotalPaginas = (this.totalRegistros / this.itensPorPagina);
    
    this.paginaFinal = (moduloTotalPaginas > 0)
      ? Math.floor(divisaoTotalPaginas + 1)
      : Math.floor(divisaoTotalPaginas);
    
    const rangeTotalPaginas = !isNaN(this.paginaFinal)
      ? this.paginaFinal
      : 0;
    
    this.totalPaginas = [...Array(rangeTotalPaginas).keys()];
    
    const pagina = this.activatedRoute.snapshot.queryParamMap.get('pagina') || '';
    this.paginaAtual = isEmpty(pagina) ? 1 : Number(pagina);
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
