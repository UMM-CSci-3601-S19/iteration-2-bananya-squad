import {ComponentFixture, TestBed, async} from '@angular/core/testing';
import {Vehicle} from "./vehicle";
import {VehicleListComponent} from "./vehicle-list.component";
import {VehicleListService} from "./vehicle-list.service";
import {Observable} from "rxjs/Observable";
import {FormsModule} from '@angular/forms';
import {CustomModule} from '../custom.module';
import {MatDialog} from '@angular/material';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';


/*describe('Vehicle list', () => {

  let vehicleList: VehicleListComponent;
  let fixture: ComponentFixture<VehicleListComponent>;

  let vehicleListServiceStub: {
    getVehicles: () => Observable<Vehicle[]>
  };

  beforeEach(()=> {
    vehicleListServiceStub = {
      getVehicles: () => Observable.of([
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
      ])
    };

    TestBed.configureTestingModule({
      imports: [CustomModule],
      declarations: [VehicleListComponent],
      providers: [{provide: VehicleListService, useValue: vehicleListServiceStub}]
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(VehicleListComponent);
      vehicleList = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

});*/

describe('Adding a vehicle',()=> {
  let vehicleList: VehicleListComponent;
  let fixture: ComponentFixture<VehicleListComponent>;
  const newVehicle: Vehicle = {
    ownerId: '894569126550116200000',
    model: 'Apple',
    color: 'Red',
    ecoFriendly: false,
    mpg: '3',
    engine: 'diesel'
  };

  const newId = '783458015449005187543';

  let calledVehicle: Vehicle;

  let vehicleListServiceStub: {
    getVehicles: () => Observable<Vehicle[]>,
    addNewVehicle: (newVehicle: Vehicle) => Observable<{ '$oid': string}>
  };
  let mockMatDialog: {
    open: (AddVehicleComponent, any) => {
      afterClosed: () => Observable<Vehicle>
    };
  };

  beforeEach(() => {
    calledVehicle = null;
    vehicleListServiceStub = {
      getVehicles: () => Observable.of([]),
      addNewVehicle: (newVehicle: Vehicle) => {
        calledVehicle = newVehicle;
        return Observable.of({
          '$oid': newId
        });
      }
    };
    mockMatDialog = {
      open: () => {
        return {
          afterClosed: () => {
            return Observable.of(newVehicle);
          }
        };
      }
    };

    TestBed.configureTestingModule({
      imports: [FormsModule, CustomModule],
      declarations: [VehicleListComponent],
      providers: [
        {provide: VehicleListService, useValue: vehicleListServiceStub},
        {provide: MatDialog, useValue: mockMatDialog},
      ]
    });
  });

  beforeEach(async(()=> {
    TestBed.compileComponents().then(()=> {
      fixture = TestBed.createComponent(VehicleListComponent);
      vehicleList = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('calls VehicleListService.addNewVehicle', () => {
    expect(calledVehicle).toBeNull();
    vehicleList.openAddVehicleDialog();
    expect(calledVehicle).toEqual(newVehicle);
  });
});


