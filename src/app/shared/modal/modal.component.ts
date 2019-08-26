import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() id = '';
  @Input() message = '';
  @Input() title = '';

  @Output() emitOk = new EventEmitter();
  @Output() emitClose = new EventEmitter();

  /*
    Add no botão:
    // o data-target é o id do modal
    data-toggle="modal" data-target="#removerTarefa"
  */

  constructor() { }

  ngOnInit() {
  }

  close() {
    this.emitClose.emit();
  }

  ok() {
    this.emitOk.emit();
  }

}
