import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Color } from 'src/app/models/color';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  cars: Car[] = [];
  space = " ";
  car: Car;
  colors: Color[] = [];
  brands: Brand[] = [];
  carEditForm: FormGroup;
  dataLoaded = false;

  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private toastrService: ToastrService,
    private brandService: BrandService,
    private colorService: ColorService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.createCarUpdateForm();
    this.getAll();
    this.getBrands();
    this.getColors();
  }

  createCarUpdateForm() {
    this.carEditForm = this.formBuilder.group({
      carId: [""],
      brandId: ["", Validators.required],
      colorId: ["", Validators.required],
      modelYear: ["", Validators.required],
      description: ["", Validators.required],
      dailyPrice: ["", Validators.required],

    });
  }

  getAll() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data,
        this.dataLoaded = true
    })
  }

  getByCarId(carId: number) {
    this.carService.getCarByCarId(carId).subscribe((response) => {
      this.car = response.data[0];
    })
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    }, (responseError) => {
      this.toastrService.error("Couldn't get brands");
    })
  }
  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;

    }, (responseError) => {
      this.toastrService.error("Couldn't get colors");
    })
  }
  getUpdateModel(car: Car) {
    this.carEditForm.setValue({
      carId: car.carId,
      colorId: car.colorId,
      brandId: car.brandId,
      modelYear: car.modelYear,
      description: car.description,
      dailyPrice: car.dailyPrice,
    });
  }
  updateCar() {
    if (this.carEditForm.valid) {
      let carModel = Object.assign({}, this.carEditForm.value);
      this.convertStrToInt(carModel);
      console.log(carModel);
      this.carService.updateCar(carModel).subscribe((response) => {
        this.toastrService.success(response.message, "Succed");
      },
        (responseError) => {
          console.log(responseError);
          this.toastrService.error("api error");
        })
    } else {
      this.toastrService.error("Form Error");
    }

  }


  convertStrToInt(carToEdit: Car) {
    carToEdit.brandId = parseInt(this.carEditForm.controls['brandId'].value);
    carToEdit.colorId = parseInt(this.carEditForm.controls['colorId'].value);
    return carToEdit;
  }

  addCar() {
    if (this.carEditForm.valid) {
      this.carEditForm.removeControl("carId");
      let carModel = Object.assign({}, this.carEditForm.value);
      this.convertStrToInt(carModel);
      this.carService.addCar(carModel).subscribe((response) => {
        this.toastrService.success(response.message);
        this.carEditForm.reset();
        location.reload();

      }, (responseError) => {
        this.toastrService.error("api error");
      })
    } else {
      this.toastrService.error("Fill the form!", "Form Error");
    }
  }
  delete() {
    let carModel = Object.assign({}, this.carEditForm.value);
    this.carService.delete(carModel).subscribe((response) => {
      this.toastrService.success(response.message);
      this.carEditForm.reset();
      location.reload();
    }, (responseError) => {
      this.toastrService.error("Api error");
    })
  }

}
