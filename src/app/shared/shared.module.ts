import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message/message.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SnackbarComponent } from './snackbar/snackbar.component';

@NgModule({
  declarations: [
    MessageComponent,
    SnackbarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MessageComponent,
    SnackbarComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
