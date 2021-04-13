import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarUpdateComponent } from './components/admin-settings/car/car-update/car-update.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandComponent } from './components/brand/brand.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { LoginComponent } from './components/login/login.component';
import { RentalComponent } from './components/rental/rental.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: "", pathMatch: "full", component: CarComponent },
  { path: "cars", component: CarComponent },
  { path: "cars/add", component: CarAddComponent, canActivate: [LoginGuard] },
  { path: "register", component: SignupComponent },
  { path: "cars/brand/:brandId", component: CarComponent },
  { path: "cars/color/:colorId", component: CarComponent },
  { path: "cars/update/:carId", component: CarUpdateComponent },
  { path: "brands/add", component: BrandAddComponent },
  { path: "colors/add", component: ColorAddComponent },
  { path: "cars/brand/:brandId/color/:colorId", component: CarComponent },
  { path: "login", component: LoginComponent },
  { path: "cars/cardetail/:carId", component: CarDetailComponent },
  { path: "rentals/rent/:carId", component: RentalComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
