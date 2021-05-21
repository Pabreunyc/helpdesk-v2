import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HelpdeskModule } from '../helpdesk/helpdesk.module';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from './_core/material.module';
import { PrimeNGModule } from './_core/primeng.module';
import { X1Component } from './home/x1/x1.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    X1Component
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    PrimeNGModule,

    HelpdeskModule
  ],
  exports: [
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
