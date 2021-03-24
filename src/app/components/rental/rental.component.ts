import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { Rental } from 'src/app/models/rental';
import { RentalService } from 'src/app/services/rental.service';
import { CarDetailComponent } from '../car-detail/car-detail.component';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

  dataLoaded = false;
  carDetail: Car;
  rentals: Rental[] = [];
  constructor(private rentalService: RentalService) { }

  ngOnInit(): void {
    this.getRentals();
  }
  getRentals() {
    this.rentalService.getRentals().subscribe((response) => {
      this.rentals = response.data;
      this.dataLoaded = true;
    })
  }
  checkRental() {

  }
  setRental() {

  }


}
