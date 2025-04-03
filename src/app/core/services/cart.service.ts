import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private _HttpClient: HttpClient) {}

  cartNumber: BehaviorSubject<number> = new BehaviorSubject(0);

  addToCart(productID: string): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      { productId: productID }
    );
  }

  getUserCart(): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/cart`);
  }

  removeCartItem(productID: string): Observable<any> {
    return this._HttpClient.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${productID}`
    );
  }

  updateCartItem(productID: string, newCount: number): Observable<any> {
    return this._HttpClient.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${productID}`,
      {
        count: newCount,
      }
    );
  }

  clearCart(): Observable<any> {
    return this._HttpClient.delete(
      `https://ecommerce.routemisr.com/api/v1/cart`
    );
  }

  payment(
    cartID: string | null,
    url: string,
    userInfo: object
  ): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartID}?url=${url}`,
      {
        shippingAddress: userInfo,
      }
    );
  }
}
