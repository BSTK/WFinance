import {NgForm} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DESPESA, Lancamento, RECEITA, TipoLancamento} from "../../domain/lancamento.model";
import {DialogService} from "../../../../shared/components/dialog/dialog.service";
import {notEmpty} from "../../../../shared/utils/object-utils";
import {NavigateQuery} from "../../../../shared/router";
import {LancamentosService} from "../../domain/lancamentos.service";

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

  constructor(private readonly router: Router,
              private readonly toast: ToastrService,
              private readonly dialogService: DialogService,
              private readonly activatedRoute: ActivatedRoute,
              private readonly lancamentosService: LancamentosService) { }

  ngOnInit(): void {
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

  salvar(ngForm: NgForm) {
    console.log('Formulario valido: ', ngForm.valid);
  }

}
