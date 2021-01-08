import {ToastrService} from "ngx-toastr";
import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {Lancamento} from "../../domain/lancamento.model";
import {isEmpty} from '../../../../shared/utils/object-utils';
import {LancamentosService} from "../../domain/lancamentos.service";
import {DialogService} from "../../../../shared/components/dialog/dialog.service";
import {AutenticadorService} from "../../../seguranca/domain/autenticador.service";
import {LancamentosFiltro} from "../../components/lancamentos-pesquisa/lancamentos-filtro.model";
import {
  DataSourceTable,
  DataTablePaginacaoDefault,
  NavigateQuery,
  navigationExtrasPagina,
  ResponseToDataSource
} from '../../../../shared';
import {confirmDialogConfigExclusao, filtroValido, lancamentoFiltroQueryParam} from "../../domain/lancamento.helper";

@Component({
  selector: 'app-lancamentos',
  templateUrl: './lancamentos.component.html'
})
export class LancamentosComponent implements OnInit {

  dataSource: DataSourceTable<Lancamento> = new DataSourceTable<Lancamento>();

  constructor(private readonly titulo: Title,
              private readonly router: Router,
              private readonly toast: ToastrService,
              private readonly dialogService: DialogService,
              private readonly activatedRoute: ActivatedRoute,
              private readonly authService: AutenticadorService,
              private readonly lancamentosService: LancamentosService) { }

  ngOnInit() {
    const pagina = this.activatedRoute.snapshot.queryParamMap.get('pagina') || '';
    const paginaAtual = isEmpty(pagina) ? 1 : Number(pagina);
    this.paginacao(paginaAtual);
    this.titulo.setTitle('WF - Meus Lançamentos');
  }

  pesquisar(filtro: LancamentosFiltro) {
    const observable = filtroValido(filtro)
      ? this.lancamentosService.resumo(filtro, DataTablePaginacaoDefault.pagina())
      : this.lancamentosService.lancamentos(DataTablePaginacaoDefault.pagina());

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
      this.carregarTodosLancamentos(pagina);
    }

    if (NavigateQuery.NAVIGATE_QUERY_PESQUISA === queryParam) {
      this.carregarPesquisaLancamentos(pagina);
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

  /// TODO: IMPLEMENTAR MÉTODO DE ATUALIZAR
  editar(lancamento: Lancamento) {
    if (lancamento) {
      this.router.navigate(['lancamentos/cadastro/' + lancamento.id]);
    }
  }

  private carregarTodosLancamentos(pagina: number) {
    this.lancamentosService
      .lancamentos(DataTablePaginacaoDefault.pagina(pagina))
      .subscribe((response: any) => {
        if (response && response.content) {
          this.dataSource = ResponseToDataSource<Lancamento>(response);
        }
      });
  }

  private carregarPesquisaLancamentos(pagina: number) {
    const filtro: LancamentosFiltro = lancamentoFiltroQueryParam(this.activatedRoute.snapshot.queryParamMap);
    this.lancamentosService
      .resumo(filtro, DataTablePaginacaoDefault.pagina(pagina))
      .subscribe((response: any) => {
        if (response && response.content) {
          this.dataSource = ResponseToDataSource<Lancamento>(response);
        }
      });
  }

}
