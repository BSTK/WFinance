import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {Pessoa} from '../../services/pessoa.model';
import {Component, OnInit, ViewChild} from '@angular/core';
import {PessoasService} from '../../services/pessoas.service';
import {isNull, notNull} from '../../../../shared/utils/object-utils';
import {Cidade, Estado} from '../../../../shared/domain/model/integracao-ibge.model';
import {IntegracaoIbgeService} from '../../../../shared/domain/service/integracao-ibge.service';

@Component({
  selector: 'wf-pessoas-cadastro',
  templateUrl: './pessoas-cadastro.component.html'
})
export class PessoasCadastroComponent implements OnInit {
  
  @ViewChild(NgForm, {static: false})
  form: NgForm;
  
  estados: Estado[] = [];
  cidades: Cidade[] = [];
  pessoa: Pessoa = new Pessoa();
  
  constructor(private readonly titulo: Title,
              private readonly toastrService: ToastrService,
              private readonly pessoaService: PessoasService,
              private readonly activatedRoute: ActivatedRoute,
              private readonly integracaoIbgeService: IntegracaoIbgeService) {
  }
  
  ngOnInit(): void {
    this.titulo.setTitle('WF - Novo Fornecedor');
    this.carregarDadosEdicao();
    this.carregarEstados();
  }
  
  carregarCidades(uf: string) {
    this.integracaoIbgeService.cidades(uf)
      .subscribe((cidades: Cidade[]) => {
        if (cidades) {
          this.cidades = cidades;
        }
      });
  }
  
  salvar() {
    this.pessoaService.salvar(this.pessoa)
      .subscribe((pessoa: Pessoa) => {
        if (pessoa) {
          let mensagemSucesso = '';
          
          if (isNull(this.pessoa.id)) {
            mensagemSucesso = `Pessoa: ${pessoa.nome} cadastrada com sucesso!`;
            this.pessoa = new Pessoa();
            this.form.resetForm();
          }
          
          if (notNull(this.pessoa.id)) {
            mensagemSucesso = `Pessoa: ${pessoa.nome} atualizada com sucesso!`;
          }
          
          this.toastrService.success(mensagemSucesso);
        }
      });
  }
  
  private carregarEstados() {
    this.integracaoIbgeService.estados()
      .subscribe((estados: Estado[]) => {
        if (estados) {
          this.estados = estados;
        }
      });
  }
  
  private carregarDadosEdicao() {
    const pessoaId = this.activatedRoute.snapshot.params['pessoaId'];
    
    if (pessoaId) {
      this.pessoaService.pessoa(pessoaId)
        .subscribe((pessoa: Pessoa) => {
          if (pessoa) {
            this.pessoa = pessoa;
          }
        });
    }
  }
  
}
