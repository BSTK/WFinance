import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Usuario} from "../../domain/usuario.model";
import {Component, OnInit, ViewChild} from '@angular/core';
import {notEmpty} from "../../../../shared/utils/object-utils";
import {AutenticadorService} from "../../domain/autenticador.service";

@Component({
  selector: 'wf-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  readonly usuario = new Usuario();

  @ViewChild(NgForm, { static: false })
  form: NgForm;

  constructor(private readonly router: Router,
              private readonly httpClient: HttpClient,
              private readonly autenticadorService: AutenticadorService) { }

  ngOnInit(): void {
    this.autenticadorService
        .eventUsuarioLoginInvalido
        .subscribe((loginInvalido: any ) => {
          console.log('LOGIN INVALIDO = ', loginInvalido);
          this.form.controls['login'].setErrors({required: false});
          this.form.controls['senha'].setErrors({required: false});
        });
  }

  login() {
    if (notEmpty(this.usuario.email) && notEmpty(this.usuario.senha)) {
      this.autenticadorService.login(this.usuario)
        .subscribe((_) => {
          this.autenticadorService.eventUsuarioLogado.emit(true);
          this.router.navigate(['/lancamentos']);
        });
    }
  }

}
