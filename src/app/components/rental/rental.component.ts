import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';
import { CarDetailComponent } from '../car-detail/car-detail.component';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

  dataLoaded = false;
  carDetail: Car[] = [];
  carToRent: Rental;
  rentDate = Date;
  returnDate = Date;
  rentals: Rental[] = [];
  givenFullDate = false;
  constructor(
    private rentalService: RentalService,
    private carDetailComp: CarDetailComponent,
    private carService: CarService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      console.log(params);
      if (params["carId"]) {
        this.getCarById(params["carId"]);
      }
    })

  }
  getCarById(carId: number) {
    this.carService.getCarByCarId(carId).subscribe((response) => {
      this.carDetail = response.data;
      this.dataLoaded = true;
    })
  }
  checkRental() {

  }
  setRental() {

  }
  getRentalDetail() {
    this.carToRent = this.rentalService.carToRent;
  }
  calculateDifference() {
    if (this.rentDate && this.returnDate) {
      let returnDate = new Date(this.returnDate.toString())
      let rentDate = new Date(this.rentDate.toString())
      let endDay = Number.parseInt(returnDate.getDate().toString())
      let endMonth = Number.parseInt(returnDate.getMonth().toString())
      let endYear = Number.parseInt(returnDate.getFullYear().toString())
      let startDay = Number.parseInt(rentDate.getDate().toString())
      let startMonth = Number.parseInt(rentDate.getMonth().toString())
      let startYear = Number.parseInt(rentDate.getFullYear().toString())
      let result = ((endDay - startDay) + ((endMonth - startMonth) * 30) + ((endYear - startYear) * 365));
      console.log(result);
      this.givenFullDate = true;
      return result;
    }
    console.log(0);
    return 0;




  }
}
