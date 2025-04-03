import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from 'src/app/core/services/products.service';
import { Product } from 'src/app/core/interfaces/product';
import { RouterLink } from '@angular/router';
import { CuttextPipe } from 'src/app/core/pipes/cuttext.pipe';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/core/services/cart.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchPipe } from 'src/app/core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { WishlistService } from 'src/app/core/services/wishlist.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    CuttextPipe,
    NgxPaginationModule,
    SearchPipe,
    FormsModule,
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  constructor(
    private _ProductsService: ProductsService,
    private _Renderer2: Renderer2,
    private _ToastrService: ToastrService,
    private _CartService: CartService,
    private _WishlistService: WishlistService
  ) {}
  searchTerm: string = '';
  products: Product[] = [];
  wishlist: string[] = [];
  pageSize: number = 0;
  page: number = 1;
  total: number = 0;
  display: boolean = false;
  ngOnInit(): void {
    this.displayProducts(1);
    this.loadWishlist();
  }

  displayProducts(event: number): void {
    this._ProductsService.getProducts(event).subscribe({
      next: (response) => {
        this.display = true;
        this.products = response.data;
        this.pageSize = response.metadata.limit;
        this.page = response.metadata.currentPage;
        this.total = response.results;
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
  pageChanged(event: any): void {
    this.display = false;
    this.displayProducts(event);
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
