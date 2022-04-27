import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../src/material.module';
import { HeagerComponent } from './heager/heager.component';
import { FooterComponent } from './footer/footer.component';
import { ListPeopleComponent } from './list-people/list-people.component';

@NgModule({
  declarations: [
    AppComponent,
    HeagerComponent,
    FooterComponent,
    ListPeopleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
