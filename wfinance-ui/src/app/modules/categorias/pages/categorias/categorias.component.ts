import {ToastrService} from "ngx-toastr";
import {Component, OnInit} from '@angular/core';
import {Categoria} from "../../domain/categoria.model";
import {ActivatedRoute, Router} from "@angular/router";
import {isEmpty} from "../../../../shared/utils/object-utils";
import {CategoriasService} from "../../domain/categorias.service";
import {confirmDialogConfigExclusao} from "../../domain/categoria.helper";
import {NavigateQuery, navigationExtrasPagina} from "../../../../shared/router";
import {DialogService} from "../../../../shared/components/dialog/dialog.service";
import {DataSourceTable, DataTablePaginacaoDefault, ResponseToDataSource} from "../../../../shared/components";

@Component({
  selector: 'wf-categorias',
  templateUrl: './categorias.component.html'
})
export class CategoriasComponent implements OnInit {

  dataSource: DataSourceTable<Categoria> = new DataSourceTable<Categoria>();

  constructor(private readonly router: Router,
              private readonly toast: ToastrService,
              private readonly dialogService: DialogService,
              private readonly activatedRoute: ActivatedRoute,
              private readonly categoriasService: CategoriasService) { }

  ngOnInit(): void {
    const pagina = this.activatedRoute.snapshot.queryParamMap.get('pagina') || '';
    const paginaAtual = isEmpty(pagina) ? 1 : Number(pagina);
    this.paginacao(paginaAtual);
  }

  paginacao(pagina: number) {
    this.router.navigate([], navigationExtrasPagina(pagina));
    const queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') || '';

    if (NavigateQuery.NAVIGATE_QUERY_TODOS === queryParam || isEmpty(queryParam)) {
      this.carregarTodasCategorias(pagina);
    }

    if (NavigateQuery.NAVIGATE_QUERY_PESQUISA === queryParam) {
      this.carregarPesquisaCategorias(pagina);
    }
  }

  excluir(categoria: Categoria) {
    if (categoria) {
      const dialogConfig = confirmDialogConfigExclusao(categoria);
      this.dialogService.confirm(dialogConfig).subscribe(resultado => {
        if (resultado) {
          this.categoriasService.excluir(categoria).subscribe(_ => {
            const index = this.dataSource.conteudo.indexOf(categoria, 1);
            if (index >= 0) {
              this.dataSource.conteudo.splice(index, 1);
              this.toast.success(
                'Categoria excluída com sucesso!',
                'Exclusão de cateoria'
              );
            }
          });
        }
      });
    }
  }

  /// TODO: IMPLEMENTAR MÉTODO DE ATUALIZAR
  editar(categoria: Categoria) {
    if (categoria) {
      this.router.navigate(['/categorias/cadastro/' + categoria.id]);
    }
  }

  private carregarTodasCategorias(pagina: number) {
    this.categoriasService
      .categorias(DataTablePaginacaoDefault.pagina(pagina))
      .subscribe((response: any) => {
        if (response && response.content) {
          this.dataSource = ResponseToDataSource<Categoria>(response);
        }
      });
  }

  /// TODO: IMPLEMENTAR PESQUISA DE CATEGORIAS
  private carregarPesquisaCategorias(pagina: number) {
    this.categoriasService
      .categorias(DataTablePaginacaoDefault.pagina(pagina))
      .subscribe((response: any) => {
        if (response && response.content) {
          this.dataSource = ResponseToDataSource<Categoria>(response);
        }
      });
  }

}
