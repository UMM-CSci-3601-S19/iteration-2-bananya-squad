import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {Routing} from './app.routes';
import {APP_BASE_HREF} from '@angular/common';

import {RideComponent} from "./rides/ride.component";
import {RideListComponent} from "./rides/ride-list.component";
import {RideListService} from "./rides/ride-list.service";
import {AddRideComponent} from "./rides/add-ride.component";
import {EditRideComponent} from "./rides/edit-ride.component";
import {DeleteRideComponent} from "./rides/delete-ride.component";
import {SearchRideComponent} from "./rides/search-ride.component";


import {UserListComponent} from "./users/user-list.component";
import {UserListService} from "./users/user-list.service";

import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';

import {CustomModule} from './custom.module';


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    Routing,
    CustomModule,
    MatCheckboxModule,
    MatDatepickerModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    RideComponent,
    RideListComponent,
    AddRideComponent,
    EditRideComponent,
    DeleteRideComponent,
    UserListComponent,
    SearchRideComponent
  ],
  providers: [
    RideListService,
    UserListService,
    {provide: APP_BASE_HREF, useValue: '/'},
  ],
  entryComponents: [
    AddRideComponent,
    EditRideComponent,
    DeleteRideComponent,
    SearchRideComponent
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
