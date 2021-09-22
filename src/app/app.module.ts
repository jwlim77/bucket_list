import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule } from './app-routing.module';
import {MatExpansionModule} from '@angular/material/expansion';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { CalculatorDescriptionComponent } from './components/calculator-description/calculator-description.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './components/footer/footer.component';
import { SbuttonComponent } from './components/sbutton/sbutton.component';
import { LoginComponent } from './components/login/login.component';
import {GoogleLoginProvider, SocialLoginModule} from "angularx-social-login";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CalculatorComponent,
    CalculatorDescriptionComponent,
    FooterComponent,
    SbuttonComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    ReactiveFormsModule,
    SocialLoginModule,
  ],
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      // autoLogin: true, //keeps the user signed in
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('117069372805-c7ii9g2rqtheqdf0l505av0lkj3mulfb.apps.googleusercontent.com')
        }
      ]
    }
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
