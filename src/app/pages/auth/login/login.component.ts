import {Component, OnInit} from '@angular/core';
import {AbstractController} from 'src/app/shared/controllers/Abstract.controller';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from 'src/app/shared/services/auth.service';
import {ICredentials} from 'src/app/shared/models/auth.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends AbstractController implements OnInit {
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
  }

  public login(): void {
    if (!this.validateForm(this.form)) {
      return;
    }

    const credentials: ICredentials = this.form.value;
    this.auth.login(credentials).subscribe((response) => {
      this.auth.saveCredentials(credentials);
      this.router.navigateByUrl('/databases');
    });
  }

  private initForm(): void {
    this.form = this.fb.group({
      username: ['root', Validators.required],
      password: ['']
    });
  }
}
