import { Component, OnInit } from '@angular/core';
import { FormGroup, Validator, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createSignUpForm();
  }

  createSignUpForm() {
    this.signUpForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  signUp() {
    if (this.signUpForm.valid) {
      let registerModel = Object.assign({}, this.signUpForm.value);
      this.authService.signUp(registerModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, "Succeed");
          this.router.navigate(["login"]);

        }, (responseError) => {
          this.toastrService.error(responseError.error);
        }
      )
    } else {
      this.toastrService.error("Please fill in all fields on the form ")
    }
  }

}
