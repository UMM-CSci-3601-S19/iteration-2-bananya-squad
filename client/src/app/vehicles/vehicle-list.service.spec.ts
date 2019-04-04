import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {HttpClient} from '@angular/common/http';

import {Vehicle} from "./vehicle";
import {VehicleListService} from "./vehicle-list.service";

describe( 'Vehicle list service: ', () => {
  const testVehicles: Vehicle[] = [
    {
      ownerId: '731330300985650700000',
      model: 'Flying Motorcycle',
      color: 'Maroon',
      ecoFriendly: true,
      mpg: '80',
      engine: 'hybrid'
    },
    {
      ownerId: '128701757713094440000',
      model: 'Lion',
      color: 'Tan',
      ecoFriendly: true,
      mpg: '160',
      engine: 'electric'
    },
    {
      ownerId: '721329185750116200000',
      model: 'Shopping Cart',
      color: 'Unknown',
      ecoFriendly: false,
      mpg: '10',
      engine: 'diesel'
    }
  ];

  const shoppingVehicle: Vehicle[] = testVehicles.filter(vehicle =>
    vehicle.model.toLowerCase().indexOf('shopping') !== -1
  );

  let vehicleListService: VehicleListService;

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;


  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);

    vehicleListService = new VehicleListService(httpClient);
  });

  afterEach(() => {
    httpTestingController.verify();
  });


  it('getVehicles("")  where ownerId is an empty string calls api/vehicles', () => {

    vehicleListService.getVehicles("").subscribe(
      vehicles => expect(vehicles).toBe(testVehicles)
    );

    const req = httpTestingController.expectOne(vehicleListService.baseUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(testVehicles);
  });

  it('getVehicles(ownerId) adds appropriate param string to called URL', () => {
    vehicleListService.getVehicles('721329185750116200000').subscribe(
      vehicles => expect(vehicles).toEqual(shoppingVehicle)
    );

    const req = httpTestingController.expectOne(vehicleListService.baseUrl + '?ownerId=721329185750116200000&');
    expect(req.request.method).toEqual('GET');
    req.flush(shoppingVehicle);
  });


  it('adding a vehicle calls api/vehicle/new', () => {
    const teacherModel = 'teacherModel';
    const newVehicle: Vehicle = {
      ownerId: 'Teacher',
      model: 'Apple',
      color: 'Red',
      ecoFriendly: false,
      mpg: '3',
      engine: 'diesel'
    };

    vehicleListService.addNewVehicle(newVehicle).subscribe(
      model => {
        expect(model).toBe(teacherModel);
      }
    );

    const expectedUrl: string = vehicleListService.baseUrl + '/new';
    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toEqual('POST');
    req.flush(teacherModel);
  });
});
