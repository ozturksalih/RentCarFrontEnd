import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BrandService } from 'src/app/services/brand.service';
import { Brand } from 'src/app/models/brand';
import { ColorService } from 'src/app/services/color.service';
import { Color } from 'src/app/models/color';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  car: Car;
  brands: Brand[];
  colors: Color[];
  carImages: CarImage[] = [];
  dataLoaded = false;

  carUpdateForm: FormGroup;



  constructor(
    private activatedRoute: ActivatedRoute,
    private carService: CarService,
    private imageService: CarImageService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private brandService: BrandService,
    private colorService: ColorService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params["carId"]) {
        this.getCarByCarId(params["carId"]);
        this.getCarImages(params["carId"]);
        this.createCarUpdateForm();
        this.getBrands();
        this.getColors();
      }
    })
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    })
  }
  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    })
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

  updateCar(car: Car) {
    this.carService.updateCar(car).subscribe((response) => {
      this.toastrService.success(response.message, "Succed")
    }, (responseError) => {
      this.toastrService.error("Error");
    })
  }
  createCarUpdateForm() {
    this.carUpdateForm = this.formBuilder.group({
      brandId: ["", Validators.required],
      colorId: ["", Validators.required],
      description: ["", Validators.required],
      modelYear: ["", Validators.required],
      dailyPrice: ["", Validators.required]
    })
  }

  update() {
    if (this.carUpdateForm.valid) {
      let carModel = Object.assign({}, this.carUpdateForm.value);
      this.carService.updateCar(carModel).subscribe((response) => {
        this.toastrService.success(response.message, "Succed");
      }, (responseError) => {
        this.toastrService.error("hata");
      })
    } else {
      this.toastrService.error("Form Error")
    }
  }

}
