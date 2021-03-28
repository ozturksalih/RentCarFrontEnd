import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { Rental } from 'src/app/models/rental';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  car: Car;
  day: number;
  rentDate = Date;
  returnDate = Date;
  givenFullDate = false;

  TotalPrice: number;

  baseImagePath = environment.baseUrl;
  path = "https://localhost:44314/api/carimages/";
  carImages: CarImage[] = [];


  constructor(
    private carService: CarService,
    private imageService: CarImageService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private router: Router,
    private rentalService: RentalService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      console.log(params);
      if (params["carId"]) {
        this.getCarByCarId(params["carId"]);
        this.getCarImages(params["carId"]);
      }
    })

  }
  getCarByCarId(carId: number) {
    this.carService.getCarByCarId(carId).subscribe((response) => {
      this.car = response.data[0];
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
      this.givenFullDate = true;
      if (result <= 0) {
        return 0;
      }
      return result;
    }
    return 0;
  }

  checkDates() {
    if (!this.givenFullDate) {
      this.toastrService.warning("Please enter Rent and Return Dates!");
      return;
    }
    else if (this.returnDate < this.rentDate) {
      this.toastrService.error("The return date cannot be before the rent date");
      return;
    }
  }

  checkParameters() {

    if (!this.givenFullDate) {
      this.toastrService.warning("Please enter Rent and Return Dates!");
      return;
    }
    else if (this.returnDate < this.rentDate) {
      this.toastrService.error("The return date cannot be before the rent date");
      return;
    } else if (this.returnDate === this.rentDate) {
      this.toastrService.error("The return date and rent date cannot be same day");
      return;
    } else {
      this.toastrService.info('Bilgileriniz kontrol ediliyor.');
      // let carToRent: Rental = {
      //   carId: this.car.carId,
      //   rentDate: this.rentDate,
      //   returnDate: this.returnDate
      // }
      // if (this.rentalService.checkAvailability(carToRent)) {
      //   this.toastrService.success("You were redirected to the payment page.");
      //   this.rentalService.setRental(carToRent);
      //   this.router.navigate(["/rentals/rent/", this.car.carId]);

      // } else {
      //   this.toastrService.warning("The car is not available on the days you choose");
      // }






    }

  }


  // getDiffBetweenDays(x: Date, y: Date) {
  //   console.log(x);
  //   console.log(y);

  //   return Math.round((y.getTime() - x.getTime()) / (1000 * 60 * 60 * 24));


  // }
  // parse a date in yyyy-mm-dd format
  // parseDate(input: string) {
  // var parts = input.match(/(\d+)/g);
  // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
  // return new Date(parts[0], parts[1] - 1, parts[2]); // months are 0-based
  // }


}
