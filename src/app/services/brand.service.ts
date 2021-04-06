import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Brand } from '../models/brand';
import { ResponseModel } from '../models/responseModel';


@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl = "https://localhost:44314/api/";

  constructor(private httpClient: HttpClient) { }

  getBrands(): Observable<ListResponseModel<Brand>> {
    return this.httpClient.get<ListResponseModel<Brand>>(this.apiUrl + "brands/getall");
  }

  add(brand: Brand): Observable<ResponseModel> {
    let newPath = this.apiUrl + "brands/add";
    return this.httpClient.post<ResponseModel>(newPath, brand);
  }
  update(brand: Brand): Observable<ResponseModel> {
    let newPath = this.apiUrl + "brands/update";
    return this.httpClient.put<ResponseModel>(newPath, brand);
  }

  delete(brand: Brand): Observable<ResponseModel> {
    let newPath = this.apiUrl + "brands/delete";
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: brand
    };
    return this.httpClient.delete<ResponseModel>(newPath, httpOptions);
  }

}
