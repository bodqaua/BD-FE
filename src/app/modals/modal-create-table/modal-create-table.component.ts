import {Component, Inject, OnInit} from '@angular/core';
import {AbstractController} from 'src/app/shared/controllers/Abstract.controller';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DatabaseServiceInterface} from 'src/app/shared/models/services.interface';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TableTypes} from 'src/app/shared/models/database.model';

type IControls = { [p: string]: AbstractControl };
type IControlData = {
  [p: string]: {
    name: string;
    type: string;
    autoIncrement: boolean;
  }
};

@Component({
  selector: 'app-modal-create-table',
  templateUrl: './modal-create-table.component.html',
  styleUrls: ['./modal-create-table.component.scss']
})
export class ModalCreateTableComponent extends AbstractController implements OnInit {
  public form: FormGroup;
  public types = [...TableTypes];

  constructor(
    public dialogRef: MatDialogRef<ModalCreateTableComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { databaseName: string },
    @Inject('DatabaseService') public databaseService: DatabaseServiceInterface,
    private fb: FormBuilder
  ) {
    super();
  }

  ngOnInit(): void {
    this.generateForm();
  }

  public log(data: any): void {
    console.log(data);
  }

  public addControl(): void {
    const i: number = Object.keys(this.form.controls).length;
    this.form.addControl('field' + i, this.generateInitialControl());
  }

  public close(): void {
    this.dialogRef.close();
  }

  public submit(): void {
    if (!this.isFormValid(this.form)) {
      return;
    }
    const data: any = Object.assign({}, this.form.value);
    const name = data.name;
    delete data.name;
    const controls = this.prepareRequest(data);
    this.databaseService.createTable(this.data.databaseName, name, controls).subscribe(res => {
      console.log(res);
      this.dialogRef.close(true);
    });
  }

  public controlsMapper(controls: IControls): any[] {
    return Object.keys(controls).filter(control => control !== 'name');
  }

  private generateForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      field1: this.generateInitialControl(),
    });
  }

  private generateInitialControl(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      type: ['INT', Validators.required],
      autoIncrement: [false],
    });
  }

  private prepareRequest(controls: IControlData): any[] {
    const data = [];
    Object.keys(controls).forEach((key) => {
      if (controls[key].type !== 'INT') {
        controls[key].autoIncrement = false;
      }
      data.push(controls[key]);
    });
    return data;
  }

}
