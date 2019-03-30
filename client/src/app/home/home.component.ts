import {Component} from '@angular/core';
import {AppService} from "../app.service";
import {AppComponent} from "../app.component";

@Component({
  templateUrl: 'home.component.html'
})
export class HomeComponent {

  public text: string;

  constructor (public appService: AppService, public appComponent: AppComponent){
    this.text = 'Mo-Ride';
  }

}
