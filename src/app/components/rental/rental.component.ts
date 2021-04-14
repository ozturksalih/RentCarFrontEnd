import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

  dataLoaded = false;
  carDetail: Car;
  rentalDetail: Rental;
  constructor(
    private rentalService: RentalService,
    private carService: CarService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      console.log(params);
      if (params["carId"]) {
        this.getCarById(params["carId"]);
      }
    })
    this.getRentalDetail();

  }

  getRentalDetail() {
    this.rentalDetail = this.rentalService.carToRent;
  }

  getCarById(carId: number) {
    this.carService.getCarByCarId(carId).subscribe((response) => {
      this.carDetail = response.data[0];
      this.dataLoaded = true;
    })
  }

}
