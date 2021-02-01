import {Component} from '@angular/core';
import {Categoria} from '../../services/categoria.model';
import {ActivatedRoute, Router} from '@angular/router';
import {isEmpty} from '../../../../shared/utils/object-utils';
import {CategoriasService} from '../../services/categorias.service';
import {NavigateQuery, navigationExtrasPagina} from '../../../../shared/router';
import {DialogService} from '../../../../shared/components/dialog/dialog.service';
import {CategoriasFiltro} from '../../components/categorias-pesquisa/categorias-filtro.model';
import {DataTablePaginacaoDefault, ResponseToDataSource} from '../../../../shared/components';
import {ListagemDadosComponent} from '../../../../shared/components/listagem-dados/listagem-dados.component';
import {
  categoriaFiltroQueryParam,
  confirmDialogConfigExclusao,
  filtroValido,
  ROTA_CATEGORIA_CADASTRO
} from '../../services/categoria.helper';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'wf-categorias',
  templateUrl: './categorias.component.html'
})
export class CategoriasComponent extends ListagemDadosComponent<Categoria, CategoriasFiltro> {
  
  constructor(private readonly router: Router,
              private readonly dialogService: DialogService,
              readonly title: Title,
              readonly activatedRoute: ActivatedRoute,
              readonly categoriasService: CategoriasService) {
    super(title,
      'WF - Minhas Categorias',
      activatedRoute,
      categoriasService);
  }

  pesquisar(filtro: CategoriasFiltro) {
    const observable = filtroValido(filtro)
      ? this.categoriasService.resumo(filtro, DataTablePaginacaoDefault.pagina())
      : this.categoriasService.carregar(DataTablePaginacaoDefault.pagina());

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
      this.carregar(pagina);
    }

    if (NavigateQuery.NAVIGATE_QUERY_PESQUISA === queryParam) {
      this.carregarPesquisa(pagina, categoriaFiltroQueryParam);
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

}
