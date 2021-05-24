import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalCreateDatabaseComponent} from './modal-create-database/modal-create-database.component';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {ModalsService} from 'src/app/shared/services/modals.service';
import {ModalCreateTableComponent} from './modal-create-table/modal-create-table.component';
import {ModalCreateTableDataComponent} from './modal-create-table-data/modal-create-table-data.component';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ModalCreateUserComponent } from './modal-create-user/modal-create-user.component';


@NgModule({
  declarations: [
    ModalCreateDatabaseComponent,
    ModalCreateTableComponent,
    ModalCreateTableDataComponent,
    ModalCreateUserComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  providers: [
    {provide: 'ModalService', useClass: ModalsService},
  ],
  entryComponents: [
    ModalCreateDatabaseComponent,
    ModalCreateTableComponent,
    ModalCreateTableDataComponent
  ],
  exports: [
    ModalCreateDatabaseComponent,
    ModalCreateTableComponent,
    ModalCreateTableDataComponent
  ]
})
export class ModalsModule {
}
