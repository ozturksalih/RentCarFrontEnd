import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  car: Car;
  rentDate: Date;
  returnDate: Date;
  day: number;
  baseImagePath = environment.baseUrl;
  path = "https://localhost:44314/api/carimages/";
  carImages: CarImage[] = [];
  constructor(private carService: CarService,
    private imageService: CarImageService,
    private activatedRoute: ActivatedRoute) { }

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
