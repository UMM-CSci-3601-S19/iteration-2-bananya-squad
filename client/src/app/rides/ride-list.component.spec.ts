/*
import {ComponentFixture, TestBed, async} from '@angular/core/testing';
import {Ride} from "./ride";
import {RideListComponent} from "./ride-list.component";
import {RideListService} from "./ride-list.service";
import {AppComponent} from "../app.component";
import {Observable} from "rxjs/Observable";
import {FormsModule} from '@angular/forms';
import {CustomModule} from '../custom.module';
import {MatDialog} from '@angular/material';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';

describe('Adding a ride',()=> {
  let rideList: RideListComponent;
  let fixture: ComponentFixture<RideListComponent>;
  const newRide: Ride = {
    _id: Object(),
    driver: 'Teacher',
    destination: 'Office',
    origin: 'Lab',
    roundTrip: false,
    departureTime: '6:00 AM',
    departureDate: '12-13-2019',
    notes: 'There is no escaping the lab'
  };

  const newId = '783458015449005187543';

  let calledRide: Ride;

  let rideListServiceStub: {
    getRides: () => Observable<Ride[]>,
    addNewRide: (newRide: Ride) => Observable<{ '$oid': string}>
  };
  let mockMatDialog: {
    open: (AddRideComponent, any) => {
      afterClosed: () => Observable<Ride>
    };
  };

  beforeEach(() => {
    calledRide = null;
    rideListServiceStub = {
      getRides: () => Observable.of([]),
      addNewRide: (newRide: Ride) => {
        calledRide = newRide;
        return Observable.of({
          '$oid': newId
        });
      }
    };
    mockMatDialog = {
      open: () => {
        return {
          afterClosed: () => {
            return Observable.of(newRide);
          }
        };
      }
    };

    TestBed.configureTestingModule({
      imports: [FormsModule, CustomModule],
      declarations: [RideListComponent, AppComponent],
      providers: [
        {provide: RideListService, useValue: rideListServiceStub},
        {provide: MatDialog, useValue: mockMatDialog},
      ]
    });
  });

  beforeEach(async(()=> {
    TestBed.compileComponents().then(()=> {
      fixture = TestBed.createComponent(RideListComponent);
      rideList = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('calls RideListService.addNewRide', () => {
    expect(calledRide).toBeNull();
    rideList.openDialog();
    expect(calledRide).toEqual(newRide);
  });
});
*/
