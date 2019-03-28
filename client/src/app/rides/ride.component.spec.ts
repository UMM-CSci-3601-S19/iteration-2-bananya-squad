import {ComponentFixture, TestBed, async} from '@angular/core/testing';
import {Observable} from 'rxjs/Observable';
import {CustomModule} from "../custom.module";
import {Ride} from "./ride";
import {RideComponent} from "./ride.component";
import {RideListService} from "./ride-list.service";

describe('Ride component', () => {

  let rideComponent: RideComponent;
  let fixture: ComponentFixture<RideComponent>;

  let rideListServiceStub: {
    getRideByDestination: (rideDestination: string) => Observable<Ride>
  };

  beforeEach(() => {
    rideListServiceStub = {
      getRideByDestination: (rideDestination: string) => Observable.of([
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
      ].find(ride => ride.destination === rideDestination))
    };


    TestBed.configureTestingModule({
      imports: [CustomModule],
      declarations: [RideComponent],
      providers: [{provide: RideListService, useValue: rideListServiceStub}]
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(RideComponent);
      rideComponent = fixture.componentInstance;
    });
  }));

  it('can retrieve Hagrid by destination', () => {
    rideComponent.setDestination('Hogwarts');
    expect(rideComponent.ride).toBeDefined();
    expect(rideComponent.ride.driver).toBe('Hagrid');
    expect(rideComponent.ride.origin).toBe('4 Privet Drive');
    expect(rideComponent.ride.roundTrip).toBe(true);
    expect(rideComponent.ride.departureDate).toBe('05-16-2007');
    expect(rideComponent.ride.departureTime).toBe('6:00pm');
    expect(rideComponent.ride.notes).toBe('I will be arriving in a flying motorcycle');
  });

  it('returns undefined for Canada', () => {
    rideComponent.setDestination('Canada');
    expect(rideComponent.ride).not.toBeDefined();
  });


});
