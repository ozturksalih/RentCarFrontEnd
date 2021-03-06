import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  apiUrl = "https://localhost:44314/api/";

  constructor(private httpClient: HttpClient) { }

  getColors(): Observable<ListResponseModel<Color>> {
    return this.httpClient.get<ListResponseModel<Color>>(this.apiUrl + "colors/getall");
  }
  add(color: Color): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "colors/add", color);
  }
  update(color: Color): Observable<ResponseModel> {
    let newPath = this.apiUrl + "colors/update";
    return this.httpClient.put<ResponseModel>(newPath, color);
  }
  delete(color: Color): Observable<ResponseModel> {
    let newPath = this.apiUrl + "colors/delete";
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: color
    };
    return this.httpClient.delete<ResponseModel>(newPath, httpOptions);
  }
}
