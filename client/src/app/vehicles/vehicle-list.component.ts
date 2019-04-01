import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Vehicle} from "./vehicle";
import {VehicleListService} from "./vehicle-list.service";

@Component({
  templateUrl: 'vehicle-list.component.html',
})

export class VehicleListComponent implements OnInit {

  public vehicles: Vehicle[];


  constructor(public vehicleListService: VehicleListService) {}


  refreshVehicles(): Observable<Vehicle[]> {

    const vehicles: Observable<Vehicle[]> = this.vehicleListService.getVehicles();
    vehicles.subscribe(
      users => {
        this.vehicles = users;
      },
      err => {
        console.log(err);
      });
    return vehicles;
  }


  ngOnInit(): void {
    this.refreshVehicles();
  }
}
