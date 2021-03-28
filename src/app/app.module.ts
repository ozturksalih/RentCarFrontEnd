import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CarComponent } from './components/car/car.component';
import { RentalComponent } from './components/rental/rental.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { NaviComponent } from './components/navi/navi.component';
import { BrandComponent } from './components/brand/brand.component';
import { CarImageComponent } from './components/car-image/car-image.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { FilterBrandPipe } from './pipes/filter-brand.pipe';
import { FilterColorPipe } from './pipes/filter-color.pipe';
import { DateComponent } from './components/date/date.component';
import { PaymentComponent } from './components/payment/payment.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    RentalComponent,
    ColorComponent,
    CustomerComponent,
    NaviComponent,
    BrandComponent,
    CarImageComponent,
    CarDetailComponent,
    FilterBrandPipe,
    FilterColorPipe,
    DateComponent,
    PaymentComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [RentalComponent, CarDetailComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
