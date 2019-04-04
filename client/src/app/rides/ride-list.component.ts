import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Ride} from "./ride";
import {RideListService} from "./ride-list.service";
import {AddRideComponent} from "./add-ride.component";
import {EditRideComponent} from "./edit-ride.component";
import {MatDialog} from "@angular/material";
import {DeleteRideComponent} from "./delete-ride.component";
import {SearchRideComponent} from "./search-ride.component";


@Component({
  selector: 'ride-list-component',
  templateUrl: 'ride-list.component.html',
  styleUrls: ['./ride-list.component.css'],
})


export class RideListComponent implements OnInit {

  public rides: Ride[];
  public searchedRides: Ride[];

  public rideDestination: string;

  private highlightedDestination: string = '';


  constructor(public rideListService: RideListService, public dialog: MatDialog) {
  }

  // To use to delete past rides
  static getCurrentTime(): string{
    let today = new Date();
    let date = today.getMonth() + '-' + (today.getDate() + 1) + '-' + today.getFullYear();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let blah = date + " " + time;
    return blah;
  }

  openDialog(): void {
    const newRide: Ride = {driver: '', destination: '', origin: '', roundTrip: false, driving: false,
      departureDate: '', departureTime: '', notes: ''};
    const dialogRef = this.dialog.open(AddRideComponent, {
      width: '500px',
      data: {ride: newRide}
    });

    dialogRef.afterClosed().subscribe(newRide => {
      if (newRide != null) {

        this.rideListService.addNewRide(newRide).subscribe(
          result => {
            this.highlightedDestination = result;
            this.refreshRides();
          },
          err => {
            console.log('There was an error adding the ride.');
            console.log('The newRide or dialogResult was ' + JSON.stringify(newRide));
            console.log('The error was ' + JSON.stringify(err));
          });
      }
    });
  }

  openSearchDialog(): void {

    const searchRide: Ride = {driver: '', destination: '', origin: '', roundTrip: null, driving: false,
      departureDate: '', departureTime: '', notes: ''};

    const dialogRef = this.dialog.open(SearchRideComponent, {
      width: '500px',
      data: {ride: searchRide}
    });

    dialogRef.afterClosed().subscribe(searchRide => {
      if (searchRide != null) {
        console.log('The destination passed in is ' + searchRide.destination);
        console.log('The origin passed in is ' + searchRide.origin);
        console.log('The departureDate passed in is ' + searchRide.departureDate);
        console.log('The departureTime passed in is ' + searchRide.departureTime);
        console.log('The roundTrip passed in is ' + searchRide.roundTrip);

        this.rideListService.getRides(searchRide.destination,searchRide.origin,searchRide.departureDate,
          searchRide.departureTime,searchRide.roundTrip).subscribe(
          result => {
            this.searchedRides = result;
            console.log("The result is " + JSON.stringify(result));
            this.refreshRides(searchRide.destination,searchRide.origin);
            localStorage.setItem("searched", 'true');
          },
          err => {
            // This should probably be turned into some sort of meaningful response.
            console.log('There was an error searching the ride.');
            console.log('The searchRide or dialogResult was ' + JSON.stringify(searchRide));
            console.log('The error was ' + JSON.stringify(err));
          });
      }
    });
  }

  openEditDialog(currentId: object,currentDriver: string, currentDestination: string, currentOrigin: string, currentRoundTrip: boolean, currentDriving: boolean, currentDepartureDate: string, currentDepartureTime: string, currentNotes: string): void {
    const currentRide: Ride = {
      _id: currentId,
      driver: currentDriver,
      destination: currentDestination,
      origin: currentOrigin,
      roundTrip: currentRoundTrip,
      driving: currentDriving,
      departureDate: currentDepartureDate,
      departureTime: currentDepartureTime,
      notes: currentNotes
    };

    const dialogRef = this.dialog.open(EditRideComponent, {
      width: '500px',
      data: {ride: currentRide}
    });


    dialogRef.afterClosed().subscribe(currentRide => {
      if (currentRide != null) {

        this.rideListService.editRide(currentRide).subscribe(
          result => {
            this.highlightedDestination = result;
            this.refreshRides();
            console.log('The currentRide or dialogResult was ' + JSON.stringify(currentRide));
          },
          err => {
            console.log('There was an error editing the ride.');
            console.log('The currentRide or dialogResult was error ' + JSON.stringify(currentRide));
            console.log('The error was ' + JSON.stringify(err));
          });
      }
    });
  }

  openDeleteDialog(currentId: object): void {
    console.log("openDeleteDialog");
    const dialogRef = this.dialog.open(DeleteRideComponent, {
      width: '500px',
      data: {id: currentId}
    });
    dialogRef.afterClosed().subscribe(deletedRideId => {
      if (deletedRideId != null) {
        this.rideListService.deleteRide(deletedRideId).subscribe(
          result => {
            console.log("openDeleteDialog has gotten a result!");
            this.highlightedDestination = result;
            console.log("The result is " + result);
            this.refreshRides();
          },
          err => {
            console.log('There was an error deleting the ride.');
            console.log('The id we attempted to delete was  ' + deletedRideId);
            console.log('The error was ' + JSON.stringify(err));
          });
      }
    });
  }

  refreshRides(searchDestination?: string,searchOrigin?: string, searchDate?: string, searchTime?: string, searchRoundTrip?: boolean): Observable<Ride[]> {
    localStorage.setItem("searched", "false");
    localStorage.setItem("load", "false");
  if (searchDestination == null && searchOrigin == null) {
      const rides: Observable<Ride[]> = this.rideListService.getRides('','','','', null);
      rides.subscribe(
        rides => {
          this.rides = rides;
        },
        err => {
          console.log(err);
        });
      return rides;
    }
    else {
    const rides: Observable<Ride[]> = this.rideListService.getRides(searchDestination,searchOrigin,searchDate,searchTime,searchRoundTrip);
    rides.subscribe(
      rides => {
        this.rides = rides;
      },
      err => {
        console.log(err);
      });
    return rides;
     }
   }

  ngOnInit(): void {
    this.refreshRides();
  }
}
