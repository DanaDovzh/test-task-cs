import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../src/material.module';

import { FooterComponent } from './footer/footer.component';
import { ListPeopleComponent } from './list-people/list-people.component';
import { PeopleInfoService } from 'src/services/people-info.service';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { FormPersonComponent } from './form-person/form-person.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ListPeopleComponent,
    FormPersonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    // TextMaskModule
  ],
  providers: [
    PeopleInfoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
