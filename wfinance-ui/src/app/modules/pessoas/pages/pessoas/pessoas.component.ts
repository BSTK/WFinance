import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PessoasService} from '../../services/pessoas.service';
import {isEmpty} from '../../../../shared/utils/object-utils';
import {Pessoa, PessoasFiltro} from '../../services/pessoa.model';
import {NavigateQuery, navigationExtrasPagina} from '../../../../shared/router';
import {DialogService} from '../../../../shared/components/dialog/dialog.service';
import {DataTablePaginacaoDefault, ResponseToDataSource} from '../../../../shared/components';
import {
  confirmDialogConfigExclusao,
  filtroValido,
  pessoaFiltroQueryParam,
  ROTA_PESSOA_CADASTRO
} from '../../services/pessoas.helper';
import {Title} from '@angular/platform-browser';
import {ListagemDadosComponent} from '../../../../shared/components/listagem-dados/listagem-dados.component';

@Component({
  selector: 'wf-pessoas',
  templateUrl: './pessoas.component.html'
})
export class PessoasComponent extends ListagemDadosComponent<Pessoa, PessoasFiltro> {
  
  constructor(readonly title: Title,
              private readonly router: Router,
              private readonly dialogService: DialogService,
              readonly activatedRoute: ActivatedRoute,
              readonly pessoasService: PessoasService) {
    super(title,
      'WF - Meus Fornecedores',
      activatedRoute,
      pessoasService);
  }

  pesquisar(filtro: PessoasFiltro) {
    const observable = filtroValido(filtro)
      ? this.pessoasService.resumo(filtro, DataTablePaginacaoDefault.pagina())
      : this.pessoasService.carregar(DataTablePaginacaoDefault.pagina());

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
      this.carregar(pagina);
    }

    if (NavigateQuery.NAVIGATE_QUERY_PESQUISA === queryParam) {
      this.carregarPesquisa(pagina, pessoaFiltroQueryParam);
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

  ativar(pessoa: Pessoa) {
    if (pessoa) {
      this.pessoasService.ativar(pessoa)
        .subscribe((pessoa: Pessoa) => {
          const index = this.dataSource.conteudo.findIndex(item => item.id === pessoa.id);
          if (index >= 0) {
            this.dataSource.conteudo[index] = pessoa;
            const mensagem = (pessoa.ativo) ? 'Ativada' : 'Desativada';
            this.dialogService.sucesso('Ativar/Desativar', `Pessoa ${mensagem}`);
          }
      });
    }
  }
  
}
