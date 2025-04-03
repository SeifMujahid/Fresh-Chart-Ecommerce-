import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from 'src/app/core/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { Details } from 'src/app/core/interfaces/details';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-productdetails',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.scss'],
})
export class ProductdetailsComponent implements OnInit {
  constructor(
    private _ProductsService: ProductsService,
    private _ActivatedRoute: ActivatedRoute,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _Renderer2: Renderer2
  ) {}

  productId: string | null = '';
  productDetails: Details = {} as Details;
  display: boolean = false;
  detailsOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 200,
    autoplaySpeed: 1000,
    navText: ['', ''],
    items: 1,
    nav: false,
  };

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.productId = params.get('productID');
      },
    });
    this._ProductsService.getSpecificProduct(this.productId).subscribe({
      next: (response) => {
        this.display = true;
        this.productDetails = response.data;
      },
      error: (err) => {},
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
}
