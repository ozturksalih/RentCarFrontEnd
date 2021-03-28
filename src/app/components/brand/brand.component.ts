import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { Filters } from 'src/app/models/filters';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  brands: Brand[] = [];

  allBrand?: Brand;
  currentBrand?: Brand;
  dataLoaded = false;

  constructor(private brandService: BrandService) { }

  ngOnInit(): void {
    this.getBrands();
  }
  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
      this.dataLoaded = true;
    });
  }
  setCurrentBrand() {
    this.currentBrand !== undefined
      ? (Filters.brandId = this.currentBrand.brandId)
      : (Filters.brandId = undefined);
  }

  allBrandSelected() {
    return this.currentBrand == undefined ? true : false;
  }

}
