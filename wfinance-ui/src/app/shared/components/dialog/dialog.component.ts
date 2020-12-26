import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'wf-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  @Input() readonly titulo: string = '';
  @Input() readonly mensagem: string = '';

  @Output() readonly eventDialog: EventEmitter<any> = new EventEmitter<any>();
  @Output() readonly eventDialogOK: EventEmitter<any> = new EventEmitter<any>();
  @Output() readonly eventDialogNOK: EventEmitter<any> = new EventEmitter<any>();
  @Output() readonly eventDialogCancelar: EventEmitter<any> = new EventEmitter<any>();

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void { }

  dialog() {
    this.eventDialog.emit();
  }

  ok() {
    this.eventDialogOK.emit(true);
  }

}
