import {Component, OnInit} from '@angular/core';
import {Categoria} from "../../domain/categoria.model";
import {ActivatedRoute, Router} from "@angular/router";
import {isEmpty} from "../../../../shared/utils/object-utils";
import {CategoriasService} from "../../domain/categorias.service";
import {NavigateQuery, navigationExtrasPagina} from "../../../../shared/router";
import {DialogService} from "../../../../shared/components/dialog/dialog.service";
import {CategoriasFiltro} from "../../components/categorias-pesquisa/categorias-filtro.model";
import {DataSourceTable, DataTablePaginacaoDefault, ResponseToDataSource} from "../../../../shared/components";
import {
  categoriaFiltroQueryParam,
  confirmDialogConfigExclusao,
  filtroValido,
  ROTA_CATEGORIA_CADASTRO
} from "../../domain/categoria.helper";

@Component({
  selector: 'wf-categorias',
  templateUrl: './categorias.component.html'
})
export class CategoriasComponent implements OnInit {

  dataSource: DataSourceTable<Categoria> = new DataSourceTable<Categoria>();

  constructor(private readonly router: Router,
              private readonly dialogService: DialogService,
              private readonly activatedRoute: ActivatedRoute,
              private readonly categoriasService: CategoriasService) { }

  ngOnInit(): void {
    const pagina = this.activatedRoute.snapshot.queryParamMap.get('pagina') || '';
    const paginaAtual = isEmpty(pagina) ? 1 : Number(pagina);
    this.paginacao(paginaAtual);
  }

  pesquisar(filtro: CategoriasFiltro) {
    const observable = filtroValido(filtro)
      ? this.categoriasService.resumo(filtro, DataTablePaginacaoDefault.pagina())
      : this.categoriasService.categorias(DataTablePaginacaoDefault.pagina());

    observable.subscribe((response: any) => {
      if (response && response.content) {
        this.dataSource = ResponseToDataSource<Categoria>(response);
      }
    });
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
            const index = this.dataSource.conteudo.indexOf(categoria);
            if (index >= 0) {
              this.dataSource.conteudo.splice(index, 1);
              this.dialogService.sucesso(
                'Exclusão de categoria',
                'Categoria excluída com sucesso!'
              );
            }
          });
        }
      });
    }
  }

  editar(categoria: Categoria) {
    if (categoria) {
      this.router.navigate([
        ROTA_CATEGORIA_CADASTRO.concat(categoria.id.toString())
      ]);
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

  private carregarPesquisaCategorias(pagina: number) {
    const filtro: CategoriasFiltro = categoriaFiltroQueryParam(this.activatedRoute.snapshot.queryParamMap);
    this.categoriasService.resumo(filtro, DataTablePaginacaoDefault.pagina(pagina))
      .subscribe((response: any) => {
        if (response && response.content) {
          this.dataSource = ResponseToDataSource<Categoria>(response);
        }
      });
  }

}
