import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SingleComponent } from './single/single.component';
import { AppRoutingModule } from './app.routing.module';
import { MainComponent } from './main/main.component';
import { AppService } from './app.service';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { PaginationModule, PaginationConfig } from 'ngx-bootstrap/pagination';

@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule, RouterModule, AppRoutingModule, FontAwesomeModule, PaginationModule],
  declarations: [AppComponent, SingleComponent, MainComponent],
  bootstrap: [AppComponent],
  providers: [AppService, PaginationConfig]
})
export class AppModule { }
