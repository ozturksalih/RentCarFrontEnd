import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Car } from '../models/car';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = "https://localhost:44314/api/";

  constructor(private httpClient: HttpClient) { }

  deleteCar(car: Car): Observable<ResponseModel> {
    let newPath = this.apiUrl + "cars/delete";
    return this.httpClient.delete<ResponseModel>(newPath);
  }

  updateCar(car: Car): Observable<ResponseModel> {
    let newPath = this.apiUrl + "cars/update";

    return this.httpClient.put<ResponseModel>(newPath, car);
  }

  addCar(car: Car): Observable<ResponseModel> {
    let newPath = this.apiUrl + "cars/add";
    return this.httpClient.post<ResponseModel>(newPath, car);
  }
  getCars(): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + "cars/getcardetail";
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarsByBrand(brandId: number): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + "cars/getbybrandid?brandId=" + brandId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarsByColor(colorId: number): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + "cars/getcarsbycolorid?colorid=" + colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarByCarId(carId: number): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + 'cars/getcardetailbyid?carId=' + carId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarsByBrandAndColor(brandId: number, colorId: number): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + 'cars/getcarsbybrandandcolor?brandId=' + brandId + '&colorId=' + colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  delete(car: Car): Observable<ResponseModel> {
    let newPath = this.apiUrl + "cars/delete";
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: car
    };
    return this.httpClient.delete<ResponseModel>(newPath, httpOptions);
  }
}
