import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ConfirmDialogConfigTipo} from './confirm-dialog-config';

@Component({
  selector: 'wf-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  
  readonly inclusao: ConfirmDialogConfigTipo = ConfirmDialogConfigTipo.INLUSAO;
  readonly exclusao: ConfirmDialogConfigTipo = ConfirmDialogConfigTipo.EXCLUSAO;
  
  @Input() readonly texto: string = '';
  @Input() readonly titulo: string = '';
  @Input() readonly tipo: ConfirmDialogConfigTipo = ConfirmDialogConfigTipo.INLUSAO;
  
  constructor(private activeModal: NgbActiveModal) {
  }
  
  ngOnInit(): void {
  }
  
  sim() {
    this.activeModal.close(true);
  }
  
  cancelar() {
    this.activeModal.close(false);
  }
  
}
