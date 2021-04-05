import { Injectable } from '@angular/core';
import {ModalServiceInterface} from 'src/app/shared/models/services.interface';
import {Observable} from 'rxjs';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ModalsService implements ModalServiceInterface{

  constructor(
    private dialog: MatDialog
  ) { }

  openModal(component: any, data?: any): MatDialogRef<any> {
    return this.dialog.open(component, {
      width: '250px',
      data: data
    });
  }
}
