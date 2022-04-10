import { Injectable, Inject, Optional } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { JWTTokenService } from './jwtToken.service';
import { LocalStorageService } from './localStorage.service';
import { catchError } from 'rxjs/operators';
import {throwError} from "rxjs";
import {ApiService} from "./apiService.service";

@Injectable()
export class UniversalAppInterceptor implements HttpInterceptor {

  constructor( private jwtTokenService: JWTTokenService ,
               private localStorage : LocalStorageService,
               private api : ApiService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.localStorage.get('access_token');
    if(token){
      req = req.clone({
        url:  req.url,
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(req).pipe(
      catchError((error) => {
        console.log(error.status)
        if (error.status == 401){
          console.log("Token expired")
        }
        alert(error.status + "  " + error.error.detail)
        return throwError(error.message);
      }))
  }
}
