import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'wf-cabecalho-pagina',
  templateUrl: './cabecalho-pagina.component.html'
})
export class CabecalhoPaginaComponent implements OnInit {

  @Input() readonly titulo: string;
  @Input() readonly subtitulo: string;

  constructor() { }

  ngOnInit(): void {
  }

}
