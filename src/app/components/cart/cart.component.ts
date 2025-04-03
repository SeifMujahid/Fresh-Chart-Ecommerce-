import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from 'src/app/core/services/cart.service';
import { Cartproduct } from 'src/app/core/interfaces/cartproduct';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  constructor(
    private _CartService: CartService,
    private _Renderer2: Renderer2
  ) {}
  display: boolean = false;
  userCart: Cartproduct = {} as Cartproduct;

  ngOnInit(): void {
    this.displayCart();
  }

  displayCart(): void {
    this._CartService.getUserCart().subscribe({
      next: (response) => {
        this.display = true;
        this.userCart = response.data;
      },
      error: (err) => {
        console.log(err.error.message);
      },
    });
  }

  removeItem(productID: string, remove: HTMLButtonElement): void {
    this._Renderer2.setAttribute(remove, 'disabled', 'true');
    this._CartService.removeCartItem(productID).subscribe({
      next: (response) => {
        this.userCart = response.data;
        this._CartService.cartNumber.next(response.numOfCartItems);
        this._Renderer2.removeAttribute(remove, 'disabled');
      },
      error: (err) => {
        this._Renderer2.removeAttribute(remove, 'disabled');
        console.log(err.error.message);
      },
    });
  }

  updateItem(
    productID: string,
    newCount: number,
    update1: HTMLButtonElement,
    update2: HTMLButtonElement
  ): void {
    this._Renderer2.setAttribute(update1, 'disabled', 'true');
    this._Renderer2.setAttribute(update2, 'disabled', 'true');
    if (newCount >= 1) {
      this._CartService.updateCartItem(productID, newCount).subscribe({
        next: (response) => {
          this.userCart = response.data;
          this._CartService.cartNumber.next(response.numOfCartItems);
          this._Renderer2.removeAttribute(update1, 'disabled');
          this._Renderer2.removeAttribute(update2, 'disabled');
        },
        error: (err) => {
          this._Renderer2.removeAttribute(update1, 'disabled');
          this._Renderer2.removeAttribute(update2, 'disabled');
          console.log(err.error.message);
        },
      });
    } else {
      this._Renderer2.removeAttribute(update1, 'disabled');
      this._Renderer2.removeAttribute(update2, 'disabled');
    }
  }

  clear(clearBtn: HTMLButtonElement): void {
    this._Renderer2.setAttribute(clearBtn, 'disabled', 'true');
    this._CartService.clearCart().subscribe({
      next: (response) => {
        if (response.message == 'success') {
          this.userCart.products.length = 0;
          this._CartService.cartNumber.next(0);
        }
        this._Renderer2.removeAttribute(clearBtn, 'disabled');
      },
      error: (err) => {
        console.log(err.error.message);
      },
    });
  }
}
