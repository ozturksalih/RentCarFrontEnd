import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { CarImage } from 'src/app/models/carImage';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars: Car[] = []
  dataLoaded = false;
  images: CarImage[] = [];
  carFilter = "";
  baseImagePath = environment.baseUrl;
  constructor(private carService: CarService, private imageService: CarImageService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      console.log(params);
      if (params["brandId"] && params["colorId"]) {
        this.getImages();
        this.getCarsByBrandAndColor(params["brandId"], params["colorId"]);
      }
      else if (params["brandId"]) {
        this.getImages();
        return this.getCarsByBrand(params["brandId"]);

      }
      else if (params["colorId"]) {
        this.getImages();
        return this.getCarsByColor(params["colorId"]);
      }

      else {
        this.getImages();
        this.getCars();
      }
    })
  }


  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = response.success;
    });
  }
  getImagesByCar(carId: number) {
    for (let i = 0; i < this.images.length; i++) {
      if (this.images[i].carId == carId) {
        return this.images[i].imagePath;
      }

    }
    return "default.jpg";
  }
  getImages() {
    this.imageService.getImages().subscribe((response) => {
      this.images = response.data;
    });
  }
  getCarsByBrandAndColor(brandId: number, colorId: number) {
    this.carService.getCarsByBrandAndColor(brandId, colorId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = response.success;
    })
  }
  getCarsByColor(colorId: number) {
    this.carService.getCarsByColor(colorId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    })
  }

  getCarsByBrand(brandId: number) {
    this.carService.getCarsByBrand(brandId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

}
