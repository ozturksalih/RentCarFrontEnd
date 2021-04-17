import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  user: User;
  apiUrl = "https://localhost:44314/api/customers/";

  constructor(private httpClient: HttpClient,
    private userService: UserService) { }

  getCustomers(): Observable<ListResponseModel<Customer>> {
    let newPath = this.apiUrl + "getcustomerdetail";
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }

  getByUserId(userId: number): Observable<ListResponseModel<Customer>> {
    let newPath = this.apiUrl + "getbyuserid?userId=" + userId;
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }

}
