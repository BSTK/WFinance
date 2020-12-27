import {from, Observable} from "rxjs";
import {Injectable} from '@angular/core';
import {DialogComponent} from "./dialog.component";
import {ConfirmDialogConfig} from "./confirm-dialog-config";
import {NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private modalService: NgbModal) { }

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
