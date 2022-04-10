import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {JWTTokenService} from "./jwtToken.service";
import {SocialAuthService} from "angularx-social-login";
import {LocalStorageService} from "./localStorage.service";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://onboardme-beta.celcom.com.my/api/';

  constructor(private http : HttpClient) { }

  private get(url : string) : any{
    try{
      return this.http.get<any>(url)
    }catch (error){
      alert("Invalid. Please refresh page.")
      throw Error("Invalid GET")
    }
  }

  getSelfBucketList(email : string): any {
    const url = this.baseUrl+'bucket-lists/'+email;
    return this.get(url)
  }

  getAllBucketList(): any {
    const url = this.baseUrl+'bucket-lists';
    return this.http.get<any>(url)
  }

  updateSelfBucketList(email : string , body:any): any {
    const url = this.baseUrl+'bucket-lists/'+email;
    return this.http.put(url , {bucketItems: body})
  }

  deleteSelfBucketList(email : string): any {
    const url = this.baseUrl+'bucket-lists/'+email;
    return this.http.delete(url)
  }

  createSelfBucketList(email : string , body:any): any {
    const url = this.baseUrl+'bucket-lists/';
    return this.http.post(url , { email : email, bucketItems: body})
  }
}
