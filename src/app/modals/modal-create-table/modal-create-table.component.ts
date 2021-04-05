import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AbstractController} from 'src/app/shared/controllers/Abstract.controller';

@Component({
  selector: 'app-modal-create-table',
  templateUrl: './modal-create-table.component.html',
  styleUrls: ['./modal-create-table.component.scss']
})
export class ModalCreateTableComponent extends AbstractController implements OnInit {
  public form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required]
    });
  }

  public close(): void {
    console.log('close');
  }

}
