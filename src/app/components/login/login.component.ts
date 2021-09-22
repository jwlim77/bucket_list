import { Component, OnInit } from '@angular/core';
import {GoogleLoginProvider, SocialAuthService } from "angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public socialAuthService: SocialAuthService) { }

  ngOnInit(): void {
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((res) => console.log(res));
  }

  logout():void{
    this.socialAuthService.signOut()
      .then(()=>console.log("logged out"));
  }

}
