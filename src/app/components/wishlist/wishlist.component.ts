import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistService } from 'src/app/core/services/wishlist.service';
import { Product } from 'src/app/core/interfaces/product';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/core/services/cart.service';
import { RouterLink } from '@angular/router';
import { CuttextPipe } from 'src/app/core/pipes/cuttext.pipe';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterLink, CuttextPipe],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit {
  constructor(
    private _WishlistService: WishlistService,
    private _ToastrService: ToastrService,
    private _Renderer2: Renderer2,
    private _CartService: CartService
  ) {}
  products: Product[] = [];
  display: boolean = false;

  ngOnInit(): void {
    this.displayWish();
  }

  displayWish(): void {
    this._WishlistService.displayWishList().subscribe({
      next: (response) => {
        this.display = true;
        this.products = response.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  showSuccess(message: string) {
    this._ToastrService.success(message);
  }

  add(productID: string, added: HTMLButtonElement): void {
    this._Renderer2.setAttribute(added, 'disabled', 'true');
    this._CartService.addToCart(productID).subscribe({
      next: (response) => {
        this.showSuccess(response.message);
        this._CartService.cartNumber.next(response.numOfCartItems);
        this._Renderer2.removeAttribute(added, 'disabled');
      },
      error: (err) => {
        console.log(err.error.message);
        this._Renderer2.removeAttribute(added, 'disabled');
      },
    });
  }

  removeFromWishList(itemID: string): void {
    this._WishlistService.removeItem(itemID).subscribe({
      next: (response) => {
        this.products = this.products.filter(
          (product) => product._id != itemID
        );
        this._WishlistService.listCount.next(response.data.length);
        this.showSuccess(response.message);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
