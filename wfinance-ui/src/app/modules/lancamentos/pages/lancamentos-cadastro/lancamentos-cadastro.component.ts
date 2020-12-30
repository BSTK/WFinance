import {NgForm} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {LancamentosService} from "../../domain/lancamentos.service";
import {DialogService} from "../../../../shared/components/dialog/dialog.service";
import {DESPESA, Lancamento, RECEITA, TipoLancamento} from "../../domain/lancamento.model";

@Component({
  selector: 'wf-lancamentos-cadastro',
  templateUrl: './lancamentos-cadastro.component.html',
  styleUrls: ['./lancamentos-cadastro.component.scss']
})
export class LancamentosCadastroComponent implements OnInit {

  readonly tipoLancamentoReceita: TipoLancamento = RECEITA;
  readonly tipoLancamentoDespesa: TipoLancamento = DESPESA;

  lancamento: Lancamento = new Lancamento();
  tipoLancamentoSelecionado: TipoLancamento = RECEITA;

  constructor(private readonly titulo: Title,
              private readonly router: Router,
              private readonly toast: ToastrService,
              private readonly dialogService: DialogService,
              private readonly activatedRoute: ActivatedRoute,
              private readonly lancamentosService: LancamentosService) { }

  ngOnInit(): void {
    this.titulo.setTitle('WF - Novo Lançamento');
   /***
    const lacamentoIdEmEdicao = this.activatedRoute.snapshot.params['lacamentoId'];

    if (lacamentoIdEmEdicao) {
      this.lancamentosService.lancamento(lacamentoIdEmEdicao)
        .subscribe((lancamento: Lancamento) => {
          if (lancamento) {
            this.lancamento = lancamento;
          }
        });
    }
    */
  }

  salvar(ngForm: NgForm) {
    this.lancamento.tipo = this.tipoLancamentoSelecionado.valor;
    console.log('Salvando Lancamento: ', this.lancamento);
  }

}
