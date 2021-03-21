import { Component, OnInit } from '@angular/core';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';

@Component({
  selector: 'app-car-image',
  templateUrl: './car-image.component.html',
  styleUrls: ['./car-image.component.css']
})
export class CarImageComponent implements OnInit {

  images: CarImage[] = [];
  dataLoaded = false;
  constructor(private imageService: CarImageService) { }

  ngOnInit(): void {
    this.getImages();
  }
  getImages() {
    this.imageService.getImages().subscribe((response) => {
      this.images = response.data;
      this.dataLoaded = true;
    })
  }
  getImagesByCar(carId: number) {
    this.imageService.getImagesByCar(carId).subscribe((response) => {
      this.images = response.data;
    })
  }


}
