import {Component, Inject, OnInit} from '@angular/core';
import {AbstractController} from 'src/app/shared/controllers/Abstract.controller';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AuthService} from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-modal-create-user',
  templateUrl: './modal-create-user.component.html',
  styleUrls: ['./modal-create-user.component.scss']
})
export class ModalCreateUserComponent extends AbstractController implements OnInit {

  public form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ModalCreateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private auth: AuthService,
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

    const data = this.form.value;
    this.auth.createUser(data.username, data.password).subscribe(() => {
        alert('User created');
        this.dialogRef.close();
      }, () => {
        alert('Username already exists');
      }
    );
  }

  private initForm(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
}
