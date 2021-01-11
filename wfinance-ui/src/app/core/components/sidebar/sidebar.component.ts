import { Component, OnInit } from '@angular/core';
import {Menu} from './components/menu/menu.model';
import {MenuItem} from './components/menu/menu-item.model';

@Component({
  selector: 'wf-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

  readonly menuPrincipal = new Menu('Dashboard', [
    new MenuItem('fa-home', 'Home', 'lancamentos')
  ]);

  readonly menus: Menu[] = [
    new Menu('Lançamento', [
        new MenuItem('fa-money-bill-alt', 'Meus Lançamentos', 'lancamentos'),
        new MenuItem('fa-money-bill-alt', 'Novo Lançamento', 'lancamentos/cadastro')
    ]),

    new Menu('Fornecedores', [
      new MenuItem('fa-people-arrows', 'Meus Fornecedores', 'pessoas'),
      new MenuItem('fa-people-arrows', 'Novo Fornecedor', 'pessoas/cadastro')
    ]),

    new Menu('Categorias', [
      new MenuItem('fa-boxes', 'Minhas Categorias', 'categorias'),
      new MenuItem('fa-boxes', 'Nova Categoria', 'categorias/cadastro')
    ])
  ];

  constructor() { }

  ngOnInit(): void { }

}
