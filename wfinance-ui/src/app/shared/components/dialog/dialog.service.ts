import {from, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {DialogComponent} from './dialog.component';
import {ConfirmDialogConfig} from './confirm-dialog-config';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private readonly toast: ToastrService,
              private readonly modalService: NgbModal) { }

  public sucesso(titulo: string, texto: string) {
    this.toast.success(texto, titulo);
  }

  public aviso(titulo: string, texto: string) {
    this.toast.warning(texto, titulo);
  }

  public confirm(config: ConfirmDialogConfig): Observable<boolean> {
    const options: NgbModalOptions = {
      size: 'md',
      centered: true,
      backdrop: 'static'
    };

    const dialogComponentRef = this.modalService.open(DialogComponent, options);
    dialogComponentRef.componentInstance.tipo = config.tipo;
    dialogComponentRef.componentInstance.texto = config.texto;
    dialogComponentRef.componentInstance.titulo = config.titulo;

    return from(dialogComponentRef.result);
  }

}
