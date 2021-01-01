import {Usuario} from "../../domain/usuario.model";
import {Component, OnInit} from '@angular/core';
import {AutenticadorService} from "../../domain/autenticador.service";

@Component({
  selector: 'wf-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  readonly usuario: Usuario = new Usuario();

  constructor(private readonly autenticadorService: AutenticadorService) { }

  ngOnInit(): void {
  }

  login() {
    this.autenticadorService
        .login(this.usuario);
  }

}
