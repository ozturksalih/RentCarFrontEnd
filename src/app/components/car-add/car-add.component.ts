import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Color } from 'src/app/models/color';
import { Brand } from 'src/app/models/brand';

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
  carUpdateForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private toastrService: ToastrService

  ) { }

  ngOnInit(): void {
    this.getAll();
    this.createBrandUpdateForm();
  }

  createBrandUpdateForm() {
    this.carUpdateForm = this.formBuilder.group({
      brandName: ["", Validators.required],
      description: ["", Validators.required],
      modelYear: ["", Validators.required],
      colorName: ["", Validators.required],
      dailyPrice: ["", Validators.required]
    })
  }

  getAll() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data
    })
  }
  delete(carId: number) {
    console.log(carId);
  }
  getByCarId(carId: number) {
    this.carService.getCarByCarId(carId).subscribe((response) => {
      this.car = response.data[0];
    })
  }
  updateCar() {

  }
  update(car: Car) {

  }
  // updateCar(car: Car) {
  //   this.carService.updateCar(car).subscribe((response) => {
  //     this.toastrService.success(response.message, "Succed");
  //   },
  //     (responseError) => {
  //       this.toastrService.error("Error");
  //     })
  // }

}
