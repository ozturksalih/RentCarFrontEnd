import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
  constructor(private httpClient: HttpClient) { }

  checkAvailability(carToRent: Rental) {
    return true;
  }
  setRental(carToRent: Rental) {
    this.carToRent = carToRent;
  }

}
