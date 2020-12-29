import {NgForm} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute} from "@angular/router";
import {Pessoa} from "../../domain/pessoa.model";
import {Component, OnInit, ViewChild} from '@angular/core';
import {PessoasService} from "../../domain/pessoas.service";
import {isNull, notNull} from "../../../../shared/utils/object-utils";

@Component({
  selector: 'wf-pessoas-cadastro',
  templateUrl: './pessoas-cadastro.component.html'
})
export class PessoasCadastroComponent implements OnInit {

  @ViewChild(NgForm, { static: false })
  form: NgForm;

  pessoa: Pessoa = new Pessoa();

  constructor(private readonly toastrService: ToastrService,
              private readonly activatedRoute: ActivatedRoute,
              private readonly pessoaService: PessoasService) { }

  ngOnInit(): void {
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

}
