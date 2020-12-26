import {Subject} from "rxjs";
import {Injectable} from '@angular/core';
import {DialogConfig} from "./dialog-config";

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private subject = new Subject<any>();

  constructor() { }

  dialog(config: DialogConfig): any {
    const dialog = this;
    this.subject.next({
      tipo: 'confirm',
      titulo: config.titulo,
      mensagem: config.mensagem,
      sim(): any {
        dialog.subject.next(true);
      },
      nao(): any {
        dialog.subject.next(false);
      },
      cancelar(): any {
        dialog.subject.next(false);
      },
    });
  }
}
