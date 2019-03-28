import {Component} from '@angular/core';

@Component({
  templateUrl: 'profile.component.html',
})
export class ProfileComponent {
  public text: string;

  constructor() {
    this.text = 'MoRide';
  }
}
