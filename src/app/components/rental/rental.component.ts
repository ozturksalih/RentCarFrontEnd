import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { User } from 'src/app/models/user';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

  dataLoaded = false;
  rentalDetailLoaded = false;
  user: User;
  customer: Customer;
  carDetail: Car;
  rentalDetail: Rental;
  constructor(
    private rentalService: RentalService,
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["carId"]) {
        this.getCarById(params["carId"]);
      }
    })

    this.getUser();
    setTimeout(() => {
      this.getCurrentCustomer();
    }, 500);
    setTimeout(() => {
      this.getRentalDetail();
    }, 1000);

  }


  getRentalDetail() {
    this.rentalService.rentalModel.customerId = this.customer.id;
    this.rentalDetail = this.rentalService.rentalModel;
    this.rentalDetailLoaded = true;
  }

  getCarById(carId: number) {
    this.carService.getCarByCarId(carId).subscribe((response) => {
      this.carDetail = response.data[0];
      this.dataLoaded = true;
    })
  }


  getUser() {
    let email = localStorage.getItem("email");
    if (email == null) { return; }
    this.userService.getByMail(email).subscribe((response) => {
      this.user = response.data;
    })
  }


  getCurrentCustomer() {
    if (this.user.id > 0) {
      this.customerService.getByUserId(this.user.id).subscribe((response) => {
        this.customer = response.data[0];
      })
    }

  }

}
