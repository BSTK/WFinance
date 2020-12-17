import {Component, OnInit} from '@angular/core';
import {PessoasService} from "../../domain/pessoas.service";
import {Pessoa, PessoasFiltro} from "../../domain/pessoa.model";
import {notUndefined} from "../../../../shared/utils/object-utils";

@Component({
  selector: 'wf-pessoas',
  templateUrl: './pessoas.component.html'
})
export class PessoasComponent implements OnInit {

  readonly pessoas = [
    { nome: 'Manoel Pinheiro', cidade: 'Uberlândia', estado: 'MG', ativo: true },
    { nome: 'Sebastião da Silva', cidade: 'São Paulo', estado: 'SP', ativo: false },
    { nome: 'Carla Souza', cidade: 'Florianópolis', estado: 'SC', ativo: true },
    { nome: 'Luís Pereira', cidade: 'Curitiba', estado: 'PR', ativo: true },
    { nome: 'Vilmar Andrade', cidade: 'Rio de Janeiro', estado: 'RJ', ativo: false },
    { nome: 'Paula Maria', cidade: 'Uberlândia', estado: 'MG', ativo: true },
    { nome: 'Luís Pereira', cidade: 'Curitiba', estado: 'PR', ativo: true },
    { nome: 'Vilmar Andrade', cidade: 'Rio de Janeiro', estado: 'RJ', ativo: false },
    { nome: 'Paula Maria', cidade: 'Uberlândia', estado: 'MG', ativo: true }
  ];

  constructor(private readonly pessoasService: PessoasService) { }

  ngOnInit(): void {
    this.pessoasService
      .pessoas()
      .subscribe((response: Pessoa[]) => {
        if (response) {
          console.log('ngOnInit => Pessoas cadastradas: ', response);
        }
      });
  }

  buscarPessoas(filtro: PessoasFiltro) {
    if (notUndefined(filtro)) {
      this.pessoasService
        .pessoasPorNome(filtro)
        .subscribe((response: Pessoa[]) => {
          if (response) {
            console.log('buscarPessoas => filtro: ', filtro);
            console.log('buscarPessoas => Pessoas cadastradas: ', response);
          }
        });
    }
  }

}
