import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  user: User;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private authService: AuthService,
    private router: Router,
    private userService: UserService

  ) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  getUser(email: string) {
    this.userService.getByMail(email).subscribe(
      (response) => {
        this.user = response.data;

      }, (responseError) => {
        this.toastrService.error(responseError.error);
      }
    )
  }

  login() {
    if (this.loginForm.valid) {
      let loginModel = Object.assign({}, this.loginForm.value);
      this.authService.login(loginModel).subscribe(
        (response) => {
          localStorage.setItem("email", loginModel.email);
          this.toastrService.success(response.message, "Succeed");
          localStorage.setItem("token", response.data.token);
          this.router.navigate(["/"]);

        }, (responseError) => {
          this.toastrService.error(responseError.error);
        }
      )
    } else {
      this.toastrService.error("Form Error");
    }
  }

}
