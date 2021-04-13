import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DatabaseServiceInterface} from 'src/app/shared/models/services.interface';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AbstractController} from 'src/app/shared/controllers/Abstract.controller';
interface IData {
  columns: string[];
  database: string;
  table: string;
}
@Component({
  selector: 'app-modal-create-table-data',
  templateUrl: './modal-create-table-data.component.html',
  styleUrls: ['./modal-create-table-data.component.scss']
})
export class ModalCreateTableDataComponent extends AbstractController implements OnInit {
  public form: FormGroup;
  public columns;
  public database;
  public table;
  private whiteListedFields: string[] = ['id', 'action'];

  constructor(
    public dialogRef: MatDialogRef<ModalCreateTableDataComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly data: IData,
    @Inject('DatabaseService') public databaseService: DatabaseServiceInterface,
    private fb: FormBuilder
  ) {
    super();
    this.columns = this.data.columns.filter(column => !this.whiteListedFields.includes(column));
    this.database = this.data.database;
    this.table = this.data.table;
  }

  ngOnInit(): void {
    this.initForm();
  }

  public close(): void {
    this.dialogRef.close();
  }

  public submit(): void {
    if (!this.isFormValid(this.form)) {
      return;
    }
    this.databaseService.insert(this.database, this.table, {data: this.form.value}).subscribe(res => {
      this.dialogRef.close(true);
    });
  }

  private initForm(): void {
    this.form = this.fb.group({});

    for(let i = 0; i < this.data.columns.length; i++) {
      const column = this.data.columns[i];
      if ( this.whiteListedFields.includes(column)) {
        continue;
      }
      const control = new FormControl('', [Validators.required]);
      this.form.addControl(column, control);
    }
  }
}
