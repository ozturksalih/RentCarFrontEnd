import { Component, OnInit } from '@angular/core';
import { Payment } from 'src/app/models/payment';
import { PaymentService } from 'src/app/services/payment.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { RentalService } from 'src/app/services/rental.service';
import { Rental } from 'src/app/models/rental';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  paymentForm: FormGroup;
  rentalPrice: Rental;
  carToRent = this.rentalService.carToRent;

  constructor(
    private paymentService: PaymentService,
    private formBuilder: FormBuilder,
    private rentalService: RentalService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.createPaymentForm();
  }

  addRental() {
    this.rentalService.addRental(this.carToRent).subscribe((response) => {

    }, (responseError) => {
      this.toastrService.error("Couldn't send data to rental service!");
    })
  }
  createPaymentForm() {
    this.paymentForm = this.formBuilder.group({
      cardHoldersName: ['', Validators.required],
      cardNumber: ['', Validators.required],
      cardExpiryDate: ['', Validators.required],
      cardCVV: ['', Validators.required],
      paymentAmount: ['', Validators.required]
    })
  }

  pay() {
    let paymentWithoutAmount = Object.assign({}, this.paymentForm.value);

    this.paymentForm.setValue({
      cardHoldersName: paymentWithoutAmount.cardHoldersName,
      cardNumber: paymentWithoutAmount.cardNumber,
      cardExpiryDate: paymentWithoutAmount.cardExpiryDate,
      cardCVV: paymentWithoutAmount.cardCVV,
      paymentAmount: this.rentalService.carToRent.totalPrice
    })
    if (this.paymentForm.valid) {
      let paymentModel = Object.assign({}, this.paymentForm.value);
      this.paymentService.pay(paymentModel).subscribe((response) => {
        this.toastrService.success("Thanks for using our services!");
        this.addRental();
      })
    } else {
      this.toastrService.error("Please fill all of the blanks");
    }

  }
}
