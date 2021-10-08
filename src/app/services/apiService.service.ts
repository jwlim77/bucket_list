import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {JWTTokenService} from "./jwtToken.service";
import {SocialAuthService} from "angularx-social-login";
import {LocalStorageService} from "./localStorage.service";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //base URL
  // private baseUrl = 'http://127.0.0.1:8000/';
  // window.location.href
  //production URL
  private baseUrl = 'http://django-env.eba-82dzqpnk.us-west-2.elasticbeanstalk.com/';

  constructor(private http : HttpClient ,
              private jwt : JWTTokenService ,
              private socialAuthService: SocialAuthService,
              private localStorage : LocalStorageService ,) { }

  private validatedGet(url : string) : any{
    try{
      this.jwt.decodeToken()
      return this.http.get<any>(url)
    }catch (error){
      alert("Invalid Token. Please refresh page.")
      throw Error("Invalid Token")
    }
  }

  private validatedPost(url : string , body : any){
    try{
      this.jwt.decodeToken()
      return this.http.post<any>(url , body)
    }catch (error){
      alert("Invalid Token. Please refresh page.")
      throw Error("Invalid Token")
    }
  }

  getSecure(): any {
    const url = this.baseUrl+'api/secure/';
    return this.validatedGet(url)
  }

  checkServer(): any {
    const url = this.baseUrl+'api/checkserver/';
    return this.http.get(url)
  }

  getRecord() : any{
    const url = this.baseUrl+'api/records/';
    return this.validatedGet(url)
  }

  saveRecord(body : any) : any{
    const url = this.baseUrl+'api/records/';
    return this.validatedPost(url , body)
  }

  deleteRecord(id : any) : any{
    const url = this.baseUrl+'api/records/'+id+'/';
    return this.http.delete(url)
  }

  forceLogOut(){
    this.socialAuthService.signOut()
      .catch((error)=>console.log(error))
      .then(()=>{
        this.localStorage.clear()
      })
      .finally(()=>{
        this.refresh()
      })
  }

  loginAPI(token : any){
   return this.http.post<any>(`${this.baseUrl}api/auth/google/`, token)
  }

  refresh(): void {
    window.location.reload();
  }
}
