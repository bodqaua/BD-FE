import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AbstractController} from 'src/app/shared/controllers/Abstract.controller';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DatabaseServiceInterface} from 'src/app/shared/models/services.interface';

@Component({
  selector: 'app-modal-create-database',
  templateUrl: './modal-create-database.component.html',
  styleUrls: ['./modal-create-database.component.scss']
})
export class ModalCreateDatabaseComponent extends AbstractController implements OnInit {
  public form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ModalCreateDatabaseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject('DatabaseService') public databaseService: DatabaseServiceInterface,
    private fb: FormBuilder
  ) {
    super();
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

    const database = this.trimSpaces(this.form.value.name);
    this.databaseService.createDatabase(database).subscribe(res => {
      console.log(res);
      this.dialogRef.close(true);
    });
  }

  private initForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required]
    });
  }
}
