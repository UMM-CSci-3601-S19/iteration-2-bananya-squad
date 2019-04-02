import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {User} from "./user";
import {UserListService} from "./user-list.service";
import {AppComponent} from "../app.component";
import {VehicleListComponent} from "../vehicles/vehicle-list.component";
import {Vehicle} from "../vehicles/vehicle";
import {VehicleListService} from "../vehicles/vehicle-list.service";


@Component({
  providers: [VehicleListComponent],
  templateUrl: 'user-list.component.html',
  styleUrls: ['./user-list.component.css']
})


export class UserListComponent implements OnInit {

  public users: User[];
  public vehicles: Vehicle[];

  constructor(public userListService: UserListService,
              public appComponent: AppComponent,
              public vehicleListComponent: VehicleListComponent,
              public vehicleListService: VehicleListService) {}



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


  refreshVehicles(): Observable<Vehicle[]> {

    const vehicles: Observable<Vehicle[]> = this.vehicleListService.getVehicles();
    vehicles.subscribe(
      vehicles => {
        this.vehicles = vehicles;
      },
      err => {
        console.log(err);
      });
    return vehicles;
  }


  ngOnInit(): void {
    this.refreshUsers();
    this.refreshVehicles();
  }
}
