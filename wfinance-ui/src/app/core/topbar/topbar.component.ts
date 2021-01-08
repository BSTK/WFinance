import { Component, OnInit } from '@angular/core';
import {AutenticadorService} from "../../modules/seguranca/domain/autenticador.service";

@Component({
  selector: 'wf-topbar',
  templateUrl: './topbar.component.html'
})
export class TopbarComponent implements OnInit {

  constructor(readonly autenticadorService: AutenticadorService) { }

  ngOnInit(): void {
  }

}
