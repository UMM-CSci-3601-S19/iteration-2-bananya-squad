import {Component, OnInit} from '@angular/core';
import {RideListService} from "./ride-list.service";
import {Ride} from "./ride";

@Component({
  selector: 'ride-component',
  templateUrl: 'ride.component.html',
  styleUrls: ['./ride.component.css'],
})

export class RideComponent implements OnInit {

  public ride: Ride = null;
  private destination: string;
  private roundTrip: boolean;


  constructor(private rideListService: RideListService) {
  }

  private subscribeToServiceForDestination() {
      this.rideListService.getRideByDestination(this.destination).subscribe(
        ride => this.ride = ride,
        err => {
          console.log(err);
        }
      );
  }

  private subscribeToServiceForRoundTrip() {
      this.rideListService.getRideByRoundTrip(this.roundTrip).subscribe(
        ride => this.ride = ride,
        err => {
          console.log(err);
        }
      );
  }

  setDestination(destination: string) {
    this.destination = destination;
    this.subscribeToServiceForDestination();
  }

  setRoundTrip(roundTrip: boolean) {
    this.roundTrip = roundTrip;
    this.subscribeToServiceForRoundTrip();
  }

  ngOnInit(): void {
    this.subscribeToServiceForDestination();
    this.subscribeToServiceForRoundTrip();
  }


}
