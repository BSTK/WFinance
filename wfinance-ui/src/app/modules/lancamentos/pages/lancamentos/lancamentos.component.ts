import {ToastrService} from 'ngx-toastr';
import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {Lancamento} from '../../domain/lancamento.model';
import {isEmpty} from '../../../../shared/utils/object-utils';
import {LancamentosService} from '../../domain/lancamentos.service';
import {DialogService} from '../../../../shared/components/dialog/dialog.service';
import {LancamentosFiltro} from '../../components/lancamentos-pesquisa/lancamentos-filtro.model';
import {ListagemDadosComponent} from '../../../../shared/components/listagem-dados/listagem-dados.component';
import {confirmDialogConfigExclusao, filtroValido, lancamentoFiltroQueryParam} from '../../domain/lancamento.helper';
import {
  DataTablePaginacaoDefault,
  NavigateQuery,
  navigationExtrasPagina,
  ResponseToDataSource
} from '../../../../shared';

@Component({
  selector: 'app-lancamentos',
  templateUrl: './lancamentos.component.html'
})
export class LancamentosComponent extends ListagemDadosComponent<Lancamento, LancamentosFiltro> {

  constructor(private readonly router: Router,
              private readonly toast: ToastrService,
              private readonly dialogService: DialogService,
              readonly title: Title,
              readonly activatedRoute: ActivatedRoute,
              readonly lancamentosService: LancamentosService) {
    super(title,
      'WF - Meus Lançamentos',
      activatedRoute,
      lancamentosService);
  }

  pesquisar(filtro: LancamentosFiltro) {
    const observable = filtroValido(filtro)
      ? this.lancamentosService.resumo(filtro, DataTablePaginacaoDefault.pagina())
      : this.lancamentosService.carregar(DataTablePaginacaoDefault.pagina());

    observable.subscribe((response: any) => {
      if (response && response.content) {
        this.dataSource = ResponseToDataSource<Lancamento>(response);
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
      this.carregarPesquisa(pagina, lancamentoFiltroQueryParam);
    }
  }

  excluir(lancamento: Lancamento) {
    if (lancamento) {
      const dialogConfig = confirmDialogConfigExclusao(lancamento);
      this.dialogService.confirm(dialogConfig).subscribe(resultado => {
        if (resultado) {
          this.lancamentosService.excluir(lancamento).subscribe(_ => {
            const index = this.dataSource.conteudo.indexOf(lancamento);
            if (index >= 0) {
              this.dataSource.conteudo.splice(index, 1);
              this.toast.success(
                'Lançamento excluído com sucesso!',
                'Exclusão de lançamento'
              );
            }
          });
        }
      });
    }
  }

  /// TODO: 1 - Implementar método de atualizar
  editar(lancamento: Lancamento) {
    if (lancamento) {
      this.router.navigate(['lancamentos/cadastro/' + lancamento.id]);
    }
  }

}
