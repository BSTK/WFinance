import {Router} from '@angular/router';
import {Component} from '@angular/core';
import {AutenticadorService} from "../../../modules/seguranca/domain/autenticador.service";

@Component({
  selector: 'wf-topbar',
  templateUrl: './topbar.component.html'
})
export class TopbarComponent {

  constructor(private readonly router: Router,
              readonly autenticadorService: AutenticadorService) { }

  logout() {
    this.autenticadorService.logout();
    this.router.navigate(['/login']);
    window.location.href = '/login';
    window.location.reload();
  }

}
