import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from 'src/app/core/services/products.service';
import { Category, Product } from 'src/app/core/interfaces/product';
import { CuttextPipe } from 'src/app/core/pipes/cuttext.pipe';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';

import { ToastrService } from 'ngx-toastr';
import { SearchPipe } from 'src/app/core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { WishlistService } from 'src/app/core/services/wishlist.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CuttextPipe,
    CarouselModule,
    RouterLink,
    SearchPipe,
    FormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private _ProductsService: ProductsService,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _Renderer2: Renderer2,
    private _WishlistService: WishlistService
  ) {}

  searchTerm: string = '';
  products: Product[] = [];
  categories: Category[] = [];
  wishlist: string[] = [];

  sliderOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    autoplayTimeout: 2000,
    autoplaySpeed: 1000,
    navText: ['', ''],
    items: 1,
    nav: false,
  };

  categoriesOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 200,
    autoplaySpeed: 1000,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 4,
      },
      940: {
        items: 6,
      },
    },
    nav: false,
  };

  ngOnInit(): void {
    this.displayCategories();
    this.displayProducts();
    this.loadWishlist();
  }

  displayCategories(): void {
    this._ProductsService.getCaegories().subscribe({
      next: (response) => {
        this.categories = response.data;
      },
      error: (err) => {
        console.log(err.error.message);
      },
    });
  }

  displayProducts(): void {
    this._ProductsService.getProducts().subscribe({
      next: (response) => {
        this.products = response.data;
      },
      error: (err) => {
        console.log(err.error.message);
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

  loadWishlist() {
    this._WishlistService.displayWishList().subscribe({
      next: (response) => {
        this.wishlist = response.data.map((product: any) => product._id);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addToFav(productID: string): void {
    this._WishlistService.addToWishList(productID).subscribe({
      next: (response) => {
        this.showSuccess(response.message);
        this.wishlist = response.data;
        this._WishlistService.listCount.next(response.data.length);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  removeFromWishList(productID: string): void {
    this._WishlistService.removeItem(productID).subscribe({
      next: (response) => {
        this.showSuccess(response.message);
        this.wishlist = response.data;
        this._WishlistService.listCount.next(response.data.length);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
