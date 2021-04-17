import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { RentalDto } from 'src/app/models/rentalDto';
import { User } from 'src/app/models/user';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-myrentals',
  templateUrl: './myrentals.component.html',
  styleUrls: ['./myrentals.component.css']
})
export class MyrentalsComponent implements OnInit {

  user: User;
  dataLoaded = false;
  customerLoaded = false;
  customers: Customer[];
  myRentals: RentalDto[] = [];

  constructor(
    private userService: UserService,
    private customerService: CustomerService,
    private rentalService: RentalService

  ) { }

  ngOnInit(): void {
    this.getUser();

  }

  getAll() {
    this.getCustomer();
    this.getMyRentals();
  }

  getUser() {
    let email = localStorage.getItem("email");
    if (email == null) {
      return;
    }

    this.userService.getByMail(email).subscribe(
      (response) => {
        this.user = response.data;
        this.getAll();
      })
  }

  getCustomer() {

    this.customerService.getByUserId(this.user.id).subscribe(
      (response) => {
        this.customers = response.data;
        this.customerLoaded = true;

      }
    )
  }

  getMyRentals() {
    setTimeout(() => {
      if (this.customerLoaded == true) {

        this.rentalService.getRentalDetailByCustomerId(this.customers[0].id).subscribe(
          (response) => {
            this.myRentals = response.data;
            this.dataLoaded = true;
          }
        )
      }
    }, 1000)


  }

}
