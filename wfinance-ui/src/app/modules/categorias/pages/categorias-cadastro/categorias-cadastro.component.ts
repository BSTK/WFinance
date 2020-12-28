import {NgForm} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute} from "@angular/router";
import {Categoria} from "../../domain/categoria.model";
import {Component, OnInit, ViewChild} from '@angular/core';
import {CategoriasService} from "../../domain/categorias.service";

@Component({
  selector: 'wf-categorias-cadastro',
  templateUrl: './categorias-cadastro.component.html'
})
export class CategoriasCadastroComponent implements OnInit {

  @ViewChild(NgForm, { static: false })
  form: NgForm;

  categoria: Categoria = new Categoria();

  constructor(private readonly toastrService: ToastrService,
              private readonly activatedRoute: ActivatedRoute,
              private readonly categoriaService: CategoriasService) { }

  ngOnInit(): void {
    const categoriaId = this.activatedRoute.snapshot.params['categoriaId'];

    if (categoriaId) {
      this.categoriaService.categoria(categoriaId)
        .subscribe((categoria: Categoria) => {
          if (categoria) {
            this.categoria = categoria;
          }
        });
    }
  }

  salvar() {
    this.categoriaService.salvar(this.categoria)
      .subscribe((categoria: Categoria) => {
        if (categoria) {
          this.toastrService.success(`Categoria: ${this.categoria.nome} cadastrada com sucesso!`);
          this.categoria = new Categoria();
          this.form.resetForm();
        }
      });
  }

}
