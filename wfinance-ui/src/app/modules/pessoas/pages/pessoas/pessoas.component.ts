import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PessoasService} from "../../domain/pessoas.service";
import {isEmpty} from "../../../../shared/utils/object-utils";
import {Pessoa, PessoasFiltro} from "../../domain/pessoa.model";
import {DataSourceTable, DataTablePaginacaoDefault, ResponseToDataSource} from "../../../../shared/components";
import {DialogService} from "../../../../shared/components/dialog/dialog.service";
import {NavigateQuery, navigationExtrasPagina} from "../../../../shared/router";
import {
  confirmDialogConfigExclusao,
  filtroValido,
  pessoaFiltroQueryParam,
  ROTA_PESSOA_CADASTRO
} from "../../domain/pessoas.helper";

@Component({
  selector: 'wf-pessoas',
  templateUrl: './pessoas.component.html'
})
export class PessoasComponent implements OnInit {

  dataSource: DataSourceTable<Pessoa> = new DataSourceTable<Pessoa>();

  constructor(private readonly router: Router,
              private readonly dialogService: DialogService,
              private readonly activatedRoute: ActivatedRoute,
              private readonly pessoasService: PessoasService) {
  }

  ngOnInit(): void {
    const pagina = this.activatedRoute.snapshot.queryParamMap.get('pagina') || '';
    const paginaAtual = isEmpty(pagina) ? 1 : Number(pagina);
    this.paginacao(paginaAtual);
  }

  pesquisar(filtro: PessoasFiltro) {
    const observable = filtroValido(filtro)
      ? this.pessoasService.resumo(filtro, DataTablePaginacaoDefault.pagina())
      : this.pessoasService.pessoas(DataTablePaginacaoDefault.pagina());

    observable.subscribe((response: any) => {
      if (response && response.content) {
        this.dataSource = ResponseToDataSource<Pessoa>(response);
      }
    });
  }

  paginacao(pagina: number) {
    this.router.navigate([], navigationExtrasPagina(pagina));
    const queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') || '';

    if (NavigateQuery.NAVIGATE_QUERY_TODOS === queryParam || isEmpty(queryParam)) {
      this.carregarTodasPessoas(pagina);
    }

    if (NavigateQuery.NAVIGATE_QUERY_PESQUISA === queryParam) {
      this.carregarPesquisaPessoas(pagina);
    }
  }

  excluir(pessoa: Pessoa) {
    if (pessoa) {
      const dialogConfig = confirmDialogConfigExclusao(pessoa);
      this.dialogService.confirm(dialogConfig).subscribe(resultado => {
        if (resultado) {
          this.pessoasService.excluir(pessoa).subscribe(_ => {
            const index = this.dataSource.conteudo.indexOf(pessoa);
            if (index >= 0) {
              this.dataSource.conteudo.splice(index, 1);
              this.dialogService.sucesso(
                'Exclusão de pessoa',
                'Pessoa excluída com sucesso!'
              );
            }
          });
        }
      });
    }
  }

  editar(pessoa: Pessoa) {
    if (pessoa) {
      this.router.navigate([
        ROTA_PESSOA_CADASTRO.concat(pessoa.id.toString())
      ]);
    }
  }

  private carregarTodasPessoas(pagina: number) {
    this.pessoasService
      .pessoas(DataTablePaginacaoDefault.pagina(pagina))
      .subscribe((response: any) => {
        if (response && response.content) {
          this.dataSource = ResponseToDataSource<Pessoa>(response);
        }
      });
  }

  private carregarPesquisaPessoas(pagina: number) {
    const filtro: PessoasFiltro = pessoaFiltroQueryParam(this.activatedRoute.snapshot.queryParamMap);
    this.pessoasService.resumo(filtro, DataTablePaginacaoDefault.pagina(pagina))
      .subscribe((response: any) => {
        if (response && response.content) {
          this.dataSource = ResponseToDataSource<Pessoa>(response);
        }
      });
  }
}
