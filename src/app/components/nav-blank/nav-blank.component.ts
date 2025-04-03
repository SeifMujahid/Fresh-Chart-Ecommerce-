import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { WishlistService } from 'src/app/core/services/wishlist.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.scss'],
})
export class NavBlankComponent implements OnInit {
  constructor(
    private _Router: Router,
    private _CartService: CartService,
    private _Renderer2: Renderer2,
    private _WishlistService: WishlistService
  ) {}

  @ViewChild('navBar') navBarEle!: ElementRef;
  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (window.scrollY > window.innerHeight) {
      this._Renderer2.addClass(this.navBarEle.nativeElement, 'shadow');
    } else {
      this._Renderer2.removeClass(this.navBarEle.nativeElement, 'shadow');
    }
  }

  cartNum: number = 0;
  wishCount: number = 0;

  ngOnInit(): void {
    this.getCartNumder();
    this.getWishCount();
    this.updateCartNumber();
    this.updateWichCount();
  }

  getCartNumder(): void {
    this._CartService.getUserCart().subscribe({
      next: (response) => {
        this.cartNum = response.numOfCartItems;
      },
      error: (err) => {
        console.log(err.error.message);
      },
    });
  }

  getWishCount(): void {
    this._WishlistService.displayWishList().subscribe({
      next: (response) => {
        this.wishCount = response.data.length;
      },
      error: (err) => {
        console.log(err.error.message);
      },
    });
  }
  
  updateCartNumber(): void {
    this._CartService.cartNumber.subscribe({
      next: (data) => {
        this.cartNum = data;
      },
      error: () => {
        console.log('Error In Cart Number');
      },
    });
  }

  updateWichCount(): void {
    this._WishlistService.listCount.subscribe({
      next: (data) => {
        this.wishCount = data;
      },
      error: () => {
        console.log('Error In Wish Number');
      },
    });
  }

  signOut(): void {
    localStorage.removeItem('eToken');
    this._Router.navigate(['/login']);
  }
}
