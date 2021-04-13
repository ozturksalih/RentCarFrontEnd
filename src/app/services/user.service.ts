import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = environment.apiUrl + "users";



  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<ListResponseModel<User>> {

    return this.httpClient.get<ListResponseModel<User>>(this.apiUrl);
  }
  getById(userId: number): Observable<SingleResponseModel<User>> {
    let newPath = this.apiUrl + "/getbyid?id="
    return this.httpClient.get<SingleResponseModel<User>>(newPath + userId);
  }

  getByMail(email: string): Observable<SingleResponseModel<User>> {
    let newPath = this.apiUrl + "/getbyemail?email="
    return this.httpClient.get<SingleResponseModel<User>>(newPath + email);
  }


}
