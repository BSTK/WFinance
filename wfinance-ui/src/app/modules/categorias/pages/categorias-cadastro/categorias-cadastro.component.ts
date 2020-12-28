import {Component, OnInit} from '@angular/core';
import {Categoria} from "../../domain/categoria.model";
import {CategoriasService} from "../../domain/categorias.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'wf-categorias-cadastro',
  templateUrl: './categorias-cadastro.component.html'
})
export class CategoriasCadastroComponent implements OnInit {

  categoria: Categoria = new Categoria();

  constructor(private readonly toastrService: ToastrService,
              private readonly categoriaService: CategoriasService) { }

  /// TODO: IMPLEMENTAR A EDIÇÃO
  ngOnInit(): void { }

  salvar() {
    this.categoriaService.salvar(this.categoria)
      .subscribe((categoria: Categoria) => {
        if (categoria) {
          this.toastrService.success(`Categoria: ${this.categoria.nome} cadastrada com sucesso!`);
          this.categoria = new Categoria();
        }
      });
  }

}
