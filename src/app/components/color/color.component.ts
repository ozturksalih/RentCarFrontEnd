import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
import { Filters } from 'src/app/models/filters';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {

  allColors?: Color;
  currentColor: Color;
  colors: Color[] = []
  dataLoaded = false;


  constructor(private colorService: ColorService) { }

  ngOnInit(): void {
    this.getColors();
  }

  getColors() {
    this.colorService.getColors().subscribe(
      (response) => {
        this.colors = response.data;
        this.dataLoaded = true;
      })
  }

  setCurrentColor() {
    this.currentColor !== undefined
      ? (Filters.colorId = this.currentColor.colorId)
      : (Filters.colorId = undefined);
  }
  allColorSelected() {
    return this.currentColor == undefined ? true : false;
  }


}
