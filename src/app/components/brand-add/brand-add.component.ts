import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {

  brandEditForm: FormGroup;
  brands: Brand[] = [];
  dataLoaded = false;
  space = " ";

  constructor(
    private formBuilder: FormBuilder,
    private brandService: BrandService,
    private toastrService: ToastrService

  ) { }

  ngOnInit(): void {
    this.createBrandAddForm();
    this.getBrands();
  }
  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
      this.dataLoaded = true;
    })
  }
  updateBrand() {
    if (this.brandEditForm.valid) {
      let brandModel = Object.assign({}, this.brandEditForm.value);
      console.log(brandModel);
      this.brandService.update(brandModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, "Succeed")
        },
        (responseError) => {
          this.toastrService.error("Api Error");
        }
      )
    } else {
      this.toastrService.error("Form Error");
    }
  }
  getUpdateModel(brand: Brand) {
    this.brandEditForm.setValue({
      brandId: brand.brandId,
      brandName: brand.brandName
    })

  }

  createBrandAddForm() {
    this.brandEditForm = this.formBuilder.group({
      brandId: [""],
      brandName: ["", Validators.required]
    })
  }
  add() {
    if (this.brandEditForm.valid) {
      this.brandEditForm.removeControl("brandId");
      let brandModel = Object.assign({}, this.brandEditForm.value);
      console.log(brandModel);
      this.brandService.add(brandModel).subscribe((response) => {
        this.toastrService.success(response.message, "Succeed");
      },

        (responseError) => {


          if (responseError.error.message && responseError.error.message.length > 0) {
            this.toastrService.error(responseError.error.message);

          }

          else if (responseError.error.Errors.length > 0 && responseError.error.Errors[0].ErrorMessage) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(responseError.error.Errors[i].ErrorMessage, "Validation Failure");

            }

          }
        });

    } else {
      this.toastrService.error("There is a missing item in the form.", "Error!");
    }


  }

}
