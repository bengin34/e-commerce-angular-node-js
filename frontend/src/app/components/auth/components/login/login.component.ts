import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

import { SharedModule } from '../../../../common/shared/shared.module';
;
import { LoginModel } from '../../models/login.model';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private _auth: AuthService,
    private _toastr: ToastrService,
    private _router: Router
  ) {}

  login(form: NgForm) {
    if (form.valid) {
      let model = new LoginModel();
      model.email = form.controls['email'].value;
      model.password = form.controls['password'].value;

      this._auth.login(model, (res) => {
        this._toastr.success('Login is successful');
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this._router.navigateByUrl('/');
      });
    }
  }
}
