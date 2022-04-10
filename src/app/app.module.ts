import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule } from './app-routing.module';
import {MatExpansionModule} from '@angular/material/expansion';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './components/footer/footer.component';
import { SbuttonComponent } from './components/sbutton/sbutton.component';
import {GoogleLoginProvider, SocialLoginModule} from "angularx-social-login";
import {UniversalAppInterceptor} from "./services/UniversalAppInterceptor.interceptor";
import {MatDialogModule} from "@angular/material/dialog";
import { RecordDialogComponent } from './components/record-dialog/record-dialog.component';
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";


//added to .gitignore
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CalculatorComponent,
    FooterComponent,
    SbuttonComponent,
    RecordDialogComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        BrowserAnimationsModule,
        MatExpansionModule,
        ReactiveFormsModule,
        SocialLoginModule,
        HttpClientModule,
        MatDialogModule,
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
    ],
  providers: [
    //social auth
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        // autoLogin: true, //keeps the user signed in
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('your-provider-id')
          }
        ]
      }
    },
    //http interceptor
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UniversalAppInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
