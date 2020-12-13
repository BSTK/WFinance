import { Component, OnInit } from '@angular/core';
import {Categoria} from "../../categoria.model";

@Component({
  selector: 'wf-categorias',
  templateUrl: './categorias.component.html'
})
export class CategoriasComponent implements OnInit {

  readonly categorias: Categoria[] = [
    { id: 1, nome: 'Cimento e Concreto', cor: '#027FFD'},
    { id: 1, nome: 'Madeira', cor: '#FFC000'},
    { id: 1, nome: 'Pedra e Areia', cor: '#FEFE00'},
    { id: 1, nome: 'Agrotóxicos', cor: '#7D00FE'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
