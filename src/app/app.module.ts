import { CoreModule } from './core/core.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginSignupModule } from './login-signup/login-signup.module';
import { HeadersInterceptorsService } from './core/interceptors';
import { SharedModule } from './shared';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // LoginSignupModule,
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptorsService, multi: true, },{provide : LocationStrategy , useClass : HashLocationStrategy}
],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
