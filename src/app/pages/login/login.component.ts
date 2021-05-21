import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  checkLogin: boolean;
  loginForm: FormGroup;
  registerForm: FormGroup;
  constructor(private fb: FormBuilder,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.initLoginForm();
    this.initRegisterForm();
  }
  checkUser(status: boolean): void {
    if (status) {
      this.checkLogin = true;
    }
    else {
      this.checkLogin = false;
    }
  }

  initLoginForm(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    })
  }

  initRegisterForm(): void {
    this.registerForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]]
    })
  }

  submitLogin(): void {
    const { email, password } = this.loginForm.value;
    this.authService.singIn(email, password);
  }
  submitRegister(): void {
    const { email, password } = this.registerForm.value;
    this.authService.singUp(email, password);
  }
}
