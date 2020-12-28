import {Component, OnInit} from '@angular/core';
import {Categoria} from "../../domain/categoria.model";
import {CategoriasService} from "../../domain/categorias.service";
import {DataSourceTable, DataTablePaginacaoDefault, ResponseToDataSource} from "../../../../shared/components";

@Component({
  selector: 'wf-categorias',
  templateUrl: './categorias.component.html'
})
export class CategoriasComponent implements OnInit {

  dataSource: DataSourceTable<Categoria> = new DataSourceTable<Categoria>();

  constructor(private readonly categoriasService: CategoriasService) { }

  ngOnInit(): void {
    this.categoriasService.categorias(DataTablePaginacaoDefault.pagina())
      .subscribe((response: any) => {
        if (response && response.content) {
          this.dataSource = ResponseToDataSource<Categoria>(response);
        }
      });
  }

}
