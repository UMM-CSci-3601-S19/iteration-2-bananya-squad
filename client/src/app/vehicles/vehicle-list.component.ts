import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Vehicle} from "./vehicle";
import {VehicleListService} from "./vehicle-list.service";
import {MatDialog} from "@angular/material";
import {AddVehicleComponent} from "./add-vehicle.component";


@Component({
  templateUrl: 'vehicle-list.component.html',
})

export class VehicleListComponent implements OnInit {

  public vehicles: Vehicle[];
  private highlightedVehicle: string = '';
  ownerId = localStorage.getItem("_id");


  constructor(public vehicleListService: VehicleListService, public dialog: MatDialog) {

  }


  openAddVehicleDialog(): void {
    const newVehicle: Vehicle = {
      ownerId: this.ownerId,
      year: 0,
      model: '',
      type: '',
      color: '',
      condition: '',
      engine: '',
      weight: 0,
      mpg: 0,
      ledLights: false
    };

    const dialogRef = this.dialog.open(AddVehicleComponent, {
      width: '500px',
      data: {vehicle: newVehicle}
    });

    dialogRef.afterClosed().subscribe(newVehicle => {
      if (newVehicle != null) {

        this.vehicleListService.addNewVehicle(newVehicle).subscribe(
          result => {
            this.highlightedVehicle = result;
            this.refreshVehicles();
          },
          err => {
            console.log('There was an error adding the vehicle.');
            console.log('The newVehicle or dialogResult was ' + JSON.stringify(newVehicle));
            console.log('The error was ' + JSON.stringify(err));
          });
      }
    });
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
    this.refreshVehicles();
  }
}
