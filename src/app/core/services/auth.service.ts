import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _HttpClient: HttpClient) {}
  uaserInfo: any;
  register(userData: any): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/auth/signup`,
      userData
    );
  }
  login(userData: any): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/auth/signin`,
      userData
    );
  }
  decodeToken(): void {
    const encodeT = localStorage.getItem('eToken');
    if (encodeT != null) {
      const decodeT = jwtDecode(encodeT);
      this.uaserInfo = decodeT;
    }
  }

  forgetPass(forgetData: object): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
      forgetData
    );
  }
  resetCode(resetCodeData: object): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
      resetCodeData
    );
  }
  resetPass(resetPassData:object):Observable<any>{
    return this._HttpClient.put(
      `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
      resetPassData
    );
  }
}
