import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { CarService } from './car.service';
@Injectable({
  providedIn: 'root'
})
export class RentalService {

  car: Car[] = [];
  carToRent: Rental;
  dataLoaded = false;
  apiUrl = environment.apiUrl + "rentals/";

  constructor(private httpClient: HttpClient) { }


  getByCarId(carId: number): Observable<ListResponseModel<Rental>> {
    let newPath = this.apiUrl + "getbycarid?carId=" + carId;
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

}
