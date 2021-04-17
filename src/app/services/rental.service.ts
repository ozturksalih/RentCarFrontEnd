import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentalDto } from '../models/rentalDto';
import { ResponseModel } from '../models/responseModel';
import { CarService } from './car.service';
@Injectable({
  providedIn: 'root'
})
export class RentalService {

  car: Car[] = [];
  rentalModel: Rental;
  dataLoaded = false;
  apiUrl = environment.apiUrl + "rentals/";

  constructor(private httpClient: HttpClient) { }


  getByCarId(carId: number): Observable<ListResponseModel<Rental>> {
    let newPath = this.apiUrl + "getbycarid?carId=" + carId;
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }
  getRentalDetailByCustomerId(customerId: number):
    Observable<ListResponseModel<RentalDto>> {
    let newPath = this.apiUrl + "getdetailbycustomerid?customerId=" + customerId;
    return this.httpClient.get<ListResponseModel<RentalDto>>(newPath);
  }
  addRental(rental: Rental): Observable<ResponseModel> {
    let newPath = this.apiUrl + "add";
    return this.httpClient.post<ResponseModel>(newPath, rental);
  }

}
