import {NgForm} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {Component, OnInit, ViewChild} from '@angular/core';
import {LancamentosService} from "../../domain/lancamentos.service";
import {DialogService} from "../../../../shared/components/dialog/dialog.service";
import {
  DESPESA,
  Lancamento,
  LancamentoCategoria,
  LancamentoPessoa,
  RECEITA,
  TipoLancamento
} from "../../domain/lancamento.model";
import {isNull, notNull} from "../../../../shared/utils/object-utils";

@Component({
  selector: 'wf-lancamentos-cadastro',
  templateUrl: './lancamentos-cadastro.component.html',
  styleUrls: ['./lancamentos-cadastro.component.scss']
})
export class LancamentosCadastroComponent implements OnInit {

  @ViewChild(NgForm, { static: false })
  form: NgForm;

  readonly tipoLancamentoReceita: TipoLancamento = RECEITA;
  readonly tipoLancamentoDespesa: TipoLancamento = DESPESA;

  tipoLancamentoSelecionado: TipoLancamento = RECEITA;

  pessoas: LancamentoPessoa[] = [];
  categorias: LancamentoCategoria[] = [];
  lancamento: Lancamento = new Lancamento();

  constructor(private readonly titulo: Title,
              private readonly router: Router,
              private readonly toast: ToastrService,
              private readonly dialogService: DialogService,
              private readonly activatedRoute: ActivatedRoute,
              private readonly lancamentosService: LancamentosService) {
  }

  ngOnInit(): void {
    this.titulo.setTitle('WF - Novo Lançamento');
    this.carregarComboPessoas();
    this.carregarComboCategorias();
    this.carregarLancamentoEmEdicao();
  }

  salvar() {
    this.lancamento.tipo = this.tipoLancamentoSelecionado.valor;
    this.lancamentosService.salvar(this.lancamento)
      .subscribe((lancamento: Lancamento) => {
        if (lancamento) {
          let mensagemSucesso = '';

          if (isNull(this.lancamento.id)) {
            mensagemSucesso = `Lançamento: ${lancamento.descricao} cadastrado com sucesso!`;
            this.lancamento = new Lancamento();
            this.form.resetForm({
              tipoLancamentoSelecionado: RECEITA
            });
          }

          if (notNull(this.lancamento.id)) {
            mensagemSucesso = `Lançamento: ${lancamento.descricao} atualizado com sucesso!`;
          }

          this.toast.success(mensagemSucesso);
        }
      });
  }

  private carregarComboCategorias() {
    this.lancamentosService.categorias()
      .subscribe((categorias: LancamentoCategoria[]) => {
        if (categorias) {
          this.categorias = categorias;
        }
      });
  }

  private carregarComboPessoas() {
    this.lancamentosService.pessoas()
      .subscribe((pessoas: LancamentoPessoa[]) => {
        if (pessoas) {
          this.pessoas = pessoas;
        }
      });
  }

  private carregarLancamentoEmEdicao() {
     const lacamentoIdEmEdicao = this.activatedRoute.snapshot.params['lacamentoId'];

     if (lacamentoIdEmEdicao) {
      this.lancamentosService.lancamento(lacamentoIdEmEdicao)
        .subscribe((lancamento: Lancamento) => {
          if (lancamento) {
            this.lancamento = lancamento;
          }
        });
    }
  }

}
