import { Component, OnInit } from '@angular/core';
import {GoogleLoginProvider, SocialAuthService, SocialUser} from "angularx-social-login";
import {JWTTokenService} from "../../services/jwtToken.service";
import {LocalStorageService} from "../../services/localStorage.service";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {ApiService} from "../../services/apiService.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = this.localStorage.get('user') ? JSON.parse(<string>this.localStorage.get('user')) : null;
  loggedIn : boolean = false ;
  constructor(
    public socialAuthService: SocialAuthService ,
    private jwt : JWTTokenService,
    private http: HttpClient,
    private localStorage : LocalStorageService ,
    private api : ApiService,
  ) { }

  ngOnInit(): void {
    this.localStorage.get('user') && this.localStorage.get('access_token')? this.loggedIn = true : this.loggedIn=false ;
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((res) => {
        console.log(res)
        console.log("Logged in with Google")
        this.api.loginAPI({ access_token : res.authToken })
          .subscribe((jwt)=>{
            //save info and expires at local storage
            this.jwt.setToken(jwt.access_token)
            this.localStorage.set('access_token', jwt.access_token)
            this.localStorage.set('user', JSON.stringify(jwt.user))
            this.localStorage.set('expiresAt' , this.jwt.getExpiryTime())

            this.user = jwt.user ;
            this.loggedIn = true
            // this.firstName = jwt.user.first_name
            // this.email = jwt.user.email

            console.log("JWT from django : ")
            console.log(jwt)
            console.log("IsExpired : "+this.jwt.isTokenExpired())
            this.refresh()
          })
      }
    ).catch((error)=>console.log("Login error : "+error.message));
  }

  refresh(): void {
    window.location.reload();
  }

  logout():void{
    if(confirm("Confirm log out ?")){
      this.socialAuthService.signOut()
        .catch((error)=>console.log(error))
        .then(()=>{
          this.localStorage.clear()
          this.loggedIn = false
        })
        .finally(()=>{
          this.refresh()
          // console.log("logged out -- proceed to logout page")
        })
    }
  }

  forceLogOut(){
    this.socialAuthService.signOut()
      .catch((error)=>console.log(error))
      .then(()=>{
        this.localStorage.clear()
        this.loggedIn = false
      })
      .finally(()=>{
        this.refresh()
        // console.log("logged out -- proceed to logout page")
      })
  }

  enterSecureArea(){
    this.api.getSecure().subscribe((res : any)=>{
      alert("respond : "+res.message)
    })
  }

  checkServer(){
    this.api.checkServer().subscribe((res:any)=>{
      console.log("respond : "+res.message)
    })
  }
}
