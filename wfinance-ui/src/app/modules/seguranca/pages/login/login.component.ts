import {Router} from "@angular/router";
import {Component, OnInit} from '@angular/core';
import {Usuario} from "../../domain/usuario.model";
import {AutenticadorService} from "../../domain/autenticador.service";

@Component({
  selector: 'wf-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  readonly usuario: Usuario = new Usuario();

  constructor(private readonly router: Router,
              private readonly autenticadorService: AutenticadorService) { }

  ngOnInit(): void { }

  login() {
    this.autenticadorService
      .login(this.usuario)
      .subscribe((value: any ) => {
        if (value) {
          this.autenticadorService.eventUsuarioLogado.emit(true);
          this.router.navigate(['/lancamentos']);
        }
      });
  }

}
