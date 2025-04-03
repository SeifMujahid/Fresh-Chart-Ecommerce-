import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _CartService: CartService
  ) {}
  send: boolean = false;
  cartID: string | null = '';
  url: string = 'http://localhost:4200';

  paymentForm: FormGroup = new FormGroup({
    details: new FormControl(''),
    phone: new FormControl(''),
    city: new FormControl(''),
  });

  ngOnInit(): void {
    this.getCartID();
  }

  getCartID(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (data) => {
        this.cartID = data.get('cartID');
      },
    });
  }

  handelForm(): void {
    this.send = true;
    this._CartService
      .payment(this.cartID, this.url, this.paymentForm.value)
      .subscribe({
        next: (response) => {
          if (response.status == 'success') {
            window.open(response.session.url, '_self');
          }
        },
        error: (err) => {
          console.log(err.error.status);
          this.send = false;
        },
      });
  }
}
