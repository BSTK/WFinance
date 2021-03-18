import {Title} from '@angular/platform-browser';
import {Component, OnInit} from '@angular/core';
import {AutenticadorService} from './modules/seguranca/services/autenticador.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  
  renderizarTemplateApp: boolean = false;
  renderizarTemplateLogin: boolean = true;
  
  constructor(private readonly titulo: Title,
              private readonly autenticadorService: AutenticadorService) {
  }
  
  ngOnInit(): void {
    this.autenticadorService
      .usuarioLogado
      .subscribe((usuarioLogado: boolean) => {
        if (usuarioLogado) {
          this.renderizarTemplateApp = true;
          this.renderizarTemplateLogin = false;
        } else {
          this.renderizarTemplateApp = false;
          this.renderizarTemplateLogin = true;
        }
        
        this.titulo.setTitle('WFinance - Login');
      });
  }
  
}
