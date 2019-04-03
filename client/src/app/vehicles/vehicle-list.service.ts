import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import {Vehicle} from "./vehicle";

@Injectable()
export class VehicleListService {
  readonly baseUrl: string = environment.API_URL + 'vehicles';
  private vehicleUrl: string = this.baseUrl;

  constructor(private http: HttpClient) {}

  getVehicles(ownerId: string): Observable<Vehicle[]> {
    this.filterByOwnerId(ownerId);
    return this.http.get<Vehicle[]>(this.vehicleUrl);
  }


  filterByOwnerId(ownerId: string): void {
    if (!(ownerId == null || ownerId === '')) {
      if (this.parameterPresent('ownerId=')) {
        // there was a previous search by ownerId that we need to clear
        this.removeParameter('ownerId=');
      }
      if (this.vehicleUrl.indexOf('?') !== -1) {
        // there was already some information passed in this url
        this.vehicleUrl += 'ownerId=' + ownerId + '&';
      } else {
        // this was the first bit of information to pass in the url
        this.vehicleUrl += '?ownerId=' + ownerId + '&';
      }
    } else {
      // there was nothing in the box to put onto the URL... reset
      if (this.parameterPresent('ownerId=')) {
        let start = this.vehicleUrl.indexOf('ownerId=');
        const end = this.vehicleUrl.indexOf('&', start);
        if (this.vehicleUrl.substring(start - 1, start) === '?') {
          start = start - 1;
        }
        this.vehicleUrl = this.vehicleUrl.substring(0, start) + this.vehicleUrl.substring(end + 1);
      }
    }
  }




  addNewVehicle(newVehicle: Vehicle): Observable<string> {


    if (this.parameterPresent('ownerId=')) {
      let start = this.vehicleUrl.indexOf('ownerId=');
      const end = this.vehicleUrl.indexOf('&', start);
      if (this.vehicleUrl.substring(start - 1, start) === '?') {
        start = start - 1;
      }
      this.vehicleUrl = this.vehicleUrl.substring(0, start) + this.vehicleUrl.substring(end + 1);
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'text' as 'json'
    };


    return this.http.post<string>(this.vehicleUrl + '/new', newVehicle, httpOptions);
  }


  // Helper Functions

  private parameterPresent(searchParam: string) {
    return this.vehicleUrl.indexOf(searchParam) !== -1;
  }


  private removeParameter(searchParam: string) {
    let start = this.vehicleUrl.indexOf(searchParam);
    let end = 0;
    if (this.vehicleUrl.indexOf('&') !== -1) {
      end = this.vehicleUrl.indexOf('&', start) + 1;
    } else {
      end = this.vehicleUrl.indexOf('&', start);
    }
    this.vehicleUrl = this.vehicleUrl.substring(0, start) + this.vehicleUrl.substring(end);
  }



}
