import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import * as moment from 'moment';
import {LocalStorageService} from "./localStorage.service";
import {throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class JWTTokenService {

  jwtToken: string = '';
  decodedToken: { [key: string]: string; } = {};

  constructor( private localStorage : LocalStorageService ,) { }

  setToken(token: string) {
    if (token) {
      this.jwtToken = token;
    }
  }

  setTokenFromLocalStorage() {
      const localToken = this.localStorage.get('access_token');
      if (localToken) {
        this.jwtToken = localToken;
      }else{
        throw Error("Warning : No token found");
      }
  }

  decodeToken() {
    if (this.jwtToken) {
      this.decodedToken = jwt_decode(this.jwtToken);
    } else{
      this.setTokenFromLocalStorage()
      this.decodedToken = jwt_decode(this.jwtToken);
    }
  }

  getDecodeToken() {
    return jwt_decode(this.jwtToken);
  }

  getUser() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken.displayname : null;
  }

  getUserId() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken.user_id : null;
  }


  getEmailId() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken.email : null;
  }

  getExpiryTime() {
    this.decodeToken();
    const expiration = this.decodedToken ? this.decodedToken.exp : null;
    if (expiration != null) {
      const date = new Date(0);
      date.setUTCSeconds(Number(expiration));
      return moment(date).format();
    }else{
      return ''
    }
  }

  isTokenExpired(): boolean {
    this.decodeToken();
    if(this.jwtToken){
      return moment().isAfter(this.getExpiryTime());
    }else{
      return false
    }
  }
}
