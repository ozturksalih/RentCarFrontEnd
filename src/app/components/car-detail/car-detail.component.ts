declare var $: any;

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Rental } from 'src/app/models/rental';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';
import { environment } from 'src/environments/environment';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/models/customer';



@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  car: Car;
  customer: Customer;
  rentalForm: FormGroup;
  rentalData = false;
  rentals: Rental[];
  dataLoaded = false;
  todayDate = new Date();
  TotalPrice: number;
  rentalModel: Rental;

  baseImagePath = environment.baseUrl;
  path = "https://localhost:44314/api/carimages/";
  carImages: CarImage[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private imageService: CarImageService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private router: Router,
    private rentalService: RentalService,
    private customerService: CustomerService
  ) {

  }



  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {

      if (params["carId"]) {
        this.getCarByCarId(params["carId"]);
        this.getCarImages(params["carId"]);
      }
      this.createRentalForm();

    })
  }



  createRentalForm() {
    this.rentalForm = this.formBuilder.group({
      carId: ['', Validators.required],
      customerId: ['', Validators.required],
      rentDate: ['', Validators.required],
      returnDate: ['', Validators.required]
    })

  }

  checkCarAvailability() {
    let rentDates = Object.assign({}, this.rentalForm.value);
    this.rentalForm.setValue({
      carId: this.car.carId,

      rentDate: rentDates.rentDate,
      returnDate: rentDates.returnDate
    })
    if (this.rentalForm.valid) {
      let difference = this.differenceDates();
      this.toastrService.info("Checking the car availability...");
      if (difference == 0) {
        this.toastrService.warning("Please try other dates")
      } else if (difference >= 0) {
        this.toastrService.info("The total price will " + this.priceCalculator() + " $");
        this.checkAvailability();
      }

    } else {
      this.toastrService.warning("Please enter the dates");
    }
  }

  priceCalculator() {
    return this.differenceDates() * this.car.dailyPrice;
  }

  differenceDates() {
    let dates = Object.assign({}, this.rentalForm.value);
    let rentDate = dates.rentDate;
    let returnDate = dates.returnDate;
    if ((rentDate > returnDate) || (rentDate == returnDate) || (this.todayDate > rentDate)) {
      return 0;
    } else {
      let rent = new Date(rentDate);
      rent.setDate(rent.getDate());
      let retu = new Date(returnDate);
      retu.setDate(retu.getDate());
      return this.dateCalculator(rent, retu);
    }
  }

  dateCalculator(date1: Date, date2: Date) {
    let differenceInTime = date2.getTime() - date1.getTime();
    let differenceInDays = Math.floor((differenceInTime) / (1000 * 3600 * 24));
    return differenceInDays;
  }

  getCarByCarId(carId: number) {
    this.carService.getCarByCarId(carId).subscribe((response) => {
      this.car = response.data[0];
      this.dataLoaded = true;
    })
  }


  getCarImages(carId: number) {
    this.imageService.getImagesByCar(carId).subscribe((response) => {
      this.carImages = response.data;
    });
  }


  getImagePath(carId: number) {
    let newPath = this.path + "getbycar?carId=" + carId;
    return newPath;
  }

  getRentals() {
    this.rentalService.getByCarId(this.car.carId).subscribe((response) => {

      this.rentalData = true,

        this.rentals = response.data

    }, (responseError) => {
      this.toastrService.error("Couldn't get rentals from api!");
    })
  }


  closeModal() {
    $("#datesModel").modal("hide");
  }


  checkAvailability() {
    this.getRentals();

    setTimeout(() => {

      if (this.rentalData) {
        if (this.rentals.length == 0) {
          this.toastrService.success("You're directed to payment page");
          this.directingToPayment();
        } else {
          this.rentals.forEach(element => {
            let dates = this.rentalForm.value;
            if (element.returnDate == null) {
              this.toastrService.warning("The car is not available yet ");
            }
            else if ((dates.rentDate > element.rentDate && dates.returnDate > element.returnDate) || (dates.rentDate < element.rentDate && dates.returnDate < element.returnDate)) {
              this.toastrService.success("You're directed to payment page");
              this.directingToPayment();
            }
            else {
              this.toastrService.warning("Car is not available please select other dates!")
            }
          });
        }
      }
    },
      1000);


  }

  directingToPayment() {

    this.closeModal();
    this.rentalModel = this.rentalForm.value;
    this.rentalModel.carId = this.car.carId;
    this.rentalModel.totalPrice = this.differenceDates() * this.car.dailyPrice;
    this.rentalService.rentalModel = this.rentalModel;
    this.router.navigate(['/rentals/rent/' + this.car.carId]);
  }

}
