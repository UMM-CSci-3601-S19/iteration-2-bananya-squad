import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {HttpClient} from '@angular/common/http';

import {Ride} from "./ride";
import {RideListService} from "./ride-list.service";

describe( 'Ride list service: ', () => {
  const testRides: Ride[] = [
    {
      driver: 'Hagrid',
      destination: 'Hogwarts',
      origin: '4 Privet Drive',
      roundTrip: true,
      departureDate: '05-16-2007',
      departureTime: '6:00pm',
      notes: 'I will be arriving in a flying motorcycle'
    },
    {
      driver: 'Lucy',
      destination: 'Narnia',
      origin: 'Wardrobe',
      roundTrip: true,
      departureDate: '07-13-2020',
      departureTime: '5:00pm',
      notes: 'Dress for cold'
    },
    {
      driver: 'Student',
      destination: 'Morris',
      origin: 'The Outside',
      roundTrip: false,
      departureDate: '08-02-2019',
      departureTime: '7:00pm',
      notes: 'There is no escaping Morris'
    }
  ];

  const rRides: Ride[] = testRides.filter(ride =>
    ride.destination.toLowerCase().indexOf('r') !== -1
  );

  let rideListService: RideListService;
  //let searchUrl: string;

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;


  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);

    rideListService = new RideListService(httpClient);
  });

  afterEach(() => {
    httpTestingController.verify();
  });


  it('getRides() calls api/rides', () => {

    rideListService.getRides('','').subscribe(
      rides => expect(rides).toBe(testRides)
    );

    const req = httpTestingController.expectOne(rideListService.baseUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(testRides);
  });

  it('getRides(rideDestination) adds appropriate param string to called URL', () => {
    rideListService.getRides('r','').subscribe(
      rides => expect(rides).toEqual(rRides)
    );

    const req = httpTestingController.expectOne(rideListService.baseUrl + '?destination=r&');
    expect(req.request.method).toEqual('GET');
    req.flush(rRides);
  });


  it('adding a ride calls api/rides/new', () => {
    const teacherDestination = 'teacherDestination';
    const newRide: Ride = {
      driver: 'Teacher',
      destination: 'St. Cloud',
      origin: 'Becker',
      roundTrip: false,
      departureDate: '10-16-2124',
      departureTime: '5:00pm',
      notes: 'There is no escaping Morris'
    };

    rideListService.addNewRide(newRide).subscribe(
      destination => {
        expect(destination).toBe(teacherDestination);
      }
    );

    const expectedUrl: string = rideListService.baseUrl + '/new';
    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toEqual('POST');
    req.flush(teacherDestination);
  });

  it('getRideByDestination() calls api/rides/destination', () => {
    const targetRide: Ride = testRides[1];
    const targetDestination: string = targetRide.destination;
    rideListService.getRideByDestination(targetDestination).subscribe(
      ride => expect(ride).toBe(targetRide)
    );

    const expectedUrl: string = rideListService.baseUrl + '/' + targetDestination;
    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(targetRide);
  });

  it('editing a ride calls api/rides/update', () => {
    const editedTeacherDestination = 'editedTeacherDestination';
    const editedRide: Ride = {
      driver: 'Teacher',
      destination: 'Morris',
      origin: 'Home',
      roundTrip: false,
      departureDate: '10-16-2124',
      departureTime: '5:00pm',
      notes: 'There is no escaping Morris'
    };

    rideListService.editRide(editedRide).subscribe(
      destination => {
        expect(destination).toBe(editedTeacherDestination);
      }
    );

    const expectedUrl: string = rideListService.baseUrl + '/update';
    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toEqual('POST');
    req.flush(editedTeacherDestination);
  });

  /*
  it('deleting a ride calls api/rides/remove', () => {
    const deletedTeacherDestination = 'deletedTeacherDestination';
    const deletedRide: Ride = {
      driver: 'Teacher',
      destination: 'Office',
      origin: 'Lab',
      roundTrip: false,
      departureTime: 'never',
      notes: 'There is no escaping the lab'
    };

    rideListService.deleteRide(deletedRide).subscribe(
      destination => {
        expect(destination).toBe(deletedTeacherDestination);
      }
    );

    const expectedUrl: string = rideListService.baseUrl + '/remove';
    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toEqual('POST');
    req.flush(deletedTeacherDestination);
  });*/

});
