import {Component} from '@angular/core';
import {Vehicle} from "./vehicle";
import {VehicleListService} from "./vehicle-list.service";
import {MatDialog} from "@angular/material";
import {AddVehicleComponent} from "./add-vehicle.component";
import {AppService} from "../app.service";


@Component({
  templateUrl: 'vehicle-list.component.html',
})

export class VehicleListComponent {

  public vehicles: Vehicle[];
  private highlightedVehicle: string = '';
  ownerId = "123456789098765432100";

  constructor(public vehicleListService: VehicleListService,
              // public appService: AppService,
              public dialog: MatDialog) {

   /* if(this.appService.isSignedIn()){
      this.ownerId = localStorage.getItem("oid").toString();
    }*/

  }


  openAddVehicleDialog(): void {
    const newVehicle: Vehicle = {
      ownerId: this.ownerId,
      model: '',
      color: '',
      engine: '',
      mpg: '',
      ecoFriendly: false
    };

    const dialogRef = this.dialog.open(AddVehicleComponent, {
      width: '500px',
      data: {vehicle: newVehicle}
    });

    dialogRef.afterClosed().subscribe(newVehicle => {
      if (newVehicle != null) {
        console.log(" This should be same as google ID " + newVehicle.ownerId);
        this.vehicleListService.addNewVehicle(newVehicle).subscribe(
          result => {
            this.highlightedVehicle = result;
            // this.refreshVehicles();
          },
          err => {
            console.log('There was an error adding the vehicle.');
            console.log('The newVehicle or dialogResult was ' + JSON.stringify(newVehicle));
            console.log('The error was ' + JSON.stringify(err));
          });
      }
    });
  }

}
