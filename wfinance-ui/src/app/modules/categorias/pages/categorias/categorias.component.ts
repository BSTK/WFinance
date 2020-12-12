import { Component, OnInit } from '@angular/core';
import {Categoria} from "../../categoria.model";

@Component({
  selector: 'wf-categorias',
  templateUrl: './categorias.component.html'
})
export class CategoriasComponent implements OnInit {

  readonly categorias: Categoria[] = [
    { nome: 'Cimento e Concreto', cor: '#027FFD'},
    { nome: 'Madeira', cor: '#FFC000'},
    { nome: 'Pedra e Areia', cor: '#FEFE00'},
    { nome: 'Agrotóxicos', cor: '#7D00FE'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
