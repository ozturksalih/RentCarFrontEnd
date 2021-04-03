import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {

  colorEditForm: FormGroup;
  colors: Color[] = [];
  dataLoaded = false;
  space = " ";

  constructor(
    private formBuilder: FormBuilder,
    private colorService: ColorService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.createColorEditForm();
    this.getColors();
  }

  getColors() {
    this.colorService.getColors().subscribe(
      (response) => {
        this.colors = response.data;
        this.dataLoaded = true;
      }
    )
  }
  createColorEditForm() {
    this.colorEditForm = this.formBuilder.group({
      colorId: [""],
      colorName: ["", Validators.required]
    })
  }
  getUpdateModal(color: Color) {
    this.colorEditForm.setValue({
      colorId: color.colorId,
      colorName: color.colorName
    })
  }
  updateColor() {
    if (this.colorEditForm.valid) {
      let colorModel = Object.assign({}, this.colorEditForm.value);
      console.log(colorModel);
      this.colorService.update(colorModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, "Succedd");
        }, (responseError) => {
          this.toastrService.error("Api Error")
        }
      )
    } else {
      this.toastrService.error("Form Error");
    }
  }
  add() {
    if (this.colorEditForm.valid) {
      this.colorEditForm.removeControl("colorId");
      let colorModel = Object.assign({}, this.colorEditForm.value);
      this.colorService.add(colorModel).subscribe((response) => {
        this.toastrService.success(response.message, "Succed")
      }, (responseError) => {
        console.log(responseError);
        if (responseError.error.message && responseError.error.message.length > 0) {
          this.toastrService.error(responseError.error.message);
        }
        else if (responseError.error.Errors.length > 0 && responseError.error.Errors[0].ErrorMessage) {

          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage, "ValidationFailure");
          }
        }
      });
    } else {
      this.toastrService.error("There is missing item in the form", "Error!")
    }
  }

}
