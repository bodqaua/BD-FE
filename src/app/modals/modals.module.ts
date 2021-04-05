import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalCreateTableComponent } from './modal-create-table/modal-create-table.component';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {ModalsService} from 'src/app/shared/services/modals.service';



@NgModule({
  declarations: [ModalCreateTableComponent],
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
  ],
  providers: [
    {provide: 'ModalService', useClass: ModalsService},
    ModalCreateTableComponent
  ]
})
export class ModalsModule { }
