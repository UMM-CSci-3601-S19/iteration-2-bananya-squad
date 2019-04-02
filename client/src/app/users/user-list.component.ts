import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {User} from "./user";
import {UserListService} from "./user-list.service";
import {AppComponent} from "../app.component";
import {VehicleListComponent} from "../vehicles/vehicle-list.component";


@Component({
  providers: [VehicleListComponent],
  templateUrl: 'user-list.component.html',
  styleUrls: ['./user-list.component.css']
})


export class UserListComponent implements OnInit {

  public users: User[];


  constructor(public userListService: UserListService,
              public appComponent: AppComponent,
              public vehicleListComponent: VehicleListComponent){}


  refreshUsers(): Observable<User[]> {

    const users: Observable<User[]> = this.userListService.getUsers();
    users.subscribe(
      users => {
        this.users = users;
      },
      err => {
        console.log(err);
      });
    return users;
  }


  ngOnInit(): void {
    this.refreshUsers();
  }
}
