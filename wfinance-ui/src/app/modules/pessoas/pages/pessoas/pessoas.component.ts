import {Component, OnInit} from '@angular/core';
import {PessoasService} from "../../domain/pessoas.service";
import {Pessoa, PessoasFiltro} from "../../domain/pessoa.model";
import {notNull} from "../../../../shared/utils/object-utils";
import {DataSourceTable, ResponseToDataSource} from "../../../../shared/components/data-table/data-source.model";

@Component({
  selector: 'wf-pessoas',
  templateUrl: './pessoas.component.html'
})
export class PessoasComponent implements OnInit {

  dataSource: DataSourceTable<Pessoa> = new DataSourceTable<Pessoa>();

  constructor(private readonly pessoasService: PessoasService) { }

  /// TODO: IMPLEMENTAR PAGINAÇÃO PARA PESQUISA DE PESSOAS
  ngOnInit(): void {
    this.pessoasService
      .pessoas()
      .subscribe((response: Pessoa[]) => {
        if (response) {
          const responseMock = {
            number: 0,
            content: response,
            totalElements: 0
          };
          this.dataSource = ResponseToDataSource<Pessoa>(responseMock);
        }
      });
  }

  /// TODO: IMPLEMENTAR PAGINAÇÃO PARA PESQUISA DE PESSOAS
  buscarPessoas(filtro: PessoasFiltro) {
    if (notNull(filtro)) {
      this.pessoasService
        .pessoasPorNome(filtro)
        .subscribe((response: Pessoa[]) => {
          if (response) {
            const responseMock = {
              number: 0,
              content: response,
              totalElements: 0
            };

            this.dataSource = ResponseToDataSource<Pessoa>(responseMock);
          }
        });
    }
  }

}
