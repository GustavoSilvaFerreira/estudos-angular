import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message/message.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    MessageComponent,
    SnackbarComponent,
    SpinnerComponent,
    ModalComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MessageComponent,
    SnackbarComponent,
    SpinnerComponent,
    ModalComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
