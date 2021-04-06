import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginComponent } from '../components/login/login.component';
import { SignupComponent } from '../components/signup/signup.component';
import { Login } from '../models/login';
import { Register } from '../models/register';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = "https://localhost:44314/api/auth/";

  constructor(private httpClient: HttpClient) { }

  login(login: LoginComponent): Observable<SingleResponseModel<Login>> {
    let newPath = this.apiUrl + "login";
    return this.httpClient.post<SingleResponseModel<Login>>(newPath, login);
  }

  signUp(signUp: SignupComponent): Observable<SingleResponseModel<Register>> {
    let newPath = this.apiUrl + "register";
    return this.httpClient.post<SingleResponseModel<Register>>(newPath, signUp);
  }


  isAuth() {
    if (localStorage.getItem("token")) {
      return true;
    } else {
      return false;
    }
  }
}
