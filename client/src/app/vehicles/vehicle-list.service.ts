import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import {Vehicle} from "./vehicle";

@Injectable()
export class VehicleListService {
  readonly baseUrl: string = environment.API_URL + 'vehicle';
  private vehicleUrl: string = this.baseUrl;

  constructor(private http: HttpClient) {}

  getVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.vehicleUrl);
  }

}
